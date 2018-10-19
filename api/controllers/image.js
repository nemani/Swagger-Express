"use strict";
var util = require("util");
var fs = require("fs");
var crypto = require("crypto");

module.exports = {
	uploadFile: uploadFile
};

function uploadFile(req, res) {
	// variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
	var file = req.swagger.params.file.value;

	// Create Binary data for file
	var imagedata = new Buffer(file.buffer).toString("binary");

	// Create SHA-256 hash of the image
	var sha256img = crypto.createHash("sha256");
	sha256img.update(imagedata);
	sha256img = sha256img.digest("hex");

	// Get the extension
	var ext = file.originalname.split(".").splice(-1, 1);

	// calculate fpath
	var fpath = "./imagestore/" + sha256img + "." + ext;

	// Save the image
	fs.writeFile(fpath, imagedata, "binary", function(err) {
		if (err) throw err;
		console.log("File saved.");
	});

	var message = "Image Saved!";
	// this sends back a JSON response which is a single string
	res.status(200).json({ message, fpath });
}
