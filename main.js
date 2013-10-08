var agent = require('webkit-devtools-agent');
var fs = require('fs');
var Readable = require('stream').Readable;
var Transform = require('stream').Transform;
var util = require('util');
var parser = require('./libs/parse.js');
var program = require('commander');


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
function DataProcessor()
{
	Transform.call(this);

	var data="";
	this._transform = function(chunk,encoding,done) {
		data += chunk.toString('utf8');
		var str='';
		while(data.length>=parser.BridgeParse.objectLength) {
			var bit = data.slice(0,parser.BridgeParse.objectLength);
			//1+ to burn /n
			data = data.slice(1+parser.BridgeParse.objectLength);
			var obj = parser.BridgeParse.parse(bit);
			str += JSON.stringify(obj)+'\n';
		}
		this.push(str);
		// console.log(str.length);
		if(data.length<parser.BridgeParse.objectLength) {
			done();
		}
	};
	this.printTime = function() {
	};

}

function setUpCommandLineArgs()
{
	program
		.version(VERSION)
		.option('-i, --input [file]','input file')
		.option('-o, --output <file>','output file')
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
	var dataProcessor = new DataProcessor();
	inputStream.pipe(dataProcessor).pipe(outputStream);
	inputStream.on('end',function(){
		// dataProcessor.printTime();
	});
}

main();

