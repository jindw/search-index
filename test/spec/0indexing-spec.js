var fs = require('fs');
var si = require('../../lib/search-index.js')({logLevel:'info'});


describe('indexing and search', function () {


  var data = JSON.parse(fs.readFileSync('node_modules/reuters-21578-json/data/full/reuters-000.json'));

  it('should index one file of test data', function () {
    runs(function() {
      this.err = undefined;
      var that = this;
      si.add({'batchName': 'reuters-000.json', 'filters': ['places']}, data, function(err) {
        that.err = err;
      });
    });
    waitsFor(function() {
      return this.err != undefined;
    }, 'err not to be empty (search err returned)', 30000)
    runs(function () {
      expect(this.err).toEqual(false);
    });
  });


  var malformedData = JSON.parse('[1,2,3,4,5]');

  it('should fail prettily with malformed data', function () {
    runs(function() {
      this.err = undefined;
      var that = this;
      si.add({'batchName': 'malformed batch', 'filters': ['places']}, malformedData, function(err) {
        that.err = err;
      });
    });
    waitsFor(function() {
      return this.err != undefined;
    }, 'err to be true', 30000)
    runs(function () {
      expect(this.err).toEqual(true);
    });
  });


  it('verifies calibration after batch is indexed', function () {
    runs(function() {
      this.msg = undefined;
      var that = this;
      si.tellMeAboutMySearchIndex(function(msg) {
        return that.msg = msg;
      });
    });
    waitsFor(function() {
      return this.msg != undefined;
    }, 'TF~*~1987~~ should have a value of 1000 in TF index ', 30000)
    runs(function () {
      expect(this.msg.totalDocs).toEqual(1000);
    });
  });


});

