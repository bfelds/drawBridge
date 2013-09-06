var maps = require('./maps.js');

/**
 * Item:1
 * Federal Information Processing Standards (FIPS) code for States
 */
var State = function() {
	this.objectLength = 2;
	this.name = "STATE";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};
	this.Types = {
		01: "Alabama",
		02: "Alaska",
		04: "Arizona",
		05: "Arkansas",
		06: "California",
		08: "Colorado",
		09: "Connecticut",
		10: "Delaware",
		11: "District_of_Columbia",
		12: "Florida",
		13: "Georgia",
		14: "Guam",
		66: "Guam",
		15: "Hawaii",
		16: "Idaho",
		17: "Illinois",
		18: "Indiana",
		19: "Iowa",
		20: "Kansas",
		21: "Kentucky",
		22: "Louisiana",
		23: "Maine",
		24: "Maryland",
		25: "Massachusetts",
		26: "Michigan",
		27: "Minnesota",
		28: "Mississippi",
		29: "Missouri",
		30: "Montana",
		31: "Nebraska",
		32: "Nevada",
		33: "New_Hampshire",
		34: "New_Jersey",
		35: "New_Mexico",
		36: "New_York",
		37: "North_Carolina",
		38: "North_Dakota",
		39: "Ohio",
		40: "Oklahoma",
		41: "Oregon",
		70: "Palau",
		42: "Pennsylvania",
		43: "Puerto_Rico",
		44: "Rhode_Island",
		45: "South_Carolina",
		46: "South_Dakota",
		47: "Tennessee",
		48: "Texas",
		49: "Utah",
		50: "Vermont",
		51: "Virginia",
		53: "Washington",
		54: "West_Virginia",
		55: "Wisconsin",
		56: "Wyoming"
	};
};

/**
 * Item:1B
 * FHWA region code
 */
var Region = function() {
	this.objectLength = 1;
	this.name = "REGION";
	this.parse = function(buffer, obj) {
		obj[this.name] = +buffer;
	};
};

/**
 * Item:2
 * highway agency district (State or Federal)
 * in which the bridge is located
 */
var HighwayAgencyDistrict = function() {
	this.objectLength = 2;
	this.name = "HIGHWAY_AGENCY_DISTRICT";
	this.parse = function(buffer, obj) {
		obj[this.name] = +buffer;
	};
};

/**
 * Item:3
 * Federal Information Processing Standards (FIPS) codes
 * given in the current version of the Census of Population
 *  and Housing - Geographic Identification Code Scheme
 */
var County = function() {
	this.objectLength = 3;
	this.name = "COUNTY";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer] || undefined;
	};

	this.Types = {
		001: "Alcona",
		061: "Houghton",
		121: "Muskegon",
		003: "Alger",
		063: "Huron",
		123: "Newaygo",
		005: "Allegan",
		065: "Ingham",
		125: "Oakland",
		007: "Alpena",
		067: "Ionia",
		127: "Oceana",
		009: "Antrim",
		069: "Iosco",
		129: "Ogemaw",
		011: "Arenac",
		071: "Iron",
		131: "Ontonagon",
		013: "Baraga",
		073: "Isabella",
		133: "Osceola",
		015: "Barry",
		075: "Jackson",
		135: "Oscoda",
		017: "Bay",
		077: "Kalamazoo",
		137: "Otsego",
		019: "Benzie",
		079: "Kalkaska",
		139: "Ottawa",
		021: "Berrien",
		081: "Kent",
		141: "Presque_Isle",
		023: "Branch",
		083: "Keweenaw",
		143: "Roscommon",
		025: "Calhoun",
		085: "Lake",
		145: "Saginaw",
		027: "Cass",
		087: "Lapeer",
		147: "St"._Clair,
		029: "Charlevoix",
		089: "Leelanau",
		149: "St"._Joseph,
		031: "Cheboygan",
		091: "Lenawee",
		151: "Sanilac",
		033: "Chippewa",
		093: "Livingston",
		153: "Schoolcraft",
		035: "Clare",
		095: "Luce",
		155: "Shiawassee",
		037: "Clinton",
		097: "Mackinac",
		157: "Tuscola",
		039: "Crawford",
		099: "Macomb",
		159: "Van_Buren",
		041: "Delta",
		101: "Manistee",
		161: "Washtenaw",
		043: "Dickinson",
		103: "Marquette",
		163: "Wayne",
		045: "Eaton",
		105: "Mason",
		165: "Wexford",
		047: "Emmet",
		107: "Mecosta",
		049: "Genesee",
		109: "Menominee",
		051: "Gladwin",
		111: "Midland",
		053: "Gogebic",
		113: "Missaukee",
		055: "Grand_Traverse",
		115: "Monroe",
		057: "Gratiot",
		117: "Montcalm",
		059: "Hillsdale",
		119: "Montmorency",
	};
};

/**
 * Item:4
 * Federal Information Processing Standards (FIPS) codes
 *  given in the current version of the Census of Population
 *  and Housing - Geographic Identification Code Scheme.
 */
var Place = function() {
	this.objectLength = 5;
	this.name = "PLACE";
	this.parse = function(buffer, obj) {
		obj[this.name] = maps.PLACE_ID_MAP[+buffer] || undefined;
	};
}

/**
 * Item:5A
 * National Bridge Inventory Type: "on" and "under"
 */
