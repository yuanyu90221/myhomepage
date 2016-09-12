// middleware
module.exports = function(app){
	app.use(function(req, res, next){
		console.log('In comes a ' + req.method + ' to ' + req.url);
		next();
	});
};