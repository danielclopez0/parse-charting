var React = require('react');

function puke (obj) {
	return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
}

function Campaigns (props) {
	return props.isLoading === true
		? <p> Loading </p>
		: <div>
			{puke(props.campaignData)}
	      </div>
}


module.exports = Campaigns;

/*
		    <ul>
		    	{props.campaignData.map(function(c) {
		          return <li key={c.id}>
		          	Name: {c.name} <br />
		          	Date: {c.date} <br />
		          	Sales: {c.sales} <br />
		          	Spend: {c.spend}
		          </li>
		        })}
		    </ul>
*/