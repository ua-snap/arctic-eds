import { computed } from 'vue'

export function useSafeMode() {
  const config = useRuntimeConfig()
  const safeMode = computed(() => config.public.safeMode)

  return { safeMode }
}
