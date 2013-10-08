var maps = require('./maps.js');
var assert = require('assert');
/**
 * Item:1
 * Federal Information Processing Standards (FIPS) code for States
 */
var State = function() {
	this.objectLength = 2;
	this.parseCheck = function(start,end) {
		var startPosition=0;
		var stopPosition=2;
		assert.equal(startPosition,start);
		assert.equal(stopPosition,end);
	};
	this.name = "STATE";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};
	this.Types = {
		1: "Alabama",
		2: "Alaska",
		4: "Arizona",
		5: "Arkansas",
		6: "California",
		8: "Colorado",
		9: "Connecticut",
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
	};
};

/**
 * Item:13A
 * inventory route for the State's linear
 * referencing system (LRS)
 */
var LRSInventoryRoute = function() {
	this.objectLength = 10;
	this.name = "LRS_INVENTORY_ROUTE";
	this.parse = function(buffer, obj) {
		var val = parseInt(+buffer,10);
		if(val===0) val=undefined;
		obj[this.name] = val;
	};
};

/**
 * Item:13B
 * Inventory subroute for the State's linear
 * referencing system (LRS)
 */
var LRSInventorySubRoute = function() {
	this.objectLength = 2;
	this.name = "LRS_INVENTORY_SUBROUTE";
	this.parse = function(buffer, obj) {
		var val = parseInt(+buffer,10);
		if(val===0) val=undefined;
		obj[this.name] = val;
	};
};

/**
 * Item:16
 */
var Latitude = function() {
	this.objectLength = 8;
	this.name = "LATITUDE";
	this.parse = function(buffer, obj) {
		var match = buffer.match(/(\d\d)(\d\d)(\d\d\d\d)/);
		if(!match) {
			obj[this.name] = undefined;
			return;
		}
		var deg = parseInt(match[1],10);
		var min = parseInt(match[2],10);
		var sec = parseFloat(match[3].trim()+'e-2');
		obj[this.name] = {
			degrees: deg,
			minutes: min,
			seconds: sec,
			decimal: deg+min/60+sec/3600
		};
	};
};

/**
 * Item:17
 */
var Longitude = function() {//
	this.objectLength = 9;
	this.name = "LONGITUDE";
	this.parse = function(buffer, obj) {
		var match = buffer.match(/(\d\d\d)(\d\d)(\d\d\d\d)/);
		if(!match) {
			obj[this.name] = undefined;
			return;
		}
		var deg = -1*parseInt(match[1],10);
		var min = parseInt(match[2],10);
		var sec = parseFloat(match[3].trim()+'e-2');
		obj[this.name] = {
			degrees: deg,
			minutes: min,
			seconds: sec,
			decimal: deg+min/60+sec/3600
		};
	};
};

/**
 * Item:19
 * Actual length to the nearest kilometer of the detour length
 * The detour length should represent the total additional travel
 * for a vehicle which would result from closing of the bridge.
 */
var DetourLength = function() {
	this.objectLength = 3;
	this.name = "DETOUR_LENGTH";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:20
 */
var Toll = function() {
	this.objectLength = 1;
	this.name = "TOLL";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};
	this.Types = {
		0: "N/A",
		1: "Toll Bridge",
		2: "Toll Road",
		3: "Free Road",
		4: "Interstate Toll",
		5: "Secretarial Toll Bridge"
	};
};

/**
 * Item:21
 * The actual name(s) of the agency(s) responsible
 * for the maintenance of the structure
 */
var MaintenanceResponsibility = function() {
	this.objectLength = 2;
	this.name = "MAINTENANCE_RESPONSIBILITY";
	this.parse = function(buffer, obj) {
		obj[this.name] = maps.MAINTENANCE_RESPONSIBILITY_MAP[+buffer];
	};
};

/**
 * Item:22
 * Secondary owner names (see Item:21)
 */
var Owner = function() {
	this.objectLength = 2;
	this.name = "OWNER";
	this.parse = function(buffer, obj) {
		obj[this.name] = maps.MAINTENANCE_RESPONSIBILITY_MAP[+buffer];
	};
};

/**
 * Item:26
 */
var FunctionalClassificationofInventoryRoute = function() {
	this.objectLength = 2;
	this.name = "FUNCITONAL_CLASSIFICATION_OF_INVENTORY_ROUTE";

	this.parse = function(buffer, obj) {
		obj[this.name] = new Object(this.Types[+buffer]);
	};

	this.ClassificationGroups = {
		"PRINCIPAL":0,
		"NON_PRINCIPAL":1,
		"LOCAL":2
	};

	this.Types = {
		1: {
			type: "Rural",
			desc: "Principal Arterial - Interstate",
			group: this.ClassificationGroups.PRINCIPAL
		},
		2: {
			type: "Rural",
			desc: "Principal Arterial - Other",
			group: this.ClassificationGroups.NON_PRINCIPAL
		},
		6: {
			type: "Rural",
			desc: "Minor Arterial",
			group: this.ClassificationGroups.LOCAL
		},
		7: {
			type: "Rural",
			desc: "Major Collector",
			group: this.ClassificationGroups.LOCAL
		},
		8: {
			type: "Rural",
			desc: "Minor Collector",
			group: this.ClassificationGroups.LOCAL
		},
		9: {
			type: "Rural",
			desc: "Local",
			group: this.ClassificationGroups.LOCAL
		},

		11: {
			type: "Urban",
			desc: "Principal Arterial - Interstate",
			group: this.ClassificationGroups.PRINCIPAL
		},
		12: {
			type: "Urban",
			desc: "Principal Arterial - Other Freeways or Expressways",
			group: this.ClassificationGroups.PRINCIPAL
		},
		14: {
			type: "Urban",
			desc: "Other Principal Arterial",
			group: this.ClassificationGroups.NON_PRINCIPAL
		},
		16: {
			type: "Urban",
			desc: "Minor Arterial",
			group: this.ClassificationGroups.NON_PRINCIPAL
		},
		17: {
			type: "Urban",
			desc: "Collector",
			group: this.ClassificationGroups.NON_PRINCIPAL
		},
		19: {
			type: "Urban",
			desc: "Local",
			group: this.ClassificationGroups.LOCAL
		},
	};
};

/**
 * Item:27
 */
