var loginInfo = require('./loginInfo');
loginInfo.queryAll(function(docs, db){
	console.log(docs);
	db.close();
});