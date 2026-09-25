<template>
  <div>
    <section class="hero-search has-text-centered">
      <h1 class="title is-1">See how far your design parameters shift.</h1>
      <p class="subtitle is-5 has-text-grey-dark">
        Projected change from the historical record at any Alaska site, and how
        closely the models agree.
      </p>
      <PlaceSearch class="search" />
      <p class="try has-text-grey-dark">
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
    </section>

    <div class="example">
      <ShiftExample />
    </div>

    <div class="projects">
      <ProjectTypes />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import PlaceSearch from '~/components/PlaceSearch'
import ShiftExample from '~/components/home/ShiftExample'
import ProjectTypes from '~/components/home/ProjectTypes'
import { tryPlaces } from '~/data/home'

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

<style lang="scss" scoped>
.hero-search {
  padding: 2.5rem 0 2.5rem;

  .title {
    font-family: 'Barlow', sans-serif;
    font-weight: 900;
    font-size: clamp(2.25rem, 5vw, 3.75rem);
    line-height: 1.02;
  }
  .subtitle {
    max-width: 45rem;
    margin: 1rem auto 0;
  }
  .search {
    max-width: 48rem;
    margin: 2rem auto 0;
  }
  .try {
    margin-top: 1rem;
  }
}
.example {
  padding-bottom: 3.5rem;
}
.projects {
  // A full-bleed band: cancel the layout's <main class="section"> padding
  // (Bulma's 3rem top/bottom, 1.5rem sides, 3rem sides from desktop up) so
  // it runs edge to edge and down to the footer.
  margin: 0 -1.5rem -3rem;
  padding: 3rem 1.5rem 3.5rem;
  background: #f4f2ee;
  border-top: 1px solid #e4e1dc;

  @media screen and (min-width: 1024px) {
    margin-left: -3rem;
    margin-right: -3rem;
    padding-left: 3rem;
    padding-right: 3rem;
  }
}
</style>
