var Parse = require('parse').Parse;

var CampaignQuery = {
	//need recursive query
	hasSalesOrSpend: function (frequency) {
        var currentModel = 'CampaignAggregate';
        switch (frequency){
            case "daily":
            default:
                currentModel = 'CampaignAggregate';
                break;
            case "weekly":
                currentModel = 'CampaignAggregateWeekly';
                break;
            case "monthly":
                currentModel = 'CampaignAggregateMonthly';
        };

		var hasSales = new Parse.Query(currentModel).greaterThan('salesTotal',0);
		var hasSpend = new Parse.Query(currentModel).greaterThan('spendTotal',0);
		return new Parse.Query.or(hasSales,hasSpend)
	},
	standardQuery: function (queryParams) {
		return this.hasSalesOrSpend(queryParams.frequency)
			.contains('status','RUNNING')
			.greaterThanOrEqualTo('forDateEndingOn', queryParams.startDate)
			.lessThanOrEqualTo('forDateEndingOn', queryParams.endDate)
			.descending('salesTotal','spendTotal')
			.limit(1000)
			.find()
			.then(function(data){
				return data.map(function(campaign){
					return {
						id: campaign.id,
						date: campaign.get('forDateEndingOn').toJSON().substring(0,10),
						sales: Math.round(campaign.get('salesTotal')),
						spend: Math.round(campaign.get('spendTotal')),
						name: campaign.get('name')
					}
				})
			})
	},
	byDate: function (dataSet) {
		var groupedByDate = {};

		for (var i = dataSet.length - 1; i >= 0; i--) {
			var recordDate = dataSet[i].date
			var recordSales = dataSet[i].sales
			var recordSpend = dataSet[i].spend

			if(!groupedByDate[recordDate]) {

				groupedByDate[recordDate] = {
					sales: recordSales,
					spend: recordSpend
				};

			} else {
				groupedByDate[recordDate].sales += recordSales;
				groupedByDate[recordDate].spend += recordSpend;				
			}
		}

		return groupedByDate
	},
	plotlyBar: function (dataSet) {
		var sales = {
			x: [],
			y: [],
			name: 'Sales',
			type: 'bar'
		};
		
		var spend = {
			x: [],
			y: [],
			name: 'Spend',
			type: 'bar'
		};

		var dateData = this.byDate(dataSet);

		for (var i = dateData.length - 1; i >= 0; i--) {
			var recordDate = dateData[i].date
			var recordSales = dateData[i].sales
			var recordSpend = dateData[i].spend

			sales.x.push(recordDate);
			sales.y.push(recordSales);

			spend.x.push(recordDate);
			spend.y.push(recordSpend);

		}

		var data = [sales,spend];
		var layout = {barmode: 'group'};
		
		return Plotly.newPlot('chartDiv',data,layout)
	}
}

module.exports = CampaignQuery;