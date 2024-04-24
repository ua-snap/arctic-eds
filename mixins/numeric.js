export const numeric = {
	methods: {
		round: function (value, precision) {
			if( typeof(precision) === undefined ) {
				precision = 3
			}
			// Special case for mm > 1000
			if ((value > 1000) && precision == 2) {
				precision = 3
			} 
			return Number(value.toPrecision(precision))
		},
	},
}
