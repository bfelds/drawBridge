drawBridge
==========

public api to parse National Bridge Inventory Record Formats

use
==========
node main.js -i ./data/MI12.txt -o tmp.txt

Usage: main.js [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -i, --input [file]   input file
    -o, --output <file>  output file


file description
===========
main.js
  - handles data streams from --input through parser to ouput

parse.js
  - takes in one line of NBI data and applies al NBI datatype conversions

objects.js
  - collection of all data fields (as objects), and parse methods

maps.js
  - holds some of the larger maps for use in objects.js

test.sh
  - simple test script to test code changes for speedup/downs

contributing
============
YES COME HELP :)
  - there is a ton to do and I in no degree know anything about bridges. this is just a side project to create an open source solution for decoding NBI data
Bugs, Pulls, Comments are all welcome