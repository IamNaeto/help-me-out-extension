let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'toggleRecording') {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    
    sendResponse({ isRecording }); // Send back the updated recording state or a placeholder response
  }
});

function startRecording() {
  navigator.mediaDevices
    .getDisplayMedia({ video: true, audio: true }) // Modify options as needed
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
      };

      mediaRecorder.start();
      isRecording = true;
    })
    .catch(function (error) {
      console.error('Error starting screen recording:', error);
    });
}

function stopRecording() {
  if (mediaRecorder && isRecording) {
    mediaRecorder.stop();
    isRecording = false;
  }
}

// Example function to send the recording to an endpoint
function sendRecordingToEndpoint(blob) {
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
}