var YearBuilt = function() {
	this.objectLength = 4;
	this.name = "YEAR_BUILT";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:28A
 */
var LanesOnStructure = function() {
	this.objectLength = 2;
	this.name = "LANES_ON_STRUCTURE";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:28B
 */
var LanesUnderStructure = function() {
	this.objectLength = 2;
	this.name = "LANES_UNDER_STRUCTURE";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:29
 */
var AverageDailyTraffic = function() {
	this.objectLength = 6;
	this.name = "AVERAGE_DAILY_TRAFFIC";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:30
 */
var YearOfAverageDailyTraffic = function() {
	this.objectLength = 4;
	this.name = "YEAR_OF_AVERAGE_DAILY_TRAFFIC";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:31
 * Live load for which the structure was designed
 */
var DesignLoad = function() {
	this.objectLength = 1;
	this.name = "DESIGN_LOAD";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		1: {metric:"M 9", english:"H 10"},
		2: {metric:"M 13.5", english:"H 15"},
		3: {metric:"MS 13.5", english:"HS 15"},
		4: {metric:"M 18", english:"H 20"},
		5: {metric:"MS 18", english:"HS 20"},
		6: {metric:"MS 18+Mod", english:"HS 20+Mod"},
		7: {metric:"Pedestrian", english:"Pedestrian"},
		8: {metric:"Railroad", english:"Railroad"},
		9: {metric:"MS 22.5", english:"HS 25"},
		0: undefined,
	};
};

/**
 * Item:32
 */
var ApproachRoadwayWidth = function() {
	this.objectLength = 4;
	this.name = "APPROACH_ROADWAY_WIDTH";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:33
 */
var BridgeMedianType = function() {
	this.objectLength = 1;
	this.name = "BRIDGE_MEDIAN_TYPE";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		0: "None",
		1: "Open",
		2: "Closed Mountable",
		3: "Closed Non-Mountable",
	};
};

/**
 * Item:34
 * the angle between the centerline of a pier
 * and a line normal to the roadway centerline.
 */
var Skew = function() {
	this.objectLength = 2;
	this.name = "SKEW";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:35
 * Indicate if the structure is flared
 * (i.e., the width of the structure varies).
 */
var StructureFlared = function() {
	this.objectLength = 1;
	this.name = "STRUCTURE_FLARED";
	this.parse = function(buffer, obj) {
		obj[this.name] = buffer==="1"?true:false;
	};
};

/**
 * Item:36A
 * Bridge railings should be evaluated using the
 * current AASHTO Standard Specifications for Highway Bridges
 */
var BridgeRailings = function() {
	this.objectLength = 1;
	this.name = "BRIDGE_RAILINGS";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		0: "Not Acceptable",
		1: "Acceptable",
		N: "N/A",
	};
};

/**
 * Item:36B
 * The transition from approach guardrail
 *  to bridge railing requirements.
 */
var Transitions = function() {
	this.objectLength = 1;
	this.name = "TRANSITIONS";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		0: "Not Acceptable",
		1: "Acceptable",
		N: "N/A",
	};
};

/**
 * Item:36C
 * The structural adequacy and compatibility of approach guardrail
 */
var ApproachGuardrail = function() {
	this.objectLength = 1;
	this.name = "APPROACH_GUARDRAIL";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		0: "Not Acceptable",
		1: "Acceptable",
		N: "N/A",
	};
};

/**
 * Item:36D
 * the ends of approach guardrails to bridges
 * should be flared, buried, made breakaway, or shielded.
 */
var ApproachGuardrailEnds = function() {
	this.objectLength = 1;
	this.name = "APPROACH_GUARDRAIL_ENDS";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		0: "Not Acceptable",
		1: "Acceptable",
		N: "N/A",
	};
};

/**
 * Item:37
 * Types:
 * 1 Bridge is on the National Register of Historic Places.
 * 2 Bridge is eligible for the National Register of Historic Places.
 * 3 Bridge is possibly eligible for the National Register of Historic Places (requires further
 * investigation before determination can be made) or  bridge is on a State or local historic register.
 * 4 Historical significance is not determinable at this time.
 * 5 Bridge is not eligible for the National Register of Historic Places.
 */
var HistoricalSignificance = function() {
	this.objectLength = 1;
	this.name = "HISTORICAL_SIGNIFICANCE";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		1: "NRHP",
		2: "NRHP Eligible",
		3: "NRHP Eligible or State/Local Register",
		4: "N/A",
		5: "Not Eligible",
	};
};

/**
 * Item:38
 * A bridge permit for navigation is required
 */
var NavigationControl = function() {
	this.objectLength = 1;
	this.name = "NAVIGATION_CONTROL";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		N: "N/A",
		0: "No Navigation Control",
		1: "Navigation Control",
	};
};

/**
 * Item:39
 */
var NavigationVerticalClearance = function() {
	this.objectLength = 4;
	this.name = "NAVIGATION_VERTICAL_CLEARANCE";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:40
 */
var NavigationHorizontalClearance = function() {
	this.objectLength = 5;
	this.name = "NAVIGATION_HORIZONTAL_CLEARANCE";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:41
 */
var OperationalStatus = function() {
	this.objectLength = 1;
	this.name = "OPERATIONAL_STATUS";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		A: "Open",
		B: "Open - Non-binding signage",
		D: "Open - Temporary Shoring",
		E: "Open - Temporary Structure",
		G: "Closed - New Structure",
		K: "Closed",
		P: "Posted for load restrictions",
		R: "Posted for non-load restrictions"
	};
};

/**
 * Item:42A
 */
var TypeOfServiceOnBridge = function() {
	this.objectLength = 1;
	this.name = "TYPE_OF_SERVICE_ON_BRIDGE";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		1: "Highway",
		2: "Railroad",
		3: "Pedestrian-Bicycle",
		4: "Highway-Railroad",
		5: "Highway-Pedestrian",
		6: "Overpass structure at an interchange",
		7: "Third level (Interchange)",
		8: "Fourth level (Interchange)",
		9: "Building or plaza",
		0: "Other",
	};
};

/**
 * Item:42B
 */
var TypeOfServiceUnderBridge = function() {
	this.objectLength = 1;
	this.name = "TYPE_OF_SERVICE_UNDER_BRIDGE";
	this.parse = function(buffer, obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		1: "Highway",
		2: "Railroad",
		3: "Pedestrian-Bicycle",
		4: "Highway-Railroad",
		5: "Waterway",
		6: "Highway-Waterway",
		7: "Railroad-Waterway",
		8: "Highway-Waterway-Railroad",
		9: "Relief for waterway",
		0: "Other"
	};
};

/**
 * Item:43A
 */
