// var agent = require('webkit-devtools-agent');
var fs = require('fs');
var Readable = require('stream').Readable;
var Transform = require('stream').Transform;
var util = require('util');
var parser = require('./libs/parse.js');
var program = require('commander');
var _ = require('underscore');


var DATA_LOC='./data/';
var VERSION ='0.0.1'

function createWriteStream(file)
{
	return fs.createWriteStream(file,{
		flags:'w',encoding:'utf8'
	});
}

function createReadStream(file) {
	return fs.createReadStream(file,{
		flags:'r',encoding:'utf8'
	});
}

function hrdiff(t1, t2) {
    var s = t2[0] - t1[0];
    var mms = t2[1] - t1[1];
    return s*1e9 + mms;
}

util.inherits(DataProcessor, Transform);
function DataProcessor(config)
{
	Transform.call(this);
	//parse type
	var parseFunc = !config.isRaw?'parse':'raw'

	//csv variables
	var isCSV = !!config.isCSV
	var _printHeader=!!config.isCSV; //used for CSV export

	var data="";

	this._transform = function(chunk,encoding,done) {
		data += chunk.toString('utf8');
		var str='';
		while(data.length>=parser.BridgeParse.objectLength) {
			var bit = data.slice(0,parser.BridgeParse.objectLength);
			//1+ to burn /n
			data = data.slice(1+parser.BridgeParse.objectLength);
			var obj = parser.BridgeParse[parseFunc](bit);
			if(_printHeader) {
				str += generateHeader(obj) +'\n';
				_printHeader=false;
			}
			str += stringify(obj)+'\n';
		}
		this.push(str);
		// console.log(str.length);
		if(data.length<parser.BridgeParse.objectLength) {
			done();
		}
	};
	this.printTime = function() {
	};

	var stringify = function(obj) {
		if(isCSV) {
			var str='';
			_.each(obj,function(val,key){
				if(val===null) {
					str += "|";
				} else if(['string','boolean','object'].indexOf(typeof val)>=0) {
					str += val + "|";
				} else if(_.isNaN(val)) {
					str += "|";
				} else if(typeof val === 'number') {
					str += val + "|";
				} else if(_.isDate(val)) {
					str += val.toISOString() + "|";
				}
			});
			return str.slice(0,-1);
		} else {
			return JSON.stringify(obj);
		}
	};

	var generateHeader = function(obj) {
		return _.keys(obj).join("|");
	};

}

function setUpCommandLineArgs()
{
	program
		.version(VERSION)
		.option('-i, --input [file]','input file')
		.option('-o, --output <file>','output file')
		.option('-c, --CSV ','output in csv format "|" delimited')
		.option('-r, --raw ','output in raw format')
		.parse(process.argv);

}

function main()
{
	console.log('[%s] Running', process.pid);
	setUpCommandLineArgs();
	var outputStream = process.stdout;
	var inputStream = process.stdin;
	if(program.input) {
		inputStream = createReadStream(program.input);
	}
	if(program.output) {
		outputStream = createWriteStream(program.output);
	}
	var dataProcessor = new DataProcessor({
		isRaw:program.raw,
		isCSV: program.CSV
	});

	inputStream.pipe(dataProcessor).pipe(outputStream);

	inputStream.on('end',function(){
		// dataProcessor.printTime();
	});
}

main();

