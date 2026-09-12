export const safe = {
	computed: {
		safeMode() {
			return useRuntimeConfig().public.safeMode
		}
	},
}
