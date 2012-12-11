var fs = require('fs');

exports.build = function(dest) {
  var source = require('browserify').bundle({
    name: 'ocr',
    base: __dirname + '/lib',
    main: __dirname + '/lib/ocr.js',
    require: 'underscore',
    shim: false
  });
  
  source = 'var ocr = (function() {' + source + ' return require('ocr')})();'

  fs.writeFileSync(dest, source);
}
