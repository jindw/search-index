var fs = require('fs');

describe('configuration', function () {
  it('should accept configuration', function () {
    si = require('../../lib/search-index.js')({ indexPath: 'si2' });
    expect(si).toBeDefined();
  });

  it('should accept indexPath in configuration', function () {
    var si;

    runs(function() {
      si = require('../../lib/search-index.js')({ indexPath: 'si2' });
    });

    waitsFor(function () {
      return fs.existsSync('si2');
    }, 5000);
  });

  it('should accept logSilent in configuration', function () {
     var si;

     runs(function () {
         si = require('../../lib/search-index.js')({ logSilent: true });
     });

     waitsFor(function() {
         return searchIndexLogger.transports.console.silent;
     }, 5000);
  });
});
