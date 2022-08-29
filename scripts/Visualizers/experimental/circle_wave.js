//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// Created on: Oct. 23th, 2021                                //
// Description: Audio visualizer. Creates circle              //
//              wave for each beat                            //
//                                                            //
////////////////////////////////////////////////////////////////

// So my genral idea for this is
// have a bunch of circles (or just one now that I'm thinking about it) leave from the center of the screen
// everytime a beat hits

function circleWave() {
  stroke(100, 20, 30);
  strokeWeight(15);
  noFill();

  translate(width / 2, height / 2);
  beginShape();
  for (let i = 0; i < 360; i += 9) {
    let r = 200;
    let y = r * sin(i);
    let x = r * cos(i);

    point(x, y);
  }
  endShape();
}
