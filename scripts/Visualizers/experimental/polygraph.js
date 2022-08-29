//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// Created on: Oct. 23th, 2021                                //
// Description: Audio visualizer that resembles a polygraph   //
//                                                            //
////////////////////////////////////////////////////////////////

// Ok future Asher, here is the general idea
// You work out the math and stuff...sucks to be you
// But anyway, look at the demo below
// It just lines the amplitude on the canvas
// Songs look like a polygraph
// Divide them into 4 different frequqency detectors to resemble an actual polygraph
// Sounds like a cool idea, right?
// https://www.youtube.com/watch?v=jEwAMgcCgOA&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=9

function polyVizual(polyViz, averageVol) {
  polyViz.push(averageVol);

  stroke(255);
  noFill();

  for (j = 1; j <= 4; j++) {
    beginShape();
    for (i = 0; i < polyViz.length; i++) {
      let x = map(polyViz[i], 0, 1, (width * j) / 5, 0);
      vertex(x, i);
    }
    endShape();

    if (polyViz.length > height) {
      polyViz.splice(0, 1);
    }
  }

  // stroke(255);
  // line(width / 5, 0, width / 5, height);
  // line((width * 2) / 5, 0, (width * 2) / 5, height);
  // line((width * 3) / 5, 0, (width * 3) / 5, height);
  // line((width * 4) / 5, 0, (width * 4) / 5, height);
}
