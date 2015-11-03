var Promise = require("bluebird")
  , fs = Promise.promisifyAll(require('fs'))
  , archiver = Promise.promisifyAll(require('archiver'))
  , ncp = Promise.promisify(require('ncp').ncp)
  , mkdirp = require('mkdirp-promise')
  , ejs = require('ejs')
  , path = __dirname + '/../template/model.ejs'
  , pathC = __dirname + '/../template/controller.ejs'
  , pathVIndex = __dirname + '/../template/views/index.ejs'
  , pathVAdd = __dirname + '/../template/views/add.ejs'
  , pathVEdit = __dirname + '/../template/views/edit.ejs'
  , pathVShow = __dirname + '/../template/views/show.ejs'
  , pathVForm = __dirname + '/../template/views/form.ejs'

  , str = fs.readFileSync(path, 'utf8')
  , strC = fs.readFileSync(pathC, 'utf8')
  , strVIndex = fs.readFileSync(pathVIndex, 'utf8')
  , strVAdd = fs.readFileSync(pathVAdd, 'utf8')
  , strVEdit = fs.readFileSync(pathVEdit, 'utf8')
  , strVShow = fs.readFileSync(pathVShow, 'utf8')
  , strVForm = fs.readFileSync(pathVForm, 'utf8');

var staticPath = __dirname + '/../template/static'
  , path = __dirname + '/../.tmp/webpage'
  , zipPath = __dirname + '/../.tmp/webpage.zip';

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var createFiles = function(model) {

  var modelInfo = {
    name: model.name,
    nameC: model.name.capitalizeFirstLetter(),
    namePlural: model.name + "s", //TODO: fix this name
    attributes: model.attr,
    attributesNOI18N: model.attr,
    hasI18N: false,
    localFilename: model.name + "Controller",
    E: "%>",
    S: "<%",
    SE: "<%=",
    SP: "<%-"
  };

  var retM = ejs.render(str, modelInfo)
  , retC = ejs.render(strC, modelInfo)
  , retVI = ejs.render(strVIndex, modelInfo)
  , retVA = ejs.render(strVAdd, modelInfo)
  , retVE = ejs.render(strVEdit, modelInfo)
  , retVS = ejs.render(strVShow, modelInfo)
  , retVF = ejs.render(strVForm, modelInfo);

  mkdirp(path + "/views/" + modelInfo.name)
  .then(function(made){
    return [
      fs.writeFile(path + "/api/models/" + modelInfo.name.capitalizeFirstLetter() + ".js", retM),
      fs.writeFile(path + "/api/controllers/" + modelInfo.localFilename.capitalizeFirstLetter() + ".js", retC),
      fs.writeFile(path + "/views/" + modelInfo.name + "/index.ejs", retVI),
      fs.writeFile(path + "/views/" + modelInfo.name + "/add.ejs", retVA),
      fs.writeFile(path + "/views/" + modelInfo.name + "/edit.ejs", retVE),
      fs.writeFile(path + "/views/" + modelInfo.name + "/show.ejs", retVS),
      fs.writeFile(path + "/views/" + modelInfo.name + "/form.ejs", retVF)
    ];
  }).catch(function(e) {
    throw e;
  });
};

module.exports = {
  CreateProject: function (models, cb) {    
    console.log("IN CREATOR");
    console.log("models: %j",models);
      
    ncp(staticPath, path)
    .then(function() {
      Promise.map(models, createFiles);
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
  }
};

