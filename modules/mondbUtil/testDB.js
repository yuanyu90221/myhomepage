var loginInfo = require('./loginInfo');
loginInfo.queryAll(function(docs, db){
	console.log(docs);
	db.close();
});

loginInfo.queryByCriteria(function(docs, db){
	console.log(docs);
	db.close();
},{'username':'yuanyu'});

loginInfo.updateByCriteria(function(result, db){
	//console.log(result.result);
		if(result.result.ok==1){
			loginInfo.queryByCriteria(function(docs, db){
			console.log(docs);
			db.close();
		},{'username':'yuanyu'});
	}
	db.close();
},{'username':'yuanyu'},{'password':'test'});