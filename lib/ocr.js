var brain = require("brain"),
    canvas = require("canvas"),
    processor = require("./processor");

/**
 * OCR
 */
OCR = function(settings) {
  settings = settings || {};
  this.characterSize = settings.characterSize || 10;

  // TODO: Consider initializing NN when training.
  this.neuralNetwork = new brain.NeuralNetwork();
}

OCR.prototype = {
  /**
   * This is a convienence function to auto train the
   * neural network using the visible ASCii characters.
   */
  autoTrainAscii: function(options, crossValidate) {
    var fonts = ["Arial", "Courier", "Georgia", "Menlo", "Optima",
        "Copperplate", "American Typewriter", "Comic Sans",
        "Baskerville", "Verdana", "Helvetica", "Didot",
        "Geneva", "Cracked", "Impact", "Cooper"];

    var context = new canvas(this.characterSize).getContext("2d");
 
    var data = [];
    for (var i = 33; i < 127; i++) {
      fonts.forEach(function(font) {
        data.push(processor.dataFromString(String.fromCharCode(i), this.characterSize, font, context));
      });
    }

    return this.trainNetwork(data, options, crossValidate)
  },

  /**
   * Pass throught to Brain.NeuralNetwork.train().
   */
  trainNetwork: function(data, options, crossValidate) {
    if (crossValidate) {
      return brain.crossValidate(brain.NeuralNetwork, data, options || {});
    }
    return this.neuralNetwork.train(data, options || {});
  },

  /**
   * Load an image from file, extract data and run through the OCR
   * neural network.
   */
  runOnFile: function(file) {
    fs.readFile(file, function(error, source) {
      if (err) throw err;
      image = new Image;
      image.src = source;
    });
  },

  /**
   * Load from a pre trained network.
   */
  loadFromJson: function(json) {
    this.characterSize = json.characterSize;
    this.neuralNetwork.fromJSON(json.neuralNetwork);
  },

  /**
   * Convert this object to JSON representation containing
   * the json of the Brain JS neural network.
   */
  exportToJson: function() {
    return {
      characterSize: this.characterSize,
      neuralNetwork: this.neuralNetwork.toJSON()
    }
  }
}

exports.OCR = OCR;
