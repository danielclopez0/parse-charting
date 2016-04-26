var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');

var routes = require('./config/routes');

Parse.initialize('parseCharts','1234');
Parse.serverURL = 'http://localhost:1337/parse';

ReactDOM.render(routes, document.getElementById('app'))