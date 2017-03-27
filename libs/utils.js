var libs = process.cwd() + '/libs/';
var config = require(libs + 'config');
var crypto = require('crypto');
var sha1Hex = require('sha1-hex');
var md5 = require('md5');
var iconv = require('iconv-lite');
var ObjectId = require('mongodb').ObjectID;
var isObjectId = require('mongodb-objectid-helper').isObjectId;

var utils = {

	convert: function(data, from, to){
		return iconv.encode(iconv.decode(new Buffer(data, 'binary'), from), to).toString();
	},

	cryptoPass: function(pass){
		return crypto.createHash('sha256').update(pass + "." + config.get('session:secret')).digest('hex');
	},

	cryptoHash: function(login, pass, id){
		return crypto.createHash('sha256').update(login + "." + pass + "." + id).digest('hex');
	},

	cryptoCheck: function(login, pass, id, hash){
		if (crypto.createHash('sha256').update(login + "." + pass + "." + id).digest('hex') !== hash){
			return false;
		}
		else {
			return true;
		}
	},

	sha1Hex: function(value){
		return sha1Hex(value);
	},

	md5: function(value){
		return md5(value);
	},

	copyArray: function(data){
		return JSON.parse(JSON.stringify(data));
	},

	newId: function(){
		return String(Math.round(new Date().getTime() / 1000));
	},

	ObjectId: function(id){
		return id ? ObjectId(id) : id;
	},

	isObjectId: function(id){
		//return id ? /^[0-9a-fA-F]{24}$/.test(id) : id;
		return id ? isObjectId(id) : id;
	},

	getClientAddress: function(req){
		return (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
	},

	numberFormat: function(number, dec, dsep, tsep) {
		if (isNaN(number) || number == null) return '';

		number = parseInt(number).toFixed(~~dec);
		tsep = typeof tsep == 'string' ? tsep : ',';

		var parts = number.split('.'),
			fnums = parts[0],
			decimals = parts[1] ? (dsep || '.') + parts[1] : '';

		return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
	},

	deepFindWhere: function(obj, p, v, result){
	    if (obj instanceof Array) {
	        for (var i = 0; i < obj.length; i++) {
	            result = utils.deepFindWhere(obj[i], p, v, result);
	        }
	    }
	    else {
	        for (var prop in obj) {
	            if (prop == p) {
	                if (obj[prop] == v) {
	                    result = obj;
	                }
	            }
	            if (obj[prop] instanceof Object || obj[prop] instanceof Array){
	                result = utils.deepFindWhere(obj[prop], p, v, result);
				}
	        }
	    }
	    return result;
	}

}

module.exports = utils;
