//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// (Re)Created on: Oct. 10th, 2021                            //
// Description: Audio visualizer. Inspired by the coding      //
//              train video on youtube                        //
//              https://www.youtube.com/watch?v=2O3nm0Nvbi4   //
//                                                            //
////////////////////////////////////////////////////////////////

class Bar {
  constructor(bufferLength, frequencyData, averageVol) {
    this.bufferLength = bufferLength;
    this.frequencyData = frequencyData;
    this.averageVol = averageVol;
    this.binNum = 128;
  }

  draw() {
    for (let i = 0; i < this.bufferLength; i++) {
      // color of bars
      var color = map(i, 0, this.binNum, 360, 0);
      var brightness = map(this.averageVol, 0, 1, 40, 100);

      noStroke();
      fill(color, 80, brightness);

      // draw bars
      var y = map(this.frequencyData[i], 0, 256, height * 0.995, 0);
      rect((i * width) / this.binNum, y, width / this.binNum - 4, height - y);
    }
  }

  update(bufferLength, frequencyData, averageVol) {
    this.bufferLength = bufferLength;
    this.frequencyData = frequencyData;
    this.averageVol = averageVol;
    this.draw();
  }
}
