export default [
	{
		id: "pfextent_jorgenson",
		title: "Permafrost extent (Jorgenson et al., 2008)",
		wmsLayerName:
			"permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume",
		default: true
	},

	{
		id: "pfextent_obu",
		title: "Permafrost extent (Obu et al., 2018)",
		wmsLayerName: "permafrost_beta:obu_pf_extent"
	},

	{
		id: "3mgipl2010",
		title: "Ground temperature, 3m depth, 2010 (GIPL model)",
		wmsLayerName:
			"permafrost_beta:magt_3m_c_iem_gipl2_ar5_ncar_ccsm4_rcp85_2010_3338"
	},
	{
		id: "3mgipl2050",
		title: "Ground temperature, 3m depth, 2050 (GIPL model)",
		wmsLayerName:
			"permafrost_beta:magt_3m_c_iem_gipl2_ar5_ncar_ccsm4_rcp85_2050_3338"
	},

	{
		id: "altGIPL2010",
		title: "Active layer thickness, 2010 (GIPL model)",
		wmsLayerName:
			"permafrost_beta:alt_m_iem_gipl2_ar5_ncar_ccsm4_rcp85_2010_3338"
	},

	{
		id: "altGIPL2050",
		title: "Active layer thickness, 2050 (GIPL model)",
		wmsLayerName:
			"permafrost_beta:alt_m_iem_gipl2_ar5_ncar_ccsm4_rcp85_2050_3338"
	},

	{
		id: "obumagt",
		title:
			"Mean annual ground temperature at top of permafrost, 2000-2016 (modeled)",
		wmsLayerName: "obu_2018_magt"
	},
	{
		id: "icevol_jorgenson",
		title: "Ground ice volume (Jorgenson et al., 2008)",
		wmsLayerName:
			"permafrost_beta:jorgenson_2008_pf_extent_ground_ice_volume",
		style: "permafrost_beta:ground_ice_volume"
	}
];
