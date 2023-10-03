let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let recordBarInjected = false;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  try {
    if (message.action === 'toggleRecording') {
      if (typeof isRecording !== 'undefined') {
        if (isRecording) {
          stopRecording();
          removeRecordBar();
          isRecording = false;
        } else {
          startRecording();
          injectRecordBar();
          isRecording = true;
        }

        sendResponse({ isRecording });
      }
    }
  } catch (error) {
    console.error('An error occurred in the message listener:', error);
  }
});


console.log('Message received in content.js');

function injectRecordBar() {
  try {
    if (!recordBarInjected) {
      // Your code for injecting the record bar
      // ...
      recordBarInjected = true;
    }
  } catch (error) {
    console.error('An error occurred while injecting the record bar:', error);
  }
}

function removeRecordBar() {
  try {
    if (recordBarInjected) {
      // Your code for removing the record bar
      // ...
      recordBarInjected = false;
    }
  } catch (error) {
    console.error('An error occurred while removing the record bar:', error);
  }
}

function startRecording() {
  try {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then(function (stream) {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (event) {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = function () {
          const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
          recordedChunks = [];

          // You can now send the recordedBlob to your endpoint or perform other actions
          // Example: sendRecordingToEndpoint(recordedBlob);

          isRecording = false;

          removeRecordBar();
        };

        mediaRecorder.start();
        isRecording = true;

        injectRecordBar();
      })
      .catch(function (error) {
        console.error('Error starting screen recording:', error);
      });
  } catch (error) {
    console.error('An error occurred while starting recording:', error);
  }
}

function stopRecording() {
  try {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      isRecording = false;
    }
  } catch (error) {
    console.error('An error occurred while stopping recording:', error);
  }
}

function sendRecordingToEndpoint(blob) {
  try {
    const formData = new FormData();
    formData.append('recording', blob);

    fetch('yourEndpointURL', {
      method: 'POST',
      body: formData,
    })
      .then(function (response) {
        // Handle the response from your server if needed
        console.log('Recording sent successfully!');
      })
      .catch(function (error) {
        // Handle errors if the request fails
        console.error('Error sending recording:', error);
      });
  } catch (error) {
    console.error('An error occurred while sending recording to the endpoint:', error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const startRecordingButton = document.getElementById('start_video');
  const closeButton = document.querySelector('.closepopout');

  startRecordingButton.addEventListener('click', function () {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }

    if (isRecording) {
      startRecordingButton.textContent = 'Stop Recording';
    } else {
      startRecordingButton.textContent = 'Start Recording';
    }
  });

  closeButton.addEventListener('click', function () {
    window.close();
  });
});
