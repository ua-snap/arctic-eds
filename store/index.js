export default {
	state() {
		return {
			// Whether the report for a place is shown
			reportIsVisible: false
		};
	},

	getters: {
		reportIsVisible: state => {
			return state.reportIsVisible;
		}
	},

	mutations: {
		openReport(state) {
			state.reportIsVisible = true;
		},
		closeReport(state) {
			state.reportIsVisible = false;
		}
	}
};
