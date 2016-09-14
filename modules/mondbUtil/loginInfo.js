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
	'queryByCriteria': function(callback, criteria){
					MongoClient.connect(url, function(err, db) {
						assert.equal(null, err);
						console.log("Connected correctly to server");
						var collection = db.collection('loginInfo');
						collection.find(criteria).toArray(function(err, docs){
							callback(docs,db);
						});
					});
				},
	'updateByCriteria': function(callback, criteria, updateAttribues){
					MongoClient.connect(url, function(err, db) {
						assert.equal(null, err);
						console.log("Connected correctly to server");
						var collection = db.collection('loginInfo');
						collection.updateOne(criteria,
						{$set: updateAttribues}, function(err, result){
							assert.equal(err, null);
    						// assert.equal(1, result.result.n);
    						// console.log("Updated the document with the field a equal to 2");
    						callback(result, db);
						});
					});
				}

};