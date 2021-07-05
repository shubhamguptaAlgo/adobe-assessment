
const dataPath = './json/hospital.json';

const fs = require('fs');
const resHndlr = require('../common/resHandler');


// refactored helper methods
const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = 'utf8'
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
          resHndlr.sendError(res, err);
      }
  
      callback(returnJson ? JSON.parse(data) : data);
    });
  };
  
  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = 'utf8'
  ) => {
    fs.writeFile(filePath, fileData, encoding, err => {
      if (err) {
        resHndlr.sendError(res, err);
  
      }
  
      callback();
    });
  };
  
  module.exports = {
      readFile,
      writeFile
  }