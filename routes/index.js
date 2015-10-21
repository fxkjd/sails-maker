var express = require('express')
  , creator = require('../services/creator')
  , router = express.Router();

var zip = __dirname + '/../.tmp/webpage.zip';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST web page downloader. */
router.post('/createPage', function(req, res, next) {

  //Get models and attributes  
  var data = req.body;
  var models = [
    {
      name: "animal",
      attr: [
        {
          name: "name",
          type: "string"
        },
        {
          name: "weight",
          type: "int"
        }
      ]
    },
    {
      name: "user",
      attr: [
        {
          name: "name",
          type: "string"
        },
        {
          name: "street",
          type: "string"
        }
      ]
    }
  ];

  creator.CreateProject(models, function(zipPath, err) { 
    if (err) {
      return next(err)
    } else {
      console.log("ZIP PATH: " +zipPath);
      console.log("ZIP PATH: " + zip);
      res.download(zip, function(err){
        console.log(err);
        if (!err) return; // file sent
        if (err && err.status !== 404) return next(err); // non-404 error
        // file for download not found
        res.statusCode = 404;
        res.send('Cant find that file, sorry!');
      });
    }
  });


});

module.exports = router;
