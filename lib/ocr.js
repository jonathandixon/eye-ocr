var brain = require("brain"),
    processor = require("./processor");

/**
 * OCR
 *
 * The provided canvas should contain an image for processing or at
 * least be ready for an image to be loaded.
 */
OCR = function(settings) {
  options = options || {};
  this.characterWidth = settings.width || 10;
  this.characterHeight = settings.height || 10;
  this.neuralNetwork = new NeuralNetwork();
}

OCR.prototype = {
  /**
   * This is a convienence function to auto train the
   * neural network using the visible ASCii characters.
   */
  autoTrainAscii: function(networkOptions) {
    var data = [];
    for (var i = 33; i < 127; i++) {
      // data.push(processCharacter(String.fromCharCode(i), fonts[k], true));
    }

    return net.train(data, networkOptions || {});
  },

  /**
   * Load from a pre trained network.
   */
  loadFromJson: function(json) {
  },

  /**
   * Convert this object to JSON representation containing
   * the json of the Brain JS neural network.
   */
  exportToJson: function() {
  }
}

exports.OCR = OCR;
