var objects = require('./objects.js');
var assert = require('assert');

var BridgeParse = function()
{
	//characters to be parsed
	this.objectLength = 432;
	this.parse = function(buffer) {
		var finalObj = {};
		var position = 0;
		for(var ii in objects.PARSE_MAP) {
			var obj = objects.PARSE_MAP[ii];
			var start = obj.start;
			var end = obj.end;
			var parseObject = obj.obj;
			assert.equal(end,start+parseObject.objectLength,parseObject.name);
			var str = buffer.toString('utf8',start,end);
			parseObject.parse(str,finalObj,finalObj);
			// finalObj[parseObjects[ii].name+'_RAW']=str;
		}
		return finalObj;
	}
};

exports.BridgeParse = new BridgeParse();