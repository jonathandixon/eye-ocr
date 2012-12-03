var assert = require('assert'),
    canvas = require('canvas'),
    _ = require('underscore'),
    processor = require('../lib/processor'),
    horus = require('../lib/horus');

describe('Array', function(){

  describe('extractDataTest', function(){
    it('test extract data from canvas image data', function(){
      var size = 10;
      var context = new canvas(size).getContext("2d");
      context.font = size + 'px Helvetica';
      context.fillText('A', 0, size);
      
      var imageData = context.getImageData(0, 0, size, size);
      
      var result = processor.extractData(imageData);
      assert.ok(result.length == size * size);

      var sum = _.reduce(result, function(sum, n) { return sum + n; }, 0);
      assert.ok(sum > 1, 'Sum: ' + sum + ', was expecting > 1.');
    })
  }),

  describe('dataFromStringTest', function(){
    it('test extract data from character', function(){
      var size = 10, character = 'A';
      var result = processor.dataFromString(character, size, 'Helvetica');
      assert.ok(result.input.length == size * size);
      assert.ok(result.output[character] == 1);
    })
  }),

  describe('autoTrainAsciiTest', function(){
    it('train network to recognize visible ascii characters', function(){
      var ocr = new horus.OCR();

      var result = ocr.autoTrainAscii();

      console.log("\nMisclassifications:");
      result.misclasses.forEach(function(misclass) {
        console.log("input: " + misclass.input
          + " actual: " + letters[misclass.actual]
          + " expected: " + letters[misclass.expected] + "\n")
      })
      
      console.log("\nCross-validation of OCR data:\n");
      console.log(result.avgs);
      
      console.log("\nMisclassification rate: "
        + result.misclasses.length / data.length);
      
      console.log("\nMean squared error: "
        + result.avgs.error);
      
      var perf = result.avgs.iterations / (result.avgs.trainTime / 1000);
      console.log("\nTraining iterations per second: " + perf);
      
      assert.ok(result.avgs.error < .1);
      
    })
  })

});
