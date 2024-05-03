export const safe = {
	computed: {
		safeMode() {
			return process.env.safeMode
		}
	},
}
