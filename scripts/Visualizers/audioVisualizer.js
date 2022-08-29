//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// Created on: Sep 19, 2021                                   //
// Description: This is music visualizer                      //
//              continued from a google CSSI project          //
//              I did with a team                             //
//                                                            //
////////////////////////////////////////////////////////////////

// get elements from html
const musicContainer = document.getElementById("musicContainer");
const shuffleBtn = document.getElementById("shuffleMusic");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const loopBtn = document.getElementById("repeat");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");

const volumeBtn = document.getElementById("volume");
const volumeSlider = document.getElementById("myRange");
const visualizerBtn = document.getElementById("visualizer");
const spotifyBtn = document.getElementById("spotify");
const deviceAudioBtn = document.getElementById("deviceAudio");

const audio = document.getElementById("audio");
const title = document.getElementById("musicTitle");
const artist = document.getElementById("musicArtist");
const cover = document.getElementById("musicCover");

// keep track of song, vol and visualizer
let songIndex = 0;
let visualIndex = 0;
let visualIndexMax = 3;
let muted = false;

// playlist
const covers = [];
let playlist = [];

// create reusable audio context
const audioContext = new AudioContext();
let audioSource;
let analyzer;

let bufferLength;
let frequencyData;
let timeData;
let ampData;

let averageVol = 0;

// visualizer variables
let barVisual = new Bar();
let starVisual;
let circleVisual = new Circle(window.innerWidth, window.innerHeight * 0.88, 0);
let mappedCover = [];
let particlesVisual;

// when screen size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.88);

  // reset values
  clear();
  mappedCover = [];
  starVisual = [];
  particlesVisual = [];

  starSetup();
  particlesSetup();
}

// setup
function setup() {
  createCanvas(windowWidth, windowHeight * 0.88);
  pixelDensity(1);
  angleMode(DEGREES);
  imageMode(CENTER);
  colorMode(HSB, 360, 100, 100, 255);

  // get playlist
  getPlaylist();

  // setup audio stuff
  audioSetup(audio);

  // setup controller event listeners
  audioControlSetup();

  // setup star visual
  starSetup();
}

// display visuals
function draw() {
  // clear background for each visual except particles
  if (visualIndex != 3) {
    clear();
  }

  // get audio data
  analyzeMusic();
  getAverageVolume();

  // visualizers
  switch (visualIndex) {
    case 0:
      barVisual.update(bufferLength, frequencyData, averageVol);
      break;
    case 1:
      // translate canvas position
      translate(width / 2, height / 2);

      for (let i = 0; i < starVisual.length; i++) {
        starVisual[i].update(averageVol);
      }
      break;
    case 2:
      circleVisual.update(width, height, averageVol);
      break;
    case 3:
      if (mappedCover.length === 0) {
        loadCovers(cover.src);

        // set up particles
        particlesSetup();
      } else {
        // background transparency
        background(0, 0, 0, 5);
        for (let i = 0; i < particlesVisual.length; i++) {
          particlesVisual[i].update(mappedCover, averageVol);
        }
      }
  }
  ///////////////////////// under construction////////////////////////////

  // // polygraph visualizer
  // else if (visualIndex === 3) {
  //   clear();
  //   polyVizual(polyViz, averageVol);
  // }
  ///////////////////////// under construction////////////////////////////
}
