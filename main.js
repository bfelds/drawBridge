var fs = require('fs');

//console.log('here');
var DATA_LOC='./data/';


function openSampleData(callback)
{
	console.log('openning...');
	fs.open(DATA_LOC+'MI12.txt','r',callback);

}

function DataProcessor()
{
	var fd;

	this.initialize = function(){
		console.log('initialize');
		openSampleData(function(err,dd){
			console.log('callback');
			if(err) {
				throw err;
			}
			console.log('success');
			fd = dd;
			this.tryRead();
		}.bind(this));
	};
	this.tryRead = function() {
		var buf=new Buffer(256);
			console.log('preopen');
		fs.read(fd,buf,0,3,0,function(err,bytesRead,buffer){
			console.log('reading');
			console.log(bytesRead);
			console.log(buffer.toString('utf8', 0, bytesRead));
			
		}.bind(this))
	};
	return this;
}




function main()
{
	var dataProcessor = new DataProcessor();
	dataProcessor.initialize();
}

main();