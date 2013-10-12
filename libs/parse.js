var objects = require('./objects.js');
var assert = require('assert');

var objectMap = {};
for(var ii in objects.PARSE_MAP) {
	// console.log(ii,objects.PARSE_MAP[ii])
	objectMap[objects.PARSE_MAP[ii].end]=objects.PARSE_MAP[ii];
}

var BridgeParse = function()
{
	//characters to be parsed
	this.objectLength = 432;
	this.parse = function(buffer) {
		var finalObj = {};
		for(var ii in objects.PARSE_MAP) {
			var obj = objects.PARSE_MAP[ii];
			// assert.equal(end,start+parseObject.objectLength,parseObject.name);
			var str = buffer.slice(obj.start,obj.end);
			obj.obj.parse(str,finalObj,finalObj);
		}
		return finalObj;
	}
	this.raw = function(buffer) {
		var finalObj = {};
		for(var ii in objects.PARSE_MAP) {
			var obj = objects.PARSE_MAP[ii];
			// assert.equal(end,start+parseObject.objectLength,parseObject.name);
			var str = buffer.slice(obj.start,obj.end);
			if(obj.obj.raw)
				obj.obj.raw(str,finalObj);
			else
				finalObj[obj.obj.name] = str;
		}
		return finalObj;
	}
};

exports.BridgeParse = new BridgeParse();