var express = require('express');

var app = express();

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs",
	"Do not fear what you don't know",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple."
];

//set up handlebars view engine
var handlebars = require('express3-handlebars')
		.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//add static middleware
app.use(express.static(__dirname + '/public'));

//testing middleware
app.use(function(req, res, next){
	//if test=1 appears in the query string for any page, the property res.locals.showTests will set to be true
	//In other words, if test=1, test mode will be on & the webpage will be tested by mocha.js & chai.js
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

//add routes
app.get('/', function(req, res){
	//res.type('text/plain');
	//res.send('Meadowlark Travel');
	res.render('Home');
});

app.get('/about', function(req, res){
	//var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	//res.type('text/plain');
	//res.send('About Meadowlark Travel');
	//res.render('About', { fortune: randomFortune });
	res.render('about', {
		fortune: fortune.getFortune(),
		PageTestScript: '/qa/tests-about.js'
	});	
});

//add catch-all handler (middleware) for anything that didn't get matched by a route
//custom 404 page
app.use(function(req, res){
        //res.type('text/plain');
	res.status(404);
	res.render('404');
	//res.send('404 - Not Found');
});

//custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	//res.type('text/plain');
	res.status(500);
	res.render('500');
	//res.send('500 - Server Error');
});
									
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' +
				app.get('port') + '\nPress Ctrl-C to terminate.');
});
