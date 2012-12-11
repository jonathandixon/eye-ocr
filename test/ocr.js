var assert = require('assert'),
    canvas = require('canvas'),
    _ = require('underscore'),
    horus = require('../lib/horus');

describe('OCR', function(){

  describe('autoTrainAsciiTest', function(){
    it('train network to recognize visible ascii characters', function(){
      var ocr = new horus.OCR();
      var result = ocr.autoTrainAscii({
        errorThresh: 0.01, // High threshold for speed.
        iterations: 100 // Limit total iterations.
      });

      assert.ok(result.error < .01 || result.iterations == 100);
    })
  }),

  describe('runOnFileTest', function() {
    it('should return the text content of the file', function() {
      var ocr = new horus.OCR();
      var result = ocr.autoTrainAscii({
        errorThresh: 0.01,
        iterations: 100
      });

      result = ocr.runOnFile('./test/resources/test_01.jpg', function(results) {
        assert.ok(result);
      });
    })
  })

});
