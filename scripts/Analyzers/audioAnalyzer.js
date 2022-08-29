function audioSetup(source) {
  // Make sure it is not suspended (just incase, not really needed)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  if (source == audio) {
    audioSource = audioContext.createMediaElementSource(source);
  } else {
    audioSource = audioContext.createMediaStreamSource(source);
  }

  // audio context analyzer variable
  analyzer = audioContext.createAnalyser();
  audioSource.connect(analyzer);
  analyzer.connect(audioContext.destination);
  analyzer.fftSize = 1024;

  // analyze sound data
  bufferLength = analyzer.frequencyBinCount;
  frequencyData = new Uint8Array(bufferLength);
  timeData = new Uint8Array(bufferLength);
  ampData = new Float32Array(analyzer.fftSize);
}

function analyzeMusic() {
  // smoothing
  analyzer.smoothingTimeConstant = 0.85;

  // get analyzer data
  analyzer.getByteFrequencyData(frequencyData);
  analyzer.getByteTimeDomainData(timeData);
  analyzer.getFloatTimeDomainData(ampData);
  // console.log(frequencyData);
  // console.log(timeData);
}

function getAverageVolume() {
  let sumSquares = 0.0;
  for (const i of ampData) {
    sumSquares += i * i;
  }

  averageVol = Math.sqrt(sumSquares / ampData.length);
  // console.log(averageVol);
}
