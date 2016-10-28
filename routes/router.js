// routes/router.js
var loginInfo = require('../modules/mondbUtil/loginInfo');

module.exports = function(app, sessionList, i18n){

	var middleware = require('../middleware/middleware')(app);
	app.get('/', function(req, res){
        //印出session value
		console.log('current session: ',req.session);
		console.log('sessionList');
		console.log(sessionList.length);
		console.log(req.language);
		console.log(i18n.t('login'));
		//console.log(i18n);
		//藉由
		if(req.session.username){
			console.log(req.session.username);
			res.render('main',{'username':req.session.username,'url': req.session.url,'login':i18n.t("login")});
		}
		else{
			res.render('login', {'login':i18n.t("login"), 'google-login': i18n.t('google-login'), 'email-hint':i18n.t('email-hint'), 'password-hint':i18n.t('password-hint'),'remember-me':i18n.t('remember-me'),'forget-password':i18n.t('forget-password')});
		}
	});
	//帶入params.who
	app.get('/greeting/:who', function(req, res){
		// req.params.who帶入hello.html
		res.render('hello',{"user": req.params.who,'i18n':i18n});
	});

	app.post('/greeting', function(req, res){
		console.log('username : ',req.body.username);
		req.session.username = req.body.username;
		req.session.id = sessionList.length;
		sessionList.push(req.session);
		// 重新導入/藉由session來判斷是否有登入
		res.redirect('/');
	});


	app.post('/greeting/:who', function(req, res){
		res.render('hello',{"user": req.params.who, 'i18n':i18n});
	});

	// app.post('/test/',function(req, res){
	// 	//console.log(req.body.try);
	// 	// console.log("snum : " , req.params.snum);
	// 	//res.send(req.body.try);
	// 	loginInfo.queryAll(function(docs,db){
	// 		db.close();
	// 		console.log(docs);
	// 		res.json(docs);
	// 	});
	// });

	app.post('/logout',function(req, res){
		console.log(req.body.username + ' logoout success!');
		// 刪除 cookie
		var key = req.session.username;
		sessionList.splice(Number(req.session.id),1);
		//console.log(sessionList[key]);
		req.session.destroy();

		// 重新導入/藉由session來判斷是否有登入
		res.redirect('/');
	});

	app.get('/customer', function(req, res){
		res.send('customer page');
	});

	app.get('/admin', function(req, res){
		res.send('admin page');
	});

	// app.get('/getloginInfo', function(req, res){
	// 	loginInfo.queryAll(function(docs,db){
	// 		db.close();
	// 		console.log(docs);
	// 		res.json(docs);
	// 	});

	// });
	// app.all('*', function(req, res){
 // 		res.send('404 not found');
	// });
};