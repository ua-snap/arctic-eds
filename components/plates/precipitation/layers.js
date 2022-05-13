export default [
	{
		id: "historical_mean_annual_precip",
		title: "Historical (1901)",
		source: "rasdaman",
		wmsLayerName: "annual_precip_totals",
		rasdamanConfiguration: {
			dim_model: 1,
			dim_scenario: 0,
			time: "1901-01-01T00:00:00.000Z",
		},
		style: "precip",
		default: true,
	},
	{
		id: "future_midcentury_precip",
		title: "Projected (2099, MRI CGCM3, RCP 8.5)",
		source: "rasdaman",
		wmsLayerName: "annual_precip_totals",
		rasdamanConfiguration: {
			dim_model: 5,
			dim_scenario: 3,
			time: "2099-01-01T00:00:00.000Z",
		},
		style: "precip",
	},
];
