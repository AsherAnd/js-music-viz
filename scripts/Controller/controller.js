function audioControlSetup() {
  // event listeners for button controls
  shuffleBtn.addEventListener("click", shuffleButton);
  playBtn.addEventListener("click", playButton);
  nextBtn.addEventListener("click", nextButton);
  prevBtn.addEventListener("click", previousButton);
  loopBtn.addEventListener("click", loopButton);

  // event listener for volume button
  volumeBtn.addEventListener("click", muteVolume);

  // progress bar of track
  audio.addEventListener("timeupdate", songTime);

  // click on progress bar
  progressContainer.addEventListener("click", clickTime);

  // when song ends play next
  audio.addEventListener("ended", nextButton);

  // change volume
  volumeSlider.addEventListener("input", volumeSliding);

  // change visualizer
  visualizerBtn.addEventListener("click", visualizerButton);

  // use spotify features
  spotifyBtn.addEventListener("click", spotifyButton);

  // listen to device
  deviceAudioBtn.addEventListener("click", deviceAudioButton);
}

function deviceAudioButton() {
  if (!deviceAudioBtn.classList.contains("active")) {
    deviceAudioBtn.classList.add("active");
    console.log("Device Audio Button Active");

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        audioSetup(stream);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deviceAudioBtn.classList.remove("active");
    console.log("Device Audio Button Deactive");
    audioSetup(audio);
  }
}

function loopButton() {
  const isLooping = musicContainer.classList.contains("repeat");

  if (isLooping) {
    musicContainer.classList.remove("repeat");
    loopBtn.innerHTML =
      '<span class="material-icons" style="font-size:25px;">repeat</span>';
  } else {
    musicContainer.classList.add("repeat");
    loopBtn.innerHTML =
      '<span class="material-icons" style="font-size:25px;">repeat_one</span>';
  }
}

function muteVolume() {
  if (volume.innerHTML === "volume_up") {
    volumeBtn.innerHTML = "volume_off";
    audio.volume = 0;
    muted = true;
  } else {
    volumeBtn.innerHTML = "volume_up";
    muted = false;
    audio.volume = volumeSlider.value / 100;
  }
}

function nextButton() {
  const isPlaying = musicContainer.classList.contains("play");
  const isLooping = musicContainer.classList.contains("repeat");

  if (!isLooping) {
    playlist.index += 1;
  }

  if (playlist.index >= playlist.length) {
    playlist.index = 0;
  }

  playlist.loadSong();
  mappedCover = [];
  particlesVisual = [];

  if (isPlaying) {
    playSong();
  }
}

function pauseSong() {
  musicContainer.classList.remove("play");
  audio.pause();
}

function playButton() {
  const isPlaying = musicContainer.classList.contains("play");

  // change button state
  if (isPlaying) {
    pauseSong();
    playBtn.innerHTML =
      '<span class="material-icons" style="font-size:30px;">play_arrow</span>';
  } else {
    playSong();
    playBtn.innerHTML =
      '<span class="material-icons" style="font-size:30px;">pause</span>';
  }
}

function playSong() {
  musicContainer.classList.add("play");
  audio.play();
}

function previousButton() {
  const isPlaying = musicContainer.classList.contains("play");
  const isLooping = musicContainer.classList.contains("repeat");

  if (!isLooping) {
    playlist.index -= 1;
  }

  if (playlist.index < 0) {
    playlist.index = playlist.length - 1;
  }

  playlist.loadSong();
  mappedCover = [];
  particlesVisual = [];

  if (isPlaying) {
    playSong();
  }
}

function shuffleButton() {
  console.log("Shuffle Button Clicked");
}

// progress bar
function songTime(e) {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function clickTime(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function visualizerButton() {
  if (visualIndex < visualIndexMax) {
    visualIndex += 1;
  } else {
    visualIndex = 0;
  }
  console.log(visualIndex);
}

function volumeSliding(e) {
  if (!muted) {
    audio.volume = this.value / 100;
  }
  console.log(this.value);
}
