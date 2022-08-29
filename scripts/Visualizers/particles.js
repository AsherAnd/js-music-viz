//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// (Re)Created on: Oct. 24th, 2021                            //
// Description: Audio visualizer. Inspired by the coding      //
//              train video on youtube                        //
//              https://www.youtube.com/watch?v=UoTxOVEecbI   //
//                                                            //
////////////////////////////////////////////////////////////////

class Particle {
  constructor(partLength, partIndex, averageVol) {
    this.averageVol = averageVol;
    this.partLength = partLength;
    this.x = width / 2 - this.partLength / 2 + partIndex;
    this.y = height / 2 - this.partLength / 2;
    this.r = random(1, 2.5);
    this.speed = 0;
    this.velocity = random(0, 0.5);
    this.pixPosX = Math.floor(this.x);
    this.pixPosY = Math.floor(this.y);
  }

  draw() {
    // particle reacting to music
    var sizeIncrease = map(this.averageVol, 0, 1, 1, 2.5);

    // draw particle using colors from cover image
    fill(mappedCover[this.pixPosY][this.pixPosX][1]);
    noStroke();
    ellipse(this.x, this.y, this.r * sizeIncrease);
  }

  update(mappedCover, averageVol) {
    this.averageVol = averageVol;

    // particle reacting to music
    var musicBoost = map(this.averageVol, 0, 1, 0, height / 100);

    // so the index of the particle position is always an integer
    this.pixPosX = Math.floor(this.x);
    this.pixPosY = Math.floor(this.y);

    // make particles move at different speed depending on image pixel brightness
    this.speed = mappedCover[this.pixPosY][this.pixPosX][0];
    var movement = 2 - this.speed + this.velocity; //2.5 is a relative brightness calculated from image, might need to change to more accurate number

    // fall animation
    this.y = this.y + movement + musicBoost;

    // after it exists screen
    if (this.y > height / 2 + this.partLength / 2) {
      this.y = height / 2 - this.partLength / 2;
    }

    this.draw();
  }
}

function particlesSetup() {
  // populate particles
  var larger = width >= height ? width : height;

  particlesVisual = new Array(Math.floor(larger / 2.5));
  for (let i = 0; i < particlesVisual.length; i++) {
    particlesVisual[i] = new Particle(particlesVisual.length, i);
  }
}
