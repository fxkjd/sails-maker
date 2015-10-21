var Promise = require("bluebird")
  , fs = Promise.promisifyAll(require('fs'))
  , archiver = Promise.promisifyAll(require('archiver'))
  , ncp = Promise.promisify(require('ncp').ncp)
  , ejs = require('ejs')
  , path = __dirname + '/../template/model.ejs'
  , pathC = __dirname + '/../template/controller.ejs'
  , str = fs.readFileSync(path, 'utf8')
  , strC = fs.readFileSync(pathC, 'utf8');

var staticPath = __dirname + '/../template/static'
  , path = __dirname + '/../.tmp/webpage'
  , zipPath = __dirname + '/../.tmp/webpage.zip';

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var modelFiles = function(model) {
  var ret = ejs.render(str, {
    name: model.name,
    attributes: model.attr
  });

  return fs.writeFile(path + "/api/models/" + model.name.capitalizeFirstLetter() + ".js", ret);
};

var controllerFiles = function(model) {

  var localFilename = model.name + "Controller";
  var ret = ejs.render(strC, {
    name: model.name,
    nameC: model.name.capitalizeFirstLetter(),
    namePlural: model.name + "s", //TODO: fix this name
    attributes: model.attr,
    attributesNOI18N: model.attr,
    hasI18N: false,
    localFilename: localFilename
  });

  return fs.writeFile(path + "/api/controllers/" + localFilename.capitalizeFirstLetter() + ".js", ret);
};

module.exports = {
  CreateProject: function (models, cb) {    
    console.log("IN CREATOR");
    console.log("models: %j",models);
    ncp(staticPath, path)
    .then(function() {
      Promise.map(models, modelFiles);
    }).then(function() {
      Promise.map(models, controllerFiles);
    }).then(function () {
      var output = fs.createWriteStream(zipPath);
      var archive = archiver('zip');

      output.on('close', function () {
          console.log(archive.pointer() + ' total bytes');
          console.log('archiver has been finalized and the output file descriptor has closed.');
          cb(zipPath, null);
      });

      archive.on('error', function(err){
          throw err;
      });

      archive.pipe(output);
      archive.bulk([
          { expand: true, cwd: path, src: ['**'], dest: "webpage"}
      ]);
      archive.finalize();    
    }).catch(function(err){
      console.log(err);
      cb(null, err);
    });
    /*if (err) {
      return console.error(err);
    }

    var ret = ejs.render(str, {
      name: models[0].name,
      attributes: models[0].attr
    });

    fs.writeFile(path + "/api/models/" + models[0].name.capitalizeFirstLetter(), ret, function(err) {
      if(err) {
          return console.log(err);
      }
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
      console.log('done!');
    });*/
  }
};

