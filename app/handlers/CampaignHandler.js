var Parse = require('parse').Parse;
//var ParseReact = require('parse-react');
var React = require('react');

var Campaigns = require('../components/Campaigns');
var CampaignQuery = require('../utilities/campaignQueries');

var CampaignHandler = React.createClass({

	getInitialState: function (){
		return {
			isLoading: true,
			campaignData: []
		}
	},
	componentDidMount: function (){
		//temporarily manually defining params
		var queryParams = {
			frequency: 'weekly',
			startDate: new Date(2016,3,1),
			endDate: new Date(2016,11,31)
		};

		//execute standard query with above params, then set results on the new state
		CampaignQuery.standardQuery(queryParams)
			.then(function(results){
				this.setState({
					isLoading: false,
					campaignData: CampaignQuery.byDate(results)
				})
			}.bind(this))

		console.log('did mount',this.state);
	},
	render: function () {
		console.log('render',this.state);

		return (
			<Campaigns
				isLoading = {this.state.isLoading}
				campaignData = {this.state.campaignData} />
		);
	}
});


module.exports = CampaignHandler;