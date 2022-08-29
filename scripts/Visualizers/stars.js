//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// (Re)Created on: Oct. 11th, 2021                            //
// Description: Audio visualizer. Inspired by the coding      //
//              train video on youtube                        //
//              https://www.youtube.com/watch?v=17WoOqgXsRM   //
//                                                            //
////////////////////////////////////////////////////////////////

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
    this.color;
  }

  draw() {
    // positions
    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);
    var r = map(this.z, 0, width, 8, 0);
    //ellipse(sx, sy, r);

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(this.color, 80, 80);
    line(px, py, sx, sy);
  }

  update(averageVol) {
    //map the average vol to speed
    let speed = map(averageVol, 0, 1, width / 2, 2);
    this.z = speed;
    this.color = map(this.z, width / 2, 0, 0, 325);

    if (this.z == 0) {
      this.z = width;
    }

    this.draw();
  }
}

function starSetup() {
  // populate star
  var larger = width >= height ? width : height;

  starVisual = new Array(Math.round(larger * 2));
  for (let i = 0; i < starVisual.length; i++) {
    starVisual[i] = new Star();
  }
}