var StructureMaterial = function() {
	this.objectLength = 1;
	this.name = "STRUCTURE_MATERIAL";
	this.parse = function(buffer, obj) {
		obj[this.name] = maps.MATERIALS_MAP[+buffer];
	};
};

/**
 * Item:43B
 */
var StructureDesign = function() {
	this.objectLength = 2;
	this.name = "STRUCTURE_DESIGN";
	this.parse = function(buffer, obj) {
		obj[this.name] = maps.DESIGN_TYPE_MAP[+buffer];
	};
};


/**
 * Item:44A
 */
var ApproachSpanMaterial = function() {
	this.objectLength = 1;
	this.name = "APPROACH_SPAN_MATERIAL";
	this.parse = function(buffer, obj) {
		obj[this.name] = maps.MATERIALS_MAP[+buffer];
	};
};

/**
 * Item:44B
 */
var ApproachSpanDesign = function() {
	this.objectLength = 2;
	this.name = "APPROACH_SPAN_DESIGN";
	this.parse = function(buffer, obj) {
		obj[this.name] = maps.DESIGN_TYPE_MAP[+buffer];
	};
};

/**
 * Item:45
 * Number of spans in main unit
 */
var NumberOfSpans = function() {
	this.objectLength = 3;
	this.name = "NUMBER_OF_SPANS";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:46
 * Number of approaching spans
 */
var NumberOfApproachingSpans = function() {
	this.objectLength = 4;
	this.name = "NUMBER_OF_APPROACHING_SPANS";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:47
 */
var HorizontalClearanceOfInventoryRoute = function() {
	this.objectLength = 3;
	this.name = "HORIZONTAL_CLEARANCE_OF_INVENTORY_ROUTE";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:48
 */
var LengthOfMaximumSpan = function() {
	this.objectLength = 5;
	this.name = "LENGTH_OF_MAXIMUM_SPAN";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:49
 */
var StructureLength = function() {
	this.objectLength = 6;
	this.name = "STRUCTURE_LENGTH";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:50A
 */
var LeftCurbWidth = function() {
	this.objectLength = 3;
	this.name = "LEFT_CURB_WIDTH";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:50B
 */
var RightCurbWidth = function() {
	this.objectLength = 3;
	this.name = "RIGHT_CURB_WIDTH";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:51
 */
var BridgeRoadWidth = function() {
	this.objectLength = 4;
	this.name = "BRIDGE_ROAD_WIDTH";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:52
 */
var BridgeDeckWidth = function() {
	this.objectLength = 4;
	this.name = "BRIDGE_DECK_WIDTH";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:53
 */
var VerticalOverClearance = function() {
	this.objectLength = 4;
	this.name = "VERTICAL_OVER_CLEARANCE";
	this.parse = function(buffer, obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

/**
 * Item:54
 */
var VerticalUnderClearance = function() {
	this.objectLength = 5;
	this.name = "VERTICAL_UNDER_CLEARANCE";
	this.parse = function(buffer, obj) {
		var feat = buffer.charAt(0);
		var clear = buffer.slice(1);
		obj[this.name] = {
			clearance:parseFloat(clear+'e-1'),
			feature: maps.CLEARANCE_FEATURES[+feat]
		};
	};
};

/**
 * Item:55
 * The horizontal space between clearance feature and
 * obstacle on right side.
 */
var RightLateralUnderClearance = function() {
	this.objectLength = 4;
	this.name = "RIGHT_LATERAL_UNDER_CLEARANCE";
	this.parse = function(buffer, obj) {
		var feat = buffer.charAt(0);
		var clear = buffer.slice(1);
		obj[this.name] = {
			clearance:parseFloat(clear+'e-1'),
			feature: maps.CLEARANCE_FEATURES[+feat]
		};
	};
};

/**
 * Item:56
 * The horizontal space between clearance feature and
 * obstacle on left side.
 * *Unlike Item 55, this gets no feature
 */
var LeftLateralUnderClearance = function() {
	this.objectLength = 3;
	this.name = "RIGHT_LATERAL_UNDER_CLEARANCE";
	this.parse = function(buffer, obj) {
		obj[this.name] = {
			clearance:parseFloat(buffer+'e-1')
		};
	};
};

/**
 * Item:58
 */
var DeckCondition = function() {
	this.objectLength = 1;
	this.name = "DECK_CONDITION";
	this.parse = function(buffer,obj) {
		obj[this.name] = maps.CONDITION_RATINGS[+buffer];
	};
}

/**
 * Item:59
 */
var SuperstructureCondition = function() {
	this.objectLength = 1;
	this.name = "SUPER_STRUCTURE_CONDITION";
	this.parse = function(buffer,obj) {
		obj[this.name] = maps.CONDITION_RATINGS[+buffer];
	};
}

/**
 * Item:60
 */
var SubstructureCondition = function() {
	this.objectLength = 1;
	this.name = "SUB_STRUCTURE_CONDITION";
	this.parse = function(buffer,obj) {
		obj[this.name] = maps.CONDITION_RATINGS[+buffer];
	};
}

/**
 * Item:61
 */
var ChannelProtectionCondition = function() {
	this.objectLength = 1;
	this.name = "CHANNEL_PROTECTION_CONDITION";
	this.parse = function(buffer,obj) {
		obj[this.name] = this.Types[+buffer];
	};
	this.Types = {
		N: 'N/A',
		9: 'No Deficiencies',
		8: 'Protected or Well-Vegetated Banks',
		7: 'Need Minor Repairs',
		6: 'Bank Slump; Minor Damage',
		5: 'Bank Eroding; Major Damage',
		4: 'Bank Protection Underminded; Severe Damage',
		3: 'Bank Protection Failed; Bridge Damage Threat',
		2: 'Bridge Near Collapse',
		1: 'Bridge Closed due to Channel; Action Necessary.',
		0: 'Bridge Closed due to Channel; Replacement Necessary',
	}
}


/**
 * Item:62
 */
var CulvertCondition = function() {
	this.objectLength = 1;
	this.name = "CULVERT_CONDITION";
	this.parse = function(buffer,obj) {
		obj[this.name] = this.Types[+buffer];
	};
	this.Types = {
		N: 'N/A',
		9: 'No Deficiencies',
		8: 'Insignificant Deficiencies',
		7: 'Minor/Insignificant Damage; No Action Needed',
		6: 'Deterioration or Initial Disintegration',
		5: 'Moderate to Major Deterioration or Disintegration',
		4: 'Large Spalls, Heavy Scaling, Wide Cracks',
		3: 'Severe Large Spalls, Heavy Scaling, Wide Cracks',
		2: 'Collapsed Integral Wingwalls, Severe Settlement of Roadway',
		1: 'Bridge Closed; Action Necessary.',
		0: 'Bridge Closed; Replacement Necessary',
	}
}

/**
 * Item:63
 */
var OperatingRatingMethod = function() {
	this.objectLength = 1;
	this.name = "OPERATIONAL_RATING_METHOD";
	this.parse = function(buffer,obj) {
		obj[this.name] = this.Types[+buffer];
	};
	this.Types = {
		1: "Load Factor",
		2: "Allowable Stress",
		3: "Load and Resistance Factor",
		4: "Load Testing",
		5: "No rating analysis performed",
	}
}


/**
 * Item:64
 * Load Capacity in metric tons
 */
var OperatingRating = function() {
	this.objectLength = 3;
	this.name = "OPERATIONAL_RATING_METHOD";
	this.parse = function(buffer,obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
}

/**
 * Item:65
 */
var InventoryRatingMethod = function() {
	this.objectLength = 1;
	this.name = "INVENTORY_RATING_METHOD";
	this.parse = function(buffer,obj) {
		obj[this.name] = this.Types[+buffer];
	};
	this.Types = {
		1: "Load Factor",
		2: "Allowable Stress",
		3: "Load and Resistance Factor",
		4: "Load Testing",
		5: "No rating analysis performed",
	}
}

/**
 * Item:66
 * Load Capacity in metric tons
 */
var InventoryRating = function() {
	this.objectLength = 3;
	this.name = "INVENTORY_RATING";
	this.parse = function(buffer,obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
}

/**
 * Item:67
 */
var StructuralEvaluation = function() {
	this.objectLength = 1;
	this.name = "STRUCTURAL_EVALUATION";
	this.parse = function(buffer,obj) {
		obj[this.name] = maps.CONDITION_COMPARISON_RATINGS[buffer];
	};
}

/**
 * Item:68
 */
var DeckGeometryEvaluation = function() {
	this.objectLength = 1;
	this.name = "DECK_GEOMETRY_EVALUATION";
	this.parse = function(buffer,obj) {
		obj[this.name] = maps.CONDITION_COMPARISON_RATINGS[buffer];
	};
}

/**
 * Item:69
 */
var UnderclearanceRating = function() {
	this.objectLength = 1;
	this.name = "UNDERCLEARANCE_RATING";
	this.parse = function(buffer,obj) {
		obj[this.name] = +buffer;
	};
}

/**
 * Item:70
 * ~% Relationship of Operating Rating to Maximum Legal Load
 * Posting is necessary if Operating Rating < Maximum Legal
 */
var BridgePosting = function() {
	this.objectLength = 1;
	this.name = "BRIDGE_POSTING";
	this.parse = function(buffer,obj) {
		obj[this.name] = this.Types[+buffer];
	};
	this.Types = {
		5: ">=Legal Load",
		4: "0.1 -  9.9% below Legal Load",
		3: "10.0 -  19.9% below Legal Load",
		2: "20.0 -  29.9% below Legal Load",
		1: "30.0 -  39.9% below Legal Load",
		0: ">39.9% below Legal Load",
	};
}

/**
 * Item:71
 * Item:26 is needed to parse
 * When duplicate codes, i go with the better condition
 */
var WaterwayCondition = function() {
	this.objectLength = 1;
	this.name = "BRIDGE_POSTING";
	this.parse = function(buffer,obj,classObj) {
		var invObj = new FunctionalClassificationofInventoryRoute();
		var group = classObj.FUNCITONAL_CLASSIFICATION_OF_INVENTORY_ROUTE.group;

		if(invObj.ClassificationGroups.PRINCIPAL ===
			group) {
			obj[this.name] = this.PrincipalMap[+buffer];
		} else if(invObj.ClassificationGroups.NON_PRINCIPAL ===
			group) {
			obj[this.name] = this.NonPrincipalMap[+buffer];
		} else if(invObj.ClassificationGroups.LOCAL ===
			group) {
			obj[this.name] = this.LocalMap[+buffer];
		}

	};
	this.CodeTypes = {
		NA: "N/A",
		REMOTE: "Remote Chance of overtopping",
		SLIGHT: "Slight chance of overtopping bridge approaches",
		SLIGHT_DECK: "Slight chance of overtopping bridge deck",
		OCCASIONAL: "Occasional overtopping of roadway approaches",
		OCCASIONAL_AFFECTS: "Occasional approach overtopping; affects traffic",
		DECK_AFFECTS: "Occasional deck overtopping; affects traffic",
		DECK_FREQUENT: "Frequent deck overtopping; affects traffic",
		DECK_SEVERE: "Frequent deck overtopping; severe traffic",
		NO_BRIDGE: "Bridge Closed",
	};

	this.PrincipalMap = {
		N: this.CodeTypes.NA,
		9: this.CodeTypes.REMOTE,
		8: this.CodeTypes.SLIGHT,
		6: this.CodeTypes.SLIGHT_DECK,
		4: this.CodeTypes.OCCASIONAL,
		3: this.CodeTypes.OCCASIONAL_AFFECTS,
		2: this.CodeTypes.DECK_AFFECTS,
		0: this.CodeTypes.NO_BRIDGE,
	};

	this.NonPrincipalMap = {
		N: this.CodeTypes.NA,
		9: this.CodeTypes.REMOTE,
		8: this.CodeTypes.SLIGHT,
		6: this.CodeTypes.SLIGHT_DECK,
		5: this.CodeTypes.OCCASIONAL,
		4: this.CodeTypes.OCCASIONAL_AFFECTS,
		3: this.CodeTypes.DECK_AFFECTS,
		2: this.CodeTypes.DECK_FREQUENT,
		0: this.CodeTypes.NO_BRIDGE,
	};

	this.LocalMap = {
		N: this.CodeTypes.NA,
		9: this.CodeTypes.REMOTE,
		8: this.CodeTypes.SLIGHT,
		7: this.CodeTypes.SLIGHT_DECK,
		6: this.CodeTypes.OCCASIONAL,
		5: this.CodeTypes.OCCASIONAL_AFFECTS,
		4: this.CodeTypes.DECK_AFFECTS,
		3: this.CodeTypes.DECK_FREQUENT,
		2: this.CodeTypes.DECK_SEVERE,
		0: this.CodeTypes.NO_BRIDGE,
	};
}

/**
 * Item:72
 * This is allll guesswork:
 * Out of 9 it seems like
 * >=8 is great
 * 6 == some slow down
 * <=3 intolerable slowdown
 */
var ApproachRoadwayAlignmentAdequacy = function() {
	this.objectLength = 1;
	this.name = "APPROACH_ROADWAY_ALIGNMENT_ADEQUACY";
	this.parse = function(buffer,obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:75A
 * coded for bridges to be eligible for the Highway Bridge
 * Replacement and Rehabilitation Program
 */
var WorkProposed = function() {
	this.objectLength = 2;
	this.name = "WORK_PROPOSED";
	this.parse = function(buffer,obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		31: {
			work: "Replacement",
			reason: "load carrying capacity or geometry"
		},
		32: {
			work: "Replacement",
			reason: "road relocation"
		},
		33: {
			work: "Widening",
		},
		34: {
			work: "Widening and Deck Rehabilitation/Replacement",
		},
		35: {
			work: "Rehabilitation",
			reason: "Structure deterioration/lack of strength"
		},
		36: {
			work: "Rehabilitation and Incidental Widening",
		},
		37: {
			work: "Replacement and Incidental Widening",
		},
		38: {
			work: "Other",
		},
	}
};

/**
 * Item:75B
 * coded for bridges to be eligible for the Highway Bridge
 * Replacement and Rehabilitation Program
 */
var WorkDoneBy = function() {
	this.objectLength = 1;
	this.name = "WORK_DONE_BY";
	this.parse = function(buffer,obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		1: "CONTRACT",
		2: "OWNER"
	};
};

/**
 * Item:76
 * coded for bridges to be eligible for the Highway Bridge
 * Replacement and Rehabilitation Program
 */
var WorkImprovementLength = function() {
	this.objectLength = 6;
	this.name = "WORK_IMPROVEMENT_LENGTH";
	this.parse = function(buffer,obj) {
		obj[this.name] = parseFloat(buffer+'e-1');
	};
};

function twoYearCodeToFourYearCode(code) {
	var currYear = (new Date).getYear();
	currYear = parseInt((currYear+"").slice(2),10);
	return code>currYear?'19'+code:'20'+code
}
/**
 * Item:90
 * Year is encoded with 2 digits, so i'm taking the following liberty
 * of of saying that data<=current year's 2 digits is the current decade(20), else
 * last decade (19)
 */
var LastInspectionDate = function() {
	this.objectLength = 4;
	this.name = "LAST_INSPECTION_DATE";
	this.parse = function(buffer,obj) {
		var match = buffer.match(/(\d\d)(\d\d)/);

		if(match) {
			var year = parseInt(match[2],10);
			obj[this.name] = {
				month: parseInt(match[1],10),
				year: twoYearCodeToFourYearCode(year)
			};
		} else {
			obj[this.name] = undefined;
		}
	};
};

/**
 * Item:91
 * measured in months
 */
var InspectionFrequency = function() {
	this.objectLength = 2;
	this.name = "INSPECTION_FREQUENCY";
	this.parse = function(buffer,obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:92A
 * measured in months
 */
var FractureInspection = function() {
	this.objectLength = 3;
	this.name = "FRACTURE_INSPECTION";
	this.parse = function(buffer,obj) {
		var isCritical = buffer.charAt(0)==='Y';
		if(isCritical) {
			obj[this.name] = {
				isCritical: true,
				frequency: parseInt(buffer.slice(1),10)
			};
		} else {
			obj[this.name] = {
				isCritical: false
			};
		}
	};
};

/**
 * Item:92B
 * measured in months
 */
var UnderwaterInspection = function() {
	this.objectLength = 3;
	this.name = "UNDERWATER_INSPECTION";
	this.parse = function(buffer,obj) {
		var isCritical = buffer.charAt(0)==='Y';
		if(isCritical) {
			obj[this.name] = {
				isCritical: true,
				frequency: parseInt(buffer.slice(1),10)
			};
		} else {
			obj[this.name] = {
				isCritical: false
			};
		}
	};
};

/**
 * Item:92C
 * measured in months
 */
var SpecialInspection = function() {
	this.objectLength = 3;
	this.name = "SPECIAL_INSPECTION";
	this.parse = function(buffer,obj) {
		var isCritical = buffer.charAt(0)==='Y';
		if(isCritical) {
			obj[this.name] = {
				isCritical: true,
				frequency: parseInt(buffer.slice(1),10)
			};
		} else {
			obj[this.name] = {
				isCritical: false
			};
		}
	};
};

/**
 * Item:93A
 */
var FractureInspectionDate = function() {
	this.objectLength = 4;
	this.name = "FRACTURE_INSPECTION_DATE";
	this.parse = function(buffer,obj) {
		var match = buffer.match(/(\d\d)(\d\d)/);

		if(match) {
			var year = parseInt(match[2],10);
			obj[this.name] = {
				month: parseInt(match[1],10),
				year: twoYearCodeToFourYearCode(year)
			};
		} else {
			obj[this.name] = undefined;
		}
	};
};


/**
 * Item:93B
 */
var UnderwaterInspectionDate = function() {
	this.objectLength = 4;
	this.name = "UNDERWATER_INSPECTION_DATE";
	this.parse = function(buffer,obj) {
		var match = buffer.match(/(\d\d)(\d\d)/);

		if(match) {
			var year = parseInt(match[2],10);
			obj[this.name] = {
				month: parseInt(match[1],10),
				year: twoYearCodeToFourYearCode(year)
			};
		} else {
			obj[this.name] = undefined;
		}
	};
};

/**
 * Item:93C
 */
var SpecialInspectionDate = function() {
	this.objectLength = 4;
	this.name = "SPECIAL_INSPECTION_DATE";
	this.parse = function(buffer,obj) {
		var match = buffer.match(/(\d\d)(\d\d)/);

		if(match) {
			var year = parseInt(match[2],10);
			obj[this.name] = {
				month: parseInt(match[1],10),
				year: twoYearCodeToFourYearCode(year)
			};
		} else {
			obj[this.name] = undefined;
		}
	};
};

/**
 * Item:94
 * Rounded to nearest thousand
 */
var BridgeImprovementCost = function() {
	this.objectLength = 6;
	this.name = "BRIDGE_IMPROVEMENT_COST";
	this.parse = function(buffer,obj) {
		obj[this.name] =  1000 * parseInt(buffer,10);
	};
};

/**
 * Item:95
 * Rounded to nearest thousand
 */
var RoadwayImprovementCost = function() {
	this.objectLength = 6;
	this.name = "ROADWAY_IMPROVEMENT_COST";
	this.parse = function(buffer,obj) {
		obj[this.name] =  1000 * parseInt(buffer,10);
	};
};

/**
 * Item:96
 * Rounded to nearest thousand
 */
var TotalImprovementCost = function() {
	this.objectLength = 6;
	this.name = "TOTAL_IMPROVEMENT_COST";
	this.parse = function(buffer,obj) {
		obj[this.name] =  1000 * parseInt(buffer,10);
	};
};

/**
 * Item:97
 */
var YearOfImprovementCost = function() {
	this.objectLength = 4;
	this.name = "YEAR_OF_IMPROVEMENT_COST";
	this.parse = function(buffer,obj) {
		obj[this.name] =  parseInt(buffer,10);
	};
};

/**
 * Item:98A
 * State Part
 * Utilizes State code
 */
var NeighboringState = function() {
	this.objectLength = 2;
	this.name = "NEIGHBORING_STATE";
	this.parse = function(buffer,obj) {
		var temp = {};
		var aState = new State();
		aState.parse(buffer,temp);
		obj[this.name] =  temp.STATE;
	};
};

/**
 * Item:98A
 * Region Part
 * Utilizes Region code
 */
var NeighboringRegion = function() {
	this.objectLength = 1;
	this.name = "NEIGHBORING_REGION";
	this.parse = function(buffer,obj) {
		var temp = {};
		var aRegion = new Region();
		aRegion.parse(buffer,temp);
		obj[this.name] =  temp.REGION;
	};
};

/**
 * Item:98B
 * Decimal representing percent responsibility
 */
var NeighboringResponsibility = function() {
	this.objectLength = 2;
	this.name = "NEIGHBORING_RESPONSIBILITY";
	this.parse = function(buffer,obj) {
		obj[this.name] =  .01 * parseInt(buffer,10);
	};
};

/**
 * Item:99
 * Utilizes StructureNumber code
 */
var NeighboringStructureNumber = function() {
	this.objectLength = 15;
	this.name = "NEIGHBORING_STRUCTURE_NUMBER";
	this.parse = function(buffer,obj) {
		var temp = {};
		var aStructureNumber = new StructureNumber();
		aStructureNumber.parse(buffer,temp);
		obj[this.name] =  temp.STRUCTURE_NUMBER;
	};
};

/**
 * Item:100
 */
var STRAHNETDesignation = function() {
	this.objectLength = 1;
	this.name = "STRAHNET_DESIGNATION";
	this.parse = function(buffer,obj) {
		obj[this.name] =  this.Types[+buffer];
	};

	this.Types = {
		0: "N/A",
		1: "Interstate",
		2: "Non-Interstate",
		3: "Connector"
	};
};

/**
 * Item:101
 */
var ParallelStructure = function() {
	this.objectLength = 1;
	this.name = "PARALLEL_STRUCTURE";
	this.parse = function(buffer,obj) {
		obj[this.name] =  this.Types[+buffer];
	};

	this.Types = {
		N: "N/A",
		R: "RIGHT",
		L: "LEFT"
	};
};

/**
 * Item:102
 */
var TrafficDirection = function() {
	this.objectLength = 1;
	this.name = "TRAFFIC_DIRECTION";
	this.parse = function(buffer,obj) {
		obj[this.name] =  this.Types[+buffer];
	};

	this.Types = {
		0: "N/A",
		1: "ONE_WAY",
		2: "TWO_WAY",
		3: "TWO_WAY.ONE_LANE"
	};
};

/**
 * Item:103
 */
var HasTemporaryStructure = function() {
	this.objectLength = 1;
	this.name = "HAS_TEMPORARY_STRUCTURE";
	this.parse = function(buffer,obj) {
		obj[this.name] =  buffer==='T';
	};
};

/**
 * Item:104
 */
var OnNationalHighwaySystem = function() {
	this.objectLength = 1;
	this.name = "ON_NATIONAL_HIGHWAY_SYSTEM";
	this.parse = function(buffer,obj) {
		obj[this.name] =  buffer==='1';
	};
};

/**
 * Item:105
 */
var FederalLandsDesignation = function() {
	this.objectLength = 1;
	this.name = "FEDERAL_LANDS_DESIGNATION";
	this.parse = function(buffer,obj) {
		obj[this.name] =  this.Types[+buffer];
	};


	this.Systems = {
		NA: "N/A",
		IRR: "Indian Reservation Road",
		FH: "Forest Highway",
		LMHS: "Land Management Highway System",
	};

	this.Types = {
		0: [this.Systems.NA],
		1: [this.Systems.IRR],
		2: [this.Systems.FH],
		3: [this.Systems.LMHS],
		4: [this.Systems.IRR,this.Systems.FH],
		5: [this.Systems.IRR,this.Systems.LMHS],
		6: [this.Systems.FH,this.Systems.LMHS],
		9: [this.Systems.IRR, this.Systems.FH,this.Systems.LMHS]
	};

};

/**
 * Item:106
 */
var ReconstructionYear = function() {
	this.objectLength = 4;
	this.name = "RECONSTRUCTION_YEAR";
	this.parse = function(buffer,obj) {
		obj[this.name] =  parseInt(buffer,10);
	};
};

/**
 * Item:107
 */
var DeckStructureType = function() {
	this.objectLength = 1;
	this.name = "DECK_STRUCTURE_TYPE";
	this.parse = function(buffer,obj) {
		obj[this.name] =  this.Types[+buffer];
	};

	this.Types = {
		N: "N/A",
		1: "Concrete Cast-in-Place",
		2: "Concrete Precast Panels",
		3: "Open Grating",
		4: "Closed Grating",
		5: "Steel Plate",
		6: "Corrugated Steel",
		7: "Aluminum",
		8: "Wood or Timber",
		9: "Other",
	};
};

/**
 * Item:108A
 */
var WearingSurfaceType = function() {
	this.objectLength = 1;
	this.name = "WEARING_SURFACE_TYPE";
	this.parse = function(buffer,obj) {
		obj[this.name] =  this.Types[+buffer];
	};

	this.Types = {
		N: "N/A",
		0: "None",
		1: "Monolithic Concrete",
		2: "Integral Concrete",
		3: "Latex Concrete",
		4: "Low Slump Concrete",
		5: "Epoxy Overlay",
		6: "Bituminous",
		7: "Wood or Timber",
		8: "Gravel",
		9: "Other",
	};
};

/**
 * Item:108B
 */
var MembraneType = function() {
	this.objectLength = 1;
	this.name = "MEMBRANE_TYPE";
	this.parse = function(buffer,obj) {
		obj[this.name] =  this.Types[+buffer];
	};

	this.Types = {
		N: "N/A",
		0: "None",
		1: "Built-up",
		2: "Preformed Fabric",
		3: "Epoxy",
		8: "Unknown",
		9: "Other",
	};
};

/**
 * Item:108C
 */
var DeckProtectionType = function() {
	this.objectLength = 1;
	this.name = "DECK_PROTECTION_TYPE";
	this.parse = function(buffer,obj) {
		obj[this.name] =  this.Types[+buffer];
	};

	this.Types = {
		N: "N/A",
		0: "None",
		1: "Epoxy Coated Reinforcing",
		2: "Galvanized Reinforcing",
		3: "Other Coated Reinforcing",
		4: "Cathodic Protection",
		6: "Polymer Impregnated",
		7: "Internally Sealed",
		8: "Unknown",
		9: "Other",
	};
};

/**
 * Item:109
 * decimal representing percentage
 */
var AverageDailyTruckTraffic = function() {
	this.objectLength = 2;
	this.name = "AVERAGE_DAILY_TRUCK_TRAFFIC";
	this.parse = function(buffer,obj) {
		obj[this.name] = .01*parseInt(buffer,10);
	};
};

/**
 * Item:110
 */
var OnNationalTruckNetwork = function() {
	this.objectLength = 1;
	this.name = "ON_NATIONAL_TRUCK_NETWORK";
	this.parse = function(buffer,obj) {
		obj[this.name] = buffer==="1";
	};
};

/**
 * Item:111
 */
var PierOrAbutmentProtection = function() {
	this.objectLength = 1;
	this.name = "PIER_OR_ABUTMENT_PROTECTION";
	this.parse = function(buffer,obj) {
		obj[this.name] =  this.Types[+buffer];
	};

	this.Types = {
		1: "Not Required",
		2: "In Place and Functioning",
		3: "In Place but Deteriorating",
		4: "In Place but Reevaluation Suggested",
		5: "None Present but Reevaluation Suggested"
	};
};

/**
 * Item:112
 */
var ExceedsNBISBridgeLength = function() {
	this.objectLength = 1;
	this.name = "EXCEEDS_NBIS_BRIDGE_LENGTH";
	this.parse = function(buffer,obj) {
		obj[this.name] = buffer==="Y";
	};
};

/**
 * Item:113
 */
var ScourVulnurability = function() {
	this.objectLength = 1;
	this.name = "SCOUR_VULNURABILITY";
	this.parse = function(buffer,obj) {
		obj[this.name] =  this.Types[+buffer];
	};

	this.Types = {
		N: "N/A", //not over waterway
		U: "Unknown; not evaluated",
		T: "Over Tidal Water; not evaluated",
		9: "Foundation on dry land",
		8: "Stable for calculated scour conditions",
		7: "Not Scour Critical; Countermeasures In Place",
		6: "Not Evaluated",
		5: "Stable",
		4: "Stable; Protective Action Needed",
		3: "Scour Critical",
		2: "Scour Critical; Immediate Action Needed",
		1: "Scour Critical; Failure Imminent",
		0: "Bridge Failure; Closed"
	};
};

/**
 * Item:114
 */
var FutureAverageDailyTraffic = function() {
	this.objectLength = 6;
	this.name = "FUTURE_AVERAGE_DAILY_TRAFFIC";
	this.parse = function(buffer,obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:115
 */
var FutureAverageDailyTrafficYear = function() {
	this.objectLength = 4;
	this.name = "FUTURE_AVERAGE_DAILY_TRAFFIC_YEAR";
	this.parse = function(buffer,obj) {
		obj[this.name] = parseInt(buffer,10);
	};
};

/**
 * Item:116
 */
var VerticalClearanceOfLiftBridge = function() {
	this.objectLength = 4;
	this.name = "VERTICAL_CLEARANCE_OF_LIFT_BRIDGE";
	this.parse = function(buffer,obj) {
		obj[this.name] = .01*parseInt(buffer,10);
	};
};

/**
 * Item:NA
 * Status
 */
var Status = function() {
	this.objectLength = 1;
	this.name = "STATUS";
	this.parse = function(buffer,obj) {
		obj[this.name] = this.Types[+buffer];
	};

	this.Types = {
		N: "N/A",
		0: "Not Deficient",
		1: "Structurally Deficient",
		2: "Functionally Obsolete"
	};
};

/**
 * Item:NA
 * Defined in Appendix B
 * Sufficiency Rating Formula was generated off of
 * incomplete data
 */
var SufficiencyRatingAsterisk = function() {
	this.objectLength = 1;
	this.name = "SUFFICIENCY_RATING_ASTERISK";
	this.parse = function(buffer,obj) {
		obj[this.name] = buffer;
	};
};

/**
 * Item:NA
 */
var SufficiencyRating = function() {
	this.objectLength = 4;
	this.name = "SUFFICIENCY_RATING";
	this.parse = function(buffer,obj) {
		obj[this.name] = .001*parseInt(buffer,10);
	};
};
//end is exclusive
var PARSE_MAP = [
	{start:0,end:2,obj:new State()},
	{start:2,end:3,obj: new Region()},
	{start:3,end:18,obj: new StructureNumber()},
	{start:18,end:19,obj: new RouteType()},
	{start:19,end:20,obj: new RouteSigningPrefix()},
	{start:20,end:21,obj: new RouteServiceLevel()},
	{start:21,end:26,obj: new RouteNumber()},
	{start:26,end:27,obj: new RouteDirection()},
	{start:27,end:29,obj: new HighwayAgencyDistrict()},
	{start:29,end:32,obj: new County()},
	{start:32,end:37,obj: new Place()},
	{start:37,end:61,obj: new IntersectingFeature()},
	{start:62,end:80,obj: new CarriedStructure()},
	{start:80,end:105,obj: new LocationDescription()},
	{start:105,end:109,obj: new VerticalClearance()},
	{start:109,end:116,obj: new BaseHighwayKilometerPoint()},
	{start:116,end:117,obj: new IsOnBaseNetwork()},
	{start:117,end:127,obj: new LRSInventoryRoute()},
	{start:127,end:129,obj: new LRSInventorySubRoute()},
	{start:129,end:137,obj: new Latitude()},
	{start:137,end:146,obj: new Longitude()},
	{start:146,end:149,obj: new DetourLength()},
	{start:149,end:150,obj: new Toll()},
	{start:150,end:152,obj: new MaintenanceResponsibility()},
	{start:152,end:154,obj: new Owner()},
	{start:154,end:156,obj: new FunctionalClassificationofInventoryRoute()},
	{start:156,end:160,obj: new YearBuilt()},
	{start:160,end:162,obj: new LanesOnStructure()},
	{start:162,end:164,obj: new LanesUnderStructure()},
	{start:164,end:170,obj: new AverageDailyTraffic()},
	{start:170,end:174,obj: new YearOfAverageDailyTraffic()},
	{start:174,end:175,obj: new DesignLoad()},
	{start:175,end:179,obj: new ApproachRoadwayWidth()},
	{start:179,end:180,obj: new BridgeMedianType()},
	{start:180,end:182,obj: new Skew()},
	{start:182,end:183,obj: new StructureFlared()},
	{start:183,end:184,obj: new BridgeRailings()},
	{start:184,end:185,obj: new Transitions()},
	{start:185,end:186,obj: new ApproachGuardrail()},
	{start:186,end:187,obj: new ApproachGuardrailEnds()},
	{start:187,end:188,obj: new HistoricalSignificance()},
	{start:188,end:189,obj: new NavigationControl()},
	{start:189,end:193,obj: new NavigationVerticalClearance()},
	{start:193,end:198,obj: new NavigationHorizontalClearance()},
	{start:198,end:199,obj: new OperationalStatus()},
	{start:199,end:200,obj: new TypeOfServiceOnBridge()},
	{start:200,end:201,obj: new TypeOfServiceUnderBridge()},
	{start:201,end:202,obj: new StructureMaterial()},
	{start:202,end:204,obj: new StructureDesign()},
	{start:204,end:205,obj: new ApproachSpanMaterial()},
	{start:205,end:207,obj: new ApproachSpanDesign()},
	{start:207,end:210,obj: new NumberOfSpans()},
	{start:210,end:214,obj: new NumberOfApproachingSpans()},
	{start:214,end:217,obj: new HorizontalClearanceOfInventoryRoute()},
	{start:217,end:222,obj: new LengthOfMaximumSpan()},
	{start:222,end:228,obj: new StructureLength()},
	{start:228,end:231,obj: new LeftCurbWidth()},
	{start:231,end:234,obj: new RightCurbWidth()},
	{start:234,end:238,obj: new BridgeRoadWidth()},
	{start:238,end:242,obj: new BridgeDeckWidth()},
	{start:242,end:246,obj: new VerticalOverClearance()},
	{start:246,end:251,obj: new VerticalUnderClearance()},
	{start:251,end:255,obj: new RightLateralUnderClearance()},
	{start:255,end:258,obj: new LeftLateralUnderClearance()},
	{start:258,end:259,obj: new DeckCondition()},
	{start:259,end:260,obj: new SuperstructureCondition()},
	{start:260,end:261,obj: new SubstructureCondition()},
	{start:261,end:262,obj: new ChannelProtectionCondition()},
	{start:262,end:263,obj: new CulvertCondition()},
	{start:263,end:264,obj: new OperatingRatingMethod()},
	{start:264,end:267,obj: new OperatingRating()},
	{start:267,end:268,obj: new InventoryRatingMethod()},
	{start:268,end:271,obj: new InventoryRating()},
	{start:271,end:272,obj: new StructuralEvaluation()},
	{start:272,end:273,obj: new DeckGeometryEvaluation()},
	{start:273,end:274,obj: new UnderclearanceRating()},
	{start:274,end:275,obj: new BridgePosting()},
	{start:275,end:276,obj: new WaterwayCondition()},
	{start:276,end:277,obj: new ApproachRoadwayAlignmentAdequacy()},
	{start:277,end:279,obj: new WorkProposed()},
	{start:279,end:280,obj: new WorkDoneBy()},
	{start:280,end:286,obj: new WorkImprovementLength()},
	{start:286,end:290,obj: new LastInspectionDate()},
	{start:290,end:292,obj: new InspectionFrequency()},
	{start:292,end:295,obj: new FractureInspection()},
	{start:295,end:298,obj: new UnderwaterInspection()},
	{start:298,end:301,obj: new SpecialInspection()},
	{start:301,end:305,obj: new FractureInspectionDate()},
	{start:305,end:309,obj: new UnderwaterInspectionDate()},
	{start:309,end:313,obj: new SpecialInspectionDate()},
	{start:313,end:319,obj: new BridgeImprovementCost()},
	{start:319,end:325,obj: new RoadwayImprovementCost()},
	{start:325,end:331,obj: new TotalImprovementCost()},
	{start:331,end:335,obj: new YearOfImprovementCost()},
	{start:335,end:337,obj: new NeighboringState()},
	{start:337,end:338,obj: new NeighboringRegion()},
	{start:338,end:340,obj: new NeighboringResponsibility()},
	{start:340,end:355,obj: new NeighboringStructureNumber()},
	{start:355,end:356,obj: new STRAHNETDesignation()},
	{start:356,end:357,obj: new ParallelStructure()},
	{start:357,end:358,obj: new TrafficDirection()},
	{start:358,end:359,obj: new HasTemporaryStructure()},
	{start:359,end:360,obj: new OnNationalHighwaySystem()},
	{start:360,end:361,obj: new FederalLandsDesignation()},
	{start:361,end:365,obj: new ReconstructionYear()},
	{start:365,end:366,obj: new DeckStructureType()},
	{start:366,end:367,obj: new WearingSurfaceType()},
	{start:367,end:368,obj: new MembraneType()},
	{start:368,end:369,obj: new DeckProtectionType()},
	{start:369,end:371,obj: new AverageDailyTruckTraffic()},
	{start:371,end:372,obj: new OnNationalTruckNetwork()},
	{start:372,end:373,obj: new PierOrAbutmentProtection()},
	{start:373,end:374,obj: new ExceedsNBISBridgeLength()},
	{start:374,end:375,obj: new ScourVulnurability()},
	{start:375,end:381,obj: new FutureAverageDailyTraffic()},
	{start:381,end:385,obj: new FutureAverageDailyTrafficYear()},
	{start:385,end:389,obj: new VerticalClearanceOfLiftBridge()},
	{start:426,end:427,obj: new Status()},
	{start:427,end:428,obj: new SufficiencyRatingAsterisk()},
	{start:428,end:432,obj: new SufficiencyRating()},

];

exports.PARSE_MAP = PARSE_MAP;
