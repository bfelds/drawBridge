var fs = require('fs');
var parser = require('./libs/parse.js');

var DATA_LOC='./data/';


function openSampleData(file,callback)
{
	fs.open(file,'r',function(err,fileHandle){
		if(err) {
			throw err;
		}
		callback(fileHandle);
	});

}

function DataProcessor()
{
	var fd;

	var parseCallOut = function (err,bytesRead,buffer,state) {
		if(err) {
			throw err;
		}
		if(bytesRead!=state.objectSize) {
			console.log('bytesRead: ',bytesRead);
			
			state.callback(state.results);
			fs.close(fd);
			fd=undefined;
			return;
		}
		// console.log('bytesRead: ',bytesRead);
		// console.log('fullBuffer: ', buffer.toString());
		var obj = parser.BridgeParse.parse(buffer);
		state.results.push(obj);
		chopper(state);
		// state.callback(state.results);
		
	};

	var chopper = function(state) {
		var length = state.objectSize;
		var buf=new Buffer(length);
		fs.read(fd,buf,0,length,null,function(err,bytesRead,buffer){
			parseCallOut(err,bytesRead,buffer,state);
		}.bind(this));
	};
	this.parse = function(file,callback) {
		var state = {
			callback: callback,
			objectSize: parser.BridgeParse.objectLength+1, //+1 for newline character
			results:[]
		}
		openSampleData(file,function(fileHandle){
			fd=fileHandle;
			chopper(state);
		});
	};
	return this;
}


function main()
{
	var dataProcessor = new DataProcessor();
	dataProcessor.parse(DATA_LOC+'MI12.txt',function(output){
		console.log('All Done: ' , output);
	});
}

main();