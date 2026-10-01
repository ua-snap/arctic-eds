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
      <SampleReport />
    </div>

    <div class="projects">
      <ProjectTypes />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import PlaceSearch from '~/components/PlaceSearch'
import SampleReport from '~/components/home/SampleReport'
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
// A band that runs edge to edge: cancel the layout's <main class="section">
// side padding (Bulma's 1.5rem, 3rem from desktop up) and put it back inside.
@mixin full-bleed {
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  @media screen and (min-width: 1024px) {
    margin-left: -3rem;
    margin-right: -3rem;
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

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
// The sample on its own lighter band, well clear of the search.
.example {
  @include full-bleed;
  margin-top: 2.5rem;
  padding-top: 4rem;
  padding-bottom: 4.5rem;
  background: #fff;
  border-top: 1px solid #ebe8e3;
  // The sample image fades into the band, not the page.
  --sample-fade-to: #fff;
}
.projects {
  @include full-bleed;
  // Down to the footer: cancel the layout section's bottom padding.
  margin-bottom: -3rem;
  padding-top: 3rem;
  padding-bottom: 3.5rem;
  background: #f4f2ee;
  border-top: 1px solid #e4e1dc;
}
</style>
