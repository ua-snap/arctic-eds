<template>
  <div>
    <section class="section has-text-centered">
      <div class="container">
        <h1
          class="title is-1 is-size-2-mobile is-family-secondary has-text-weight-extrabold"
        >
          See how far your design parameters shift.
        </h1>
        <div class="container is-max-tablet">
          <p class="subtitle is-5">
            Projected change from the historical record at any Alaska site, and
            how closely the models agree.
          </p>
          <PlaceSearch class="mt-5" />
          <p class="mt-4">
            Try
            <template v-for="(place, index) in tryPlaces" :key="place.id">
              <NuxtLink :to="`/report/community/${place.id}#results`">{{
                place.name
              }}</NuxtLink
              ><span v-if="index < tryPlaces.length - 1" aria-hidden="true">
                ·
              </span>
            </template>
          </p>
        </div>
      </div>
    </section>

    <section class="section has-background-white">
      <SampleReport />
    </section>

    <section class="section has-background-white-ter">
      <ProjectTypes />
    </section>

    <section class="section has-background-white">
      <AboutArcticEds />
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import PlaceSearch from '~/components/PlaceSearch'
import SampleReport from '~/components/home/SampleReport'
import ProjectTypes from '~/components/home/ProjectTypes'
import AboutArcticEds from '~/components/home/AboutArcticEds'
import { tryPlaces } from '~/data/home'

// The page is made of full-width bands, each its own section (see
// layouts/default.vue).
definePageMeta({ bands: true })

const route = useRoute()
const router = useRouter()

onMounted(() => {
  // Switch back to clean URL after S3 redirect. Adapted from here:
  // https://via.studio/journal/hosting-a-reactjs-app-with-routing-on-aws-s3
  const path = (/#!(\/.*)$/.exec(route.fullPath) || [])[1]
  if (path) {
    router.push({ path: path })
  }
})
</script>
