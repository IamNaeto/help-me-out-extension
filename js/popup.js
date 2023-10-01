document.addEventListener('DOMContentLoaded', function () {
    const startRecordingButton = document.getElementById('start_video');
    const closeButton = document.querySelector('.closepopout');
    
    let isRecording = false; // Keep track of the recording state
  
    startRecordingButton.addEventListener('click', function () {
      // Toggle the recording state immediately
      isRecording = !isRecording;
      
      // Send a message to content.js to toggle recording
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: 'toggleRecording', isRecording }, function (response) {
          // Handle the response if needed
        });
      });
    });
  
    // Close the popup when the close button is clicked
    closeButton.addEventListener('click', function () {
      window.close();
    });
  
    // Rest of your popup.js code
});
