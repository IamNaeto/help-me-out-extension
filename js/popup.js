document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start_video');
    const videoToggle = document.getElementById('videoToggle');
    const audioToggle = document.getElementById('audioToggle');
    const popup = document.getElementById('popup');
    const recordBar = document.querySelector('.recordbar');
    const controlButtons = document.querySelector('.controlcontainer');
    const recordTiming = document.querySelector('.recordtiming h3');
    const stopButton = document.querySelector('.stopbtn');
    const deleteButton = document.querySelector('.deletebtn');
    const closePopoutImage = document.querySelector('.closepopout');
  
    let combinedStream = null;
    let mediaRecorder = null;
    let screenStream = null; // Added this line
    let chunks = [];
    let isPaused = false;
    let recordingStartTime = null;
    let pauseTime = 0;
    let timerInterval;
  
    // Function to update the recording timer
    function updateTimer() {
      const currentTime = new Date().getTime();
      const elapsedTime = new Date(currentTime - recordingStartTime + pauseTime);
      const formattedTime = elapsedTime.toISOString().substr(11, 8);
      recordTiming.textContent = formattedTime;
    }
  
    // Hide the record bar initially
    recordBar.style.display = 'none';
  
    // Event listener for the "Start Recording" button
    startButton.addEventListener('click', async function () {
      try {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
          // If recording is in progress, pause it
          mediaRecorder.pause();
          isPaused = true;
          clearInterval(timerInterval);
          startButton.textContent = 'Resume Recording';
          return;
        } else if (mediaRecorder && mediaRecorder.state === 'paused') {
          // If recording is paused, resume it
          mediaRecorder.resume();
          isPaused = false;
          pauseTime += new Date().getTime() - pauseTime;
          timerInterval = setInterval(updateTimer, 1000);
          startButton.textContent = 'Pause Recording';
          return;
        }
  
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: videoToggle.checked, audio: audioToggle.checked });
  
        // Create a new MediaRecorder for recording the screen stream
        mediaRecorder = new MediaRecorder(screenStream);
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
  
        mediaRecorder.onstop = () => {
          // Create a blob from recorded chunks
          const recordedBlob = new Blob(chunks, { type: 'video/webm' });
  
          // Reset variables
          mediaRecorder = null;
          chunks = [];
          isPaused = false;
          clearInterval(timerInterval);
          recordTiming.textContent = '00:00:00';
          startButton.textContent = 'Start Recording';
          pauseTime = 0;
  
          // Hide the record bar
          recordBar.style.display = 'none';
  
          // Send the recorded content to your endpoint here
          // Replace 'yourEndpointURL' with the actual endpoint URL
          const formData = new FormData();
          formData.append('recording', recordedBlob);
  
          fetch('yourEndpointURL', {
            method: 'POST',
            body: formData,
          })
            .then((response) => {
              // Handle the response from your server if needed
              console.log('Recording sent successfully!');
            })
            .catch((error) => {
              // Handle errors if the request fails
              console.error('Error sending recording:', error);
            });
        };
  
        recordingStartTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1000);
        mediaRecorder.start();
        startButton.textContent = 'Pause Recording';
  
        // Hide the popup once recording starts
        popup.style.display = 'none';
  
        // Show the record bar when recording starts
        recordBar.style.display = 'block';
      } catch (error) {
        console.error('Error starting/pausing/resuming recording:', error);
      }
    });
  
    // Event listener for the "Stop" button
    stopButton.addEventListener('click', function () {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        // If recording is in progress, stop it
        mediaRecorder.stop();
      }
    });

      // Event listener for the close popout image
  closePopoutImage.addEventListener('click', function () {
    popup.style.display = 'none';
  });

  // Event listener for the "Pause" button
  const pauseButton = document.querySelector('.pausebtn');
  pauseButton.addEventListener('click', function () {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      // If recording is in progress, pause it
      mediaRecorder.pause();
      isPaused = true;
      clearInterval(timerInterval);
      pauseButton.querySelector('p').textContent = 'Resume';
    } else if (mediaRecorder && mediaRecorder.state === 'paused') {
      // If recording is paused, resume it
      mediaRecorder.resume();
      isPaused = false;
      pauseTime += new Date().getTime() - pauseTime;
      timerInterval = setInterval(updateTimer, 1000);
      pauseButton.querySelector('p').textContent = 'Pause';
    }
  });

  // Event listener for the "Delete" button
  deleteButton.addEventListener('click', function () {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      // If recording is in progress, stop it
      mediaRecorder.stop();
    }

    // Reset variables
    mediaRecorder = null;
    chunks = [];
    isPaused = false;
    clearInterval(timerInterval);
    recordTiming.textContent = '00:00:00';
    pauseTime = 0;

    // Hide the record bar
    recordBar.style.display = 'none';

    // Hide the popup
    popup.style.display = 'none';
  });
  });
  

  