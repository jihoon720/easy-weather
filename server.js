const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const request = require('request');
const apikey = 'd3134324c6f7286c52b142a98772f494';

//set template engine as ejs. ejs looks at folder 'views' as default, so create a folder called 'views'
app.set('view engine', 'ejs');

//express does not use 'public' by default which contains css file, so add it manually
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res){
	//res.send('Hello World');
	res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res){
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
	request(url, function (err, response, body){
		if(err){
			res.render('index', {weather: null, error: 'Error, please try again'});
		}
		else{
			let weather = JSON.parse(body);
			if(weather.main == undefined){
				res.render('index', {weather: null, error: 'Error, please try again'});
			}
			else{
				let weatherText = `It is ${weather.main.temp} degrees in ${weather.name}!`;
				res.render('index', {weather: weatherText, error: null});
			}
		}
	});
});

//localhost:3000
app.listen(3000, function(){
	console.log('App is listening on port 3000!');
});

