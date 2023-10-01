document.addEventListener('DOMContentLoaded', function () {
    const startRecordingButton = document.getElementById('start_video');
    const closeButton = document.querySelector('.closepopout');
  
    // Initially, the recording state is false
    let isRecording = false;
  
    startRecordingButton.addEventListener('click', function () {
      // Toggle the recording state immediately
      isRecording = !isRecording;
  
      // Send a message to background.js to toggle recording
      chrome.runtime.sendMessage({ action: 'toggleRecording', isRecording }, function (response) {
        // Handle the response if needed
      });
  
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
  
    // Rest of your popup.js code
  });
  