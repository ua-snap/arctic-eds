export default [
	{
		id: "historical_mean_annual_precip",
		title: "Historical (1960&ndash;1989)",
		source: "rasdaman",
		wmsLayerName: "annual_precip_totals",
		rasdamanConfiguration: {
			dim_model: 5,
			dim_scenario: 3,
			time: "2099-01-01T00:00:00.000Z",
		},
		style: "precip",
		default: true,
	},
	{
		id: "future_midcentury_precip",
		title: "Projected Mid&ndash;Century (2040&ndash;2079)",
		source: "rasdaman",
		wmsLayerName: "annual_precip_totals",
		rasdamanConfiguration: {
			dim_model: 6,
			dim_scenario: 3,
			time: "2099-01-01T00:00:00.000Z",
		},
		style: "precip",
	},
];
