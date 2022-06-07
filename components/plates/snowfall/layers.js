export default [
	{
		id: "historical_mean_annual_snowfall",
		title: "Historical (1910-1919)",
		source: "rasdaman",
		wmsLayerName: "mean_annual_snowfall",
		rasdamanConfiguration: {
			dim_model: 0,
			dim_scenario: 0,
			dim_decade: 0,
		},
		style: "precip",
		default: true,
	},
	{
		id: "future_mean_annual_snowfall",
		title: "Projected (2090-2099, MRI CGCM3, RCP 8.5)",
		source: "rasdaman",
		wmsLayerName: "mean_annual_snowfall",
		rasdamanConfiguration: {
			dim_model: 4,
			dim_scenario: 3,
			dim_decade: 19,
		},
		style: "precip",
	},
];
