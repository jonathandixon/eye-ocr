var assert = require('assert'),
    canvas = require('canvas'),
    _ = require('underscore'),
    processor = require('../lib/processor'),
    horus = require('../lib/horus');

describe('OCR', function(){

  describe('dataFromStringTest', function(){
    it('test extract data from character', function(){
      var size = 10, character = 'A';
      var result = processor.dataFromString(character, size, 'Helvetica');
      assert.ok(result.input.length == size * size);
      assert.ok(result.output[character] == 1);
    })
  })

  describe('autoTrainAsciiTest', function(){
    it('train network to recognize visible ascii characters', function(){
      var ocr = new horus.OCR();
      var result = ocr.autoTrainAscii({
        errorThresh: 0.01, // High threshold for speed.
        iterations: 100 // Limit total iterations.
      });

      assert.ok(result.error < .01 || result.iterations == 100);
    })
  })

});
