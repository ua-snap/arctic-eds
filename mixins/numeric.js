export const numeric = {
	methods: {
		round: function (value, precision) {
			precision = precision ? precision : 3
			return Number(value.toPrecision(precision))
		},
	},
}