var RouteType = function() {
	this.objectLength = 1;
	this.name = "ROUTE_TYPE";
	this.parse = function(buffer, obj) {
		var value = undefined;
		if (buffer === '1') {
			value = {
				ROUTE_TYPE: 'ON'
			}
		} else if (buffer === '2') {
			value = {
				ROUTE_TYPE: 'UNDER',
				NUMBER_OF_ROUTES: 1
			};
		} else if (buffer.charCodeAt(0) >= 65 && buffer.charCodeAt(0) <= 90) {
			value = {
				ROUTE_TYPE: 'UNDER',
				NUMBER_OF_ROUTES: buffer.charCodeAt(0) - 63
			};
		}

		obj[this.name] = value;
	};
};

/**
 * Item:5B
 * route signing prefix for the inventory route
 */
var RouteSigningPrefix = function() {
	this.objectLength = 1;
	this.name = "ROUTE_SIGNING";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer] || undefined;
	}

	this.Types = {
		1: "Interstate highway",
		2: "U.S. numbered highway",
		3: "State highway",
		4: "County highway",
		5: "City street",
		6: "Federal lands road",
		7: "State lands road",
		8: "Other"
	}
};

/**
 * Item:5C
 * designated level of service for the inventory route
 */
var RouteServiceLevel = function(a) {
	this.objectLength = 1;
	this.name = "ROUTE_SERVICE_LEVEL";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer] || undefined;
	}

	this.Types = {
		0: "Other",
		1: "Mainline",
		2: "Alternate",
		3: "Bypass",
		4: "Spur",
		6: "Business",
		7: "Ramp, Wye, Connector, etc.",
		8: "Service and/or unclassified frontage road"
	}
};

/**
 * Item:5D
 */
var RouteNumber = function() {
	this.objectLength = 5;
	this.name = "ROUTE_NUMBER";
	this.parse = function(buffer, obj) {
		obj[this.name] = +buffer;
	}
};

/**
 * Item:5E
 */
var RouteDirection = function() {
	this.objectLength = 1;
	this.name = "ROUTE_DIRECTION";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	}

	this.Types = {
		0: "N/A",
		1: "North",
		2: "East",
		3: "South",
		4: "West",
	}
};

/**
 * Item:6
 * description of the features intersected by the
 * structure and a critical facility indicator
 */
var IntersectingFeature = function() {
	this.objectLength = 24;
	this.name = "INTERSECTING_FEATURE";
	this.parse = function(buffer, obj) {
		obj[this.name] = buffer.trim();
	}
};

/**
 * Item:7
 * facility being carried by the structure
 */
var CarriedStructure = function() {
	this.objectLength = 18;
	this.name = "CARRIED_STRUCTURE";
	this.parse = function(buffer, obj) {
		obj[this.name] = buffer.trim();
	}
};

/**
 * Item:8
 * official structure number
 */
var StructureNumber = function() {
	this.objectLength = 15;
	this.name = "STRUCTURE_NUMBER";
	this.parse = function(buffer, obj) {
		obj[this.name] = buffer.trim();
	}
};

/**
 * Item:9
 * Location description
 */
var LocationDescription = function() {
	this.objectLength = 25;
	this.name = "LOCATION_DESCRIPTION";
	this.parse = function(buffer, obj) {
		obj[this.name] = buffer.trim();
	}
};

/**
 * Item:10
 * Minimum Vertical clearance of structure
 */
var VerticalClearance = function() {
	this.objectLength = 4;
	this.name = "VERTICAL_CLEARANCE";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseInt(+buffer.trim(),10);
	}
};

/**
 * Item:11
 * location of the bridge on the Base Highway Network
 */
var BaseHighwayKilometerPoint = function() {
	this.objectLength = 7;
	this.name = "BASE_HIGHWAY_KILOMETER_POINT";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(+buffer.trim()+'e-2');
	}
};

/**
 * Item:12
 * indicate whether the inventory route is on the Base 
 * Highway Network or not
 */
var IsOnBaseNetwork = function() {
	this.objectLength = 1;
	this.name = "IS_ON_BASE_NETWORK";
	this.parse = function(buffer, obj) {
		obj[this.name] = 1===(+buffer);
	}
};

var LRSInventoryRoute = function() {
	this.objectLength = 10;
	this.name = "LRS_INVENTORY_ROUTE";
	this.parse = function(buffer, obj) {
		var val = parseInt(+buffer,10);
		if(val===0) val=undefined;
		obj[this.name] = val;
	}
};

var LRSInventorySubRoute = function() {
	this.objectLength = 2;
	this.name = "LRS_INVENTORY_SUBROUTE";
	this.parse = function(buffer, obj) {
		var val = parseInt(+buffer,10);
		if(val===0) val=undefined;
		obj[this.name] = val;
	}
};

exports.State = new State();
exports.Region = new Region();
exports.HighwayAgencyDistrict = new HighwayAgencyDistrict();
exports.County = new County();
exports.Place = new Place();
exports.RouteType = new RouteType();
exports.RouteSigningPrefix = new RouteSigningPrefix();
exports.RouteServiceLevel = new RouteServiceLevel();
exports.RouteNumber = new RouteNumber();
exports.RouteDirection = new RouteDirection();
exports.IntersectingFeature = new IntersectingFeature();
exports.CarriedStructure = new CarriedStructure();
exports.StructureNumber = new StructureNumber();
exports.LocationDescription = new LocationDescription();
exports.VerticalClearance = new VerticalClearance();
exports.BaseHighwayKilometerPoint = new BaseHighwayKilometerPoint();
exports.IsOnBaseNetwork = new IsOnBaseNetwork();
exports.LRSInventoryRoute = new LRSInventoryRoute();
exports.LRSInventorySubRoute = new LRSInventorySubRoute();



