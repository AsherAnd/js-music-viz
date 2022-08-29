//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// (Re)Created on: Oct. 11th, 2021                            //
// Description: Audio visualizer. Inspired by the coding      //
//              train video on youtube                        //
//              https://www.youtube.com/watch?v=2O3nm0Nvbi4   //
//                                                            //
////////////////////////////////////////////////////////////////

class Circle {
  constructor(width, height, averageVol) {
    this.width = width;
    this.height = height;
    this.averageVol = averageVol;
    this.larger = width >= height ? width : height;
    this.smaller = width >= height ? height : width;
    this.circleViz = [];
  }

  draw() {
    // inner circle visual
    var innerSize = map(
      this.averageVol,
      0,
      1,
      this.larger / 10,
      this.larger / 4
    );
    var vizColor = map(this.averageVol, 0, 1, 0, 360);

    stroke(vizColor, 80, 80);
    noFill();
    ellipse(this.width / 2, this.height / 2, innerSize);

    // outer circle visual
    this.circleViz.push(this.averageVol);
    push();

    strokeWeight(map(this.larger, 100, 1920, 4, 14));

    stroke(vizColor, 80, 80);
    beginShape();
    translate(this.width / 2, this.height / 2);

    // loop through each average volume pushed
    for (var i = 0; i < this.circleViz.length; i++) {
      var r = map(this.circleViz[i], 0, 1, this.smaller / 6, this.larger / 3);
      var x = r * cos(i);
      var y = r * sin(i);
      point(x, y);
      // vertex(y, x);
    }
    endShape();
    pop();

    // remove previous averageVols to then keep drawing
    if (this.circleViz.length > 360) {
      // removes previous index
      this.circleViz.splice(0, 1);
    }
  }

  update(width, height, averageVol) {
    this.averageVol = averageVol;
    this.width = width;
    this.height = height;
    this.averageVol = averageVol;
    this.larger = width >= height ? width : height;
    this.smaller = width >= height ? height : width;
    this.draw();
  }
}
