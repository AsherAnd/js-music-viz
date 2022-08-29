function imageMap() {
  loadPixels();
  // go through each column
  for (let y = 0; y < height; y++) {
    let row = [];
    // go through each row
    for (let x = 0; x < width; x++) {
      // index of pixels
      var index = (x + y * width) * 4;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      let brightness =
        Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114) / 100;
      const cell = [
        (cellBrightness = brightness),
        (cellColor = `rgb(${r},${g},${b})`),
      ];
      row.push(cell);
    }
    mappedCover.push(row);
  }
  //   console.log(mappedCover);
  updatePixels();
}

function loadCovers(currentCover) {
  var larger = width >= height ? width : height;

  // load image
  loadImage(currentCover, (img) => {
    image(img, width / 2, height / 2, larger / 2.5, larger / 2.5);
    imageMap(img);
    clear();
  });
}
