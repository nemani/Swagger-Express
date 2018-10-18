'use strict';
var util = require('util');
module.exports = {
  uploadFile: uploadFile
};

function uploadFile(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var file = req.swagger.params.file.value;
  var base64img = new Buffer(file.buffer).toString('base64')
  var message = "This is the base64 encoded version of the string"
  // this sends back a JSON response which is a single string
  res.status(200).json({message, base64img})
}
