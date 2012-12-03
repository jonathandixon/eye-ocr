
function processCanvas() {
  return true;
}

/**
 * Returns neural network data for given character.
 *
 * @param character The character to anaylyze.
 * @param pxSize Size of character in pixels.
 * @param font Font used to draw character.
 * @param context Canvas 2D context to use to draw character.
 */
function dataFromString(character, pxSize, font, context) {
  pxSize = pxSize || 10;
  font = font || 'Helvetica';
  context = context || new canvas(pxSize).getContext("2d");

  context.clearRect(0, 0, pxSize, pxSize);
  context.font = pxSize + 'px ' + font;
  context.fillText(character, 0, pxSize);

  var imageData = context.getImageData(0, 0, pxSize, pxSize);
  
  var data = {
    input: extractData(imageData),
    output: {}
  };
  data.output[character] = 1;

  return data;  
}

function extractData(imageData) {
  var points = [];
  for (var x = 0; x < imageData.width; x++) {
    for (var y = 0; y < imageData.height; y++) {
      var i = x * 4 + y * 4 * imageData.width;

      var point = imageData[i+3] == 0 ? 1 :
          (imageData.data[i] * 299/1000 +
          imageData.data[i+1] * 587/1000 +
          imageData.data[i+2] * 114/1000) / 255;

      points.push(point);
    }
  }
  return points;
}

module.exports = {
  dataFromString: dataFromString,
  extractData: extractData
};
