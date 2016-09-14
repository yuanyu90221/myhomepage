//modules/mongodbUtil
var dbInfo = { 'host':'localhost','dbName':'myHomepage'};
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://'+dbInfo.host+':27017/'+dbInfo.dbName;

module.exports = {
	'queryAll': function(callback){
					MongoClient.connect(url, function(err, db) {
						assert.equal(null, err);
						console.log("Connected correctly to server");
						var collection = db.collection('loginInfo');
						collection.find({}).toArray(function(err, docs){
							callback(docs,db);
						});
					});
				},

};