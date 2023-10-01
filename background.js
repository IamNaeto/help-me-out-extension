let isRecording = false; // Store the recording state in the background script

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'toggleRecording') {
    isRecording = !isRecording; // Toggle the recording state
    
    // Send a message to content.js to toggle recording
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'toggleRecording', isRecording }, function (response) {
        // Handle the response if needed
      });
    });
    
    sendResponse({ isRecording }); // Send back the updated recording state or a placeholder response
  }
});
