document.addEventListener('DOMContentLoaded', function () {
  const startRecordingButton = document.getElementById('start_video');
  const closeButton = document.querySelector('.closepopout');

  // Initially, the recording state is false
  let isRecording = false;

  startRecordingButton.addEventListener('click', function () {
    try {
      // Toggle the recording state immediately
      isRecording = !isRecording;

      // Send a message to background.js to toggle recording
      chrome.runtime.sendMessage({ action: 'toggleRecording', isRecording }, function (response) {
        // Handle the response if needed
        if (chrome.runtime.lastError) {
          // Handle the error here, for example:
          console.error('Error sending message to background.js:', chrome.runtime.lastError);
        }
      });

      // Update the button text based on the recording state
      if (isRecording) {
        startRecordingButton.textContent = 'Stop Recording';
      } else {
        startRecordingButton.textContent = 'Start Recording';
      }
    } catch (error) {
      // Handle any other unexpected errors here
      console.error('An error occurred:', error);
    }
  });

  closeButton.addEventListener('click', function () {
    try {
      window.close();
    } catch (error) {
      // Handle any errors that may occur when closing the window
      console.error('Error closing window:', error);
    }
  });

  // Rest of your popup.js code
});
