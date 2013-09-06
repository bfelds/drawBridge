var objects = require('./objects.js');

var UNUSED = function(num){
	this.objectLength=num;
	this.parse = function(buffer,obj) {};	
};

var BridgeParse = function()
{
	//characters to be parsed
	this.objectLength = 432;
	this.parse = function(buffer) {
		var finalObj = {};
		var position = 0;
		for(var ii in parseObjects) {
			var str = buffer.toString('utf8',position,position+parseObjects[ii].objectLength);
			parseObjects[ii].parse(str,finalObj);
			// finalObj[parseObjects[ii].name+'_RAW']=str;
			position+= parseObjects[ii].objectLength;
		}
		// console.log(position);
		return finalObj;
	}
	var parseObjects = [
		objects.State,
		objects.Region,
		objects.StructureNumber,
		objects.RouteType,
		objects.RouteSigningPrefix,
		objects.RouteServiceLevel,
		objects.RouteNumber,
		objects.RouteDirection,
		objects.HighwayAgencyDistrict,
		objects.County,
		objects.Place,
		objects.IntersectingFeature,
		new UNUSED(1),
		objects.CarriedStructure,
		objects.LocationDescription,
		objects.VerticalClearance,
		objects.BaseHighwayKilometerPoint,
		objects.IsOnBaseNetwork,
		objects.LRSInventoryRoute,
		objects.LRSInventorySubRoute,
	];
	// var parseObjects = [
	// 	objects.State,
	// 	objects.Region,
	// 	objects.HighwayAgencyDistrict,
	// 	objects.County,
	// 	objects.Place,
	// 	objects.RouteType,
	// 	objects.RouteSigningPrefix,
	// 	objects.RouteServiceLevel,
	// 	objects.RouteNumber,
	// 	objects.RouteDirection,
	// 	objects.IntersectingFeature,
	// 	new UNUSED(1),
	// 	objects.CarriedStructure,
	// 	objects.StructureNumber,
	// 	objects.LocationDescription,
	// 	objects.VerticalClearance,
	// ];
};

exports.BridgeParse = new BridgeParse();