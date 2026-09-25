<template>
  <section class="project-types" aria-labelledby="project-types-title">
    <div class="project-types-header">
      <h2 id="project-types-title" class="title is-3 mb-0">
        What engineers use it for
      </h2>
      <p class="has-text-grey-dark">
        Every report covers every dataset, whatever you’re building.
      </p>
    </div>

    <ul class="columns is-multiline">
      <li
        v-for="project in projectTypes"
        :key="project.name"
        class="column is-half-tablet is-one-third-desktop"
      >
        <article class="card">
          <div class="card-content">
            <span class="project-icon" aria-hidden="true">
              <i class="mdi mdi-24px" :class="project.icon"></i>
            </span>
            <div>
              <h3 class="title is-5 mb-1">{{ project.name }}</h3>
              <p class="question">{{ project.question }}</p>
              <p class="data">{{ project.data }}</p>
            </div>
          </div>
          <footer class="card-footer">
            <template v-if="project.calculators.length">
              <a
                v-for="key in project.calculators"
                :key="key"
                :href="calculators[key].url"
                class="calculator-link"
                >{{ calculators[key].name }} calculator
                <i class="mdi mdi-open-in-new" aria-hidden="true"></i
                ><span class="visually-hidden">(opens a notebook)</span></a
              >
            </template>
            <span v-else class="no-calculator"
              >Values and CSVs in every report</span
            >
          </footer>
        </article>
      </li>
    </ul>

    <div class="notification something-else">
      <p>
        <strong>Working on something else?</strong> Search any Alaska site
        above. Every report includes temperature, precipitation, design storms,
        snowfall, hydrology, degree days and permafrost.
      </p>
      <NuxtLink to="/data-sources" class="button is-primary is-outlined"
        >Browse the data sources</NuxtLink
      >
    </div>
  </section>
</template>

<script setup>
import { calculators, projectTypes } from '~/data/home'
</script>

<style lang="scss" scoped>
.project-types {
  max-width: 1180px;
  margin: 0 auto;
}
.project-types-header {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}
ul.columns {
  list-style: none;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
}
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: none;
  border: 1px solid #dcd8d2;
}
.card-content {
  flex-grow: 1;
  display: flex;
  gap: 1rem;
  padding: 1.25rem 1.375rem;
}
.project-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #e6eeec;
  color: #2f5f5a;
  display: flex;
  align-items: center;
  justify-content: center;
}
.question {
  font-weight: 600;
  color: #2f5f5a;
  margin-bottom: 0.5rem;
}
.data {
  font-size: 0.85rem;
  color: #5c5a58;
}
.card-footer {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.65rem 1.375rem;
  background: #fbfaf8;
  font-size: 0.85rem;
}
.calculator-link {
  font-weight: 600;
}
.no-calculator {
  color: #5c5a58;
}
.something-else {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  background: #fff;
  border: 1px solid #dcd8d2;
}
</style>
