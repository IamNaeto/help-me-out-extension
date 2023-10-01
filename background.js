chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: 'toggleRecording' }, function (response) {
      // Check if response is defined before accessing its properties
      if (response && response.isRecording !== undefined) {
        isRecording = response.isRecording;
        // Handle the response if needed
      } else {
        // Handle the case where response is undefined or missing isRecording
        console.error('Response is undefined or missing isRecording property.');
      }
    });
  });
  