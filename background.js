let isRecording = false; // Define the recording state variable

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  try {
    if (message.action === 'toggleRecording') {
      isRecording = !isRecording; // Toggle the recording state
      
      console.log('Sending message to content.js');

      // Send a message to content.js to toggle recording
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs.length > 0) {
          const activeTab = tabs[0];
          chrome.tabs.sendMessage(activeTab.id, { action: 'toggleRecording', isRecording }, function (response) {
            // Handle the response if needed
            if (chrome.runtime.lastError) {
              // Handle the error here, for example:
              console.error('Error sending message to content.js:', chrome.runtime.lastError);
            }
          });
        } else {
          console.error('No active tabs found.');
        }
      });      

      sendResponse({ isRecording }); // Send back the updated recording state or a placeholder response
    }
  } catch (error) {
    // Handle any unexpected errors that may occur
    console.error('An error occurred in the message listener:', error);
  }
});
