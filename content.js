var recorder = null;
var recordedChunks = [];

// Create a div element for displaying messages
const messageDiv = document.createElement("div");
messageDiv.style.position = "fixed";
messageDiv.style.top = "50%";
messageDiv.style.left = "50%";
messageDiv.style.transform = "translate(-50%, -50%)";
messageDiv.style.background = "white";
messageDiv.style.color = "black";
messageDiv.style.padding = "20px";
messageDiv.style.borderRadius = "20px";
messageDiv.style.display = "none";

document.body.appendChild(messageDiv);

// Create a div element for displaying messages
const controlBar = document.createElement("div");
controlBar.style.position = "fixed";
controlBar.style.bottom = "2%";
controlBar.style.left = "551px";
controlBar.style.transform = "translate(-50%, -50%)";
controlBar.style.background = "white";
controlBar.style.color = "black";
controlBar.style.borderRadius = "86px";
controlBar.style.background = "#141414";
controlBar.style.padding = "12px";
controlBar.style.width = "567px";
controlBar.style.alignItems = "center";
controlBar.style.justifyContent = "center";
controlBar.style.height = "102px";
controlBar.style.display = "none";
controlBar.style.border = "8px solid hsla(0, 0%, 75%, 1)";
document.body.appendChild(controlBar);
controlBar.innerHTML = `<div style="display: flex; gap: 24px; align-items: center; justify-content: space-between; height: full; width: full;">
        <div style="display: flex; align-items: center; gap: 8px">
          <h2 style="color: white">00:00:00</h2>
          <img width="32" height="32" src="https://img.icons8.com/flat-round/64/record.png" alt="record"/>
        </div>
        <div>
            <div style="width: 1px; height: 48px; background: #E8E8E8;"></div>
        </div>
        <div>
          <div
            style="
              display: flex;
              align-items: center;
              height: auto;
              gap: 24px;
              color: white;
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                height: full;
                justify-content: space-between;
              "
            >
              <div style="width: 32px; height: 32px; padding: 8px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center;">
                <img width="full" height=full" src="https://img.icons8.com/tiny-glyph/16/pause.png" alt="pause"/>
              </div>
              <h3
                style="
                  color: #fff;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  text-align: center;
                "
              >
                Pause
              </h3>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                height: full;
                justify-content: space-between;
              "
            >
              <div onClick={stopRecording} style="width: 32px; height: 32px; padding: 8px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center;">
              <img width="full" height="full" src="https://img.icons8.com/material-outlined/24/stop-squared.png" alt="stop-squared"/>             </div>
              <h3
                style="
                  color: #fff;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  text-align: center;
                "
              >
                Stop
              </h3>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                gap: 4px;
                height: full;
                justify-content: space-between;
              "
            >
              <div style="width: 32px; height: 32px; padding: 8px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center;">
                <img width="full" height="full" src="https://img.icons8.com/material-outlined/24/video-call.png" alt="video-call"/>
              </div>
              <h3
                style="
                  color: #fff;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  text-align: center;
                "
              >
                Video
              </h3>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                gap: 4px;
                height: full;
                justify-content: space-between;
              "
            >
              <div style="width: 32px; height: 32px; padding: 8px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center;">
                <img width="full" height="full" src="https://img.icons8.com/material-outlined/24/microphone.png" alt="microphone"/>
              </div>
              <h3
                style="
                  color: #fff;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  text-align: center;
                "
              >
                Mic
              </h3>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                gap: 4px;
                height: full;
                justify-content: space-between;
              "
            >
              <div style="width: 32px; height: 32px; padding: 8px; border-radius: 50%; background: grey; display: flex; align-items: center; justify-content: center;">
                <img width="full" height="full" src="https://img.icons8.com/material-outlined/24/trash--v1.png" alt="trash--v1"/>
              </div>

              <h3
                style="
                  color: #fff;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  text-align: center;
                "
              >
                Delete
              </h3>
            </div>
          </div>
        </div>
      </div>`

function pauseRecording() {
  // Check if there is an active recorder
  if (recorder && recorder.state === "recording") {
    recorder.pause();
    showMessage("Recording paused");
  } else {
    showMessage("No active recording to pause");
  }
}

function stopRecording() {
  // Check if there is an active recorder
  if (recorder && recorder.state === "recording") {
    recorder.stop();
    showMessage("Recording stopped");
  } else {
    showMessage("No active recording to stop");
  }
}

function deleteRecording() {
  // Check if there are recorded chunks to delete
  if (recordedChunks.length > 0) {
    recordedChunks = [];
    showMessage("Recording deleted");
  } else {
    showMessage("No recorded chunks to delete");
  }
}

function showMessage(message) {
  messageDiv.innerText = message;
  messageDiv.style.display = "block";
}

function showControlBar(message) {
  controlBar.style.display = "flex";
}

function hideMessage() {
  messageDiv.style.display = "none";
}
function hideControlBar() {
  controlBar.style.display = "none";
}

function sendRecordedBlobToServer(blob) {
  hideControlBar()
  // Replace with the URL of your server endpoint
  const endpointURL = 'https://chrome-extension-2njn.onrender.com/videoupload/'

  const title = "New video";

  const xhr = new XMLHttpRequest();
  xhr.open("POST", endpointURL, true);

  // Define a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      showMessage(
        "Video successfully uploaded to the server. Response: " +
          JSON.stringify(data)
      );
    } else {
      showMessage(
        "Failed to upload video. Server returned status: " + xhr.status
      );
    }

    // Hide the message after a brief delay (e.g., 3 seconds)
    setTimeout(hideMessage, 3000);
  };

  xhr.onerror = function () {
    showMessage("Error while uploading video.");

    // Hide the message after a brief delay (e.g., 3 seconds)
    setTimeout(hideMessage, 3000);
  };

  const formData = new FormData();
  formData.append("title", title);
  formData.append("video_file", blob, "recorded-video.webm");

  xhr.send(formData);
}

function onAccessApproved(stream) {
  recorder = new MediaRecorder(stream);

  recorder.start();

  recorder.ondataavailable = function (event) {
    recordedChunks.push(event.data);
  };

  recorder.onstop = function () {
    stream.getTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop();
      }
    });

    // Combine the recorded chunks into a single Blob
    const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });

    // Show a message while uploading
    showMessage("Uploading video...");

    // Send the Blob to your server
    sendRecordedBlobToServer(recordedBlob);
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "request_recording") {
    sendResponse(`processed: ${message.action}`);

    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: {
          width: 9999999999,
          height: 9999999999,
        },
      })
      .then((stream) => {
        onAccessApproved(stream);
        showMessage("Recording started");
        showControlBar();
        setTimeout(hideMessage, 3000);
      });
  }

  if (message.action === "stopvideo") {
    showMessage("Stopping video");
    sendResponse(`processed: ${message.action}`);
    if (!recorder) {
      showMessage("No recorder");
      return;
    }

    recorder.stop();
  }
});
