var React = require('react');

function Main (props) {
	return (
		<div class="container"> 
			Hello from Main 
			{props.children}
		</div>
	)
}


module.exports = Main;