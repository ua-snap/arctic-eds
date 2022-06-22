<template>
  <div class="beta-feedback">
    <b-notification
      type="is-warning"
      has-icon
      aria-close-label="Close notification"
      role="alert"
      :closable="false"
      ><p>
        Thanks for checking out this tool! Until our complete launch in summer
        2024, this is a public beta, which means that we&rsquo;re still
        <a href="https://uaf-iarc.typeform.com/to/MLS1dDf9"
          >gathering feedback</a
        >, testing data outputs and fixing bugs.
      </p>
      <p>
        Data from this tool should not yet be used for engineering or
        decision&ndash;making purposes because datasets, while robust, have not
        yet been fully validated. However, &ldquo;test driving&rdquo; the tool
        by exploring layers and extracting data can be useful for project
        overviews and &ldquo;ballpark&rdquo; estimates.
      </p>
      <p>
        <NuxtLink to="/beta"
          >Learn more about what&rsquo;s in development and how to provide
          feedback</NuxtLink
        >
      </p>
    </b-notification>
  </div>
</template>
<style lang="scss" scoped>
::v-deep p:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
<script>
export default {
  name: 'BetaFeedback',
}
</script>
