var site= require('./siteinfo.js');
var onfire = require("./onfire.js");

var sitestatic = site.sitestatic;
var sitebase = site.baseroot;
var siteroot = site.siteroot;
var siteupload = site.siteupload;
   
module.exports = {
	sitestatic:sitestatic,
	sitebase:sitebase,
	siteroot:siteroot,
	siteupload:siteupload,
}

