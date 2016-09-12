// routes/router.js


module.exports = function(app){

	var middleware = require('../middleware/middleware')(app);
	app.get('/', function(req, res){
		// req.params.who
		//res.send('home page');
		res.render('login');
	});
	//帶入params.who
	app.get('/greeting/:who', function(req, res){
		// req.params.who帶入hello.html
		res.render('hello',{"user": req.params.who});
	});

	app.post('/greeting', function(req, res){
		console.log(req.body.username);
		res.render('main',{'username':req.body.username});

	});


	app.post('/greeting/:who', function(req, res){
		// req.params.who帶入hello.html
		res.render('hello',{"user": req.params.who});
	});

	app.get('/customer', function(req, res){
		res.send('customer page');
	});

	app.get('/admin', function(req, res){
		res.send('admin page');
	});
	app.all('*', function(req, res){
 		res.send('404 not found');
	});
};