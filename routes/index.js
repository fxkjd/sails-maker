var express = require('express');
var router = express.Router();
var file_system = require('fs');
var archiver = require('archiver');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST web page downloader. */
router.post('/createPage', function(req, res, next) {
  var path = __dirname + '/../template/static';
  var zipPath = __dirname + '/../.tmp/webpage.zip';

  var output = file_system.createWriteStream(zipPath);
  var archive = archiver('zip');

  output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
      res.download(zipPath, function(err){
        if (!err) return; // file sent
        if (err && err.status !== 404) return next(err); // non-404 error
        // file for download not found
        res.statusCode = 404;
        res.send('Cant find that file, sorry!');
      });

  });

  archive.on('error', function(err){
      throw err;
  });

  archive.pipe(output);
  archive.bulk([
      { expand: true, cwd: path, src: ['**'], dest: "webpage"}
  ]);
  archive.finalize();
});

module.exports = router;
