let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let recordBarInjected = false;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'toggleRecording') {
      // Check if isRecording is defined before accessing it
      if (typeof isRecording !== 'undefined') {
        if (isRecording) {
          stopRecording();
          removeRecordBar();
          isRecording = false; // Update the recording state
        } else {
          startRecording();
          injectRecordBar();
          isRecording = true; // Update the recording state
        }
  
        sendResponse({ isRecording }); // Send back the updated recording state or a placeholder response
      }
    }
  });
  


function injectRecordBar() {
  if (!recordBarInjected) {
    const recordBarHTML = `
      <!-- Your record bar HTML here -->
      <main class="recordbar">
        <div class="controlcontainer">
            <div class="recordtiming">
                <h3 class=''>00:00:00</h3>
                <img src="images/indicator.png" alt="" />
            </div>
            <div class="mediacontainer">
                <div class="">
                    <img src="images/pause.png" alt="" class="pausebtn">
                    <p class="">Pause</p>
                </div>
                <div class="">
                    <img src="images/stop.png" alt="" class="stopbtn">
                    <p class="">Stop</p>
                </div>
                <div class="">
                    <img src="images/video.png" alt="">
                    <p class="">Camera</p>
                </div>
                <div class="">
                    <img src="images/mic.png" alt="">
                    <p class="">Mic</p>
                </div>
            </div>

            <div class="delete">
              <img src="images/delete.png" alt="" class="deletebtn">
            </div>
        </div>
      </main>
    `;
    
    const recordBarElement = document.createElement('div');
    recordBarElement.innerHTML = recordBarHTML;
    
    // Append the record bar to the body of the page
    document.body.appendChild(recordBarElement);
    
    recordBarInjected = true;
  }
}

function removeRecordBar() {
  if (recordBarInjected) {
    const recordBarElement = document.querySelector('.recordbar');
    if (recordBarElement) {
      recordBarElement.remove();
    }
    
    recordBarInjected = false;
  }
}

// Function to handle recording start
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
  
          // Remove the record bar when recording stops
          const recordBarElement = document.querySelector('.recordbar');
          if (recordBarElement) {
            recordBarElement.remove();
          }
        };
  
        mediaRecorder.start();
        isRecording = true;
  
        // Inject the record bar when recording starts
        injectRecordBar();
      })
      .catch(function (error) {
        console.error('Error starting screen recording:', error);
      });
  }

// Function to stop recording
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

// Event listener for controlling recording
document.addEventListener('DOMContentLoaded', function () {
  const startRecordingButton = document.getElementById('start_video');
  const closeButton = document.querySelector('.closepopout');

  startRecordingButton.addEventListener('click', function () {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    
    // Update the button text based on the recording state
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
