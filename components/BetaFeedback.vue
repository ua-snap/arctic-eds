<template>
  <div class="beta-feedback">
    <b-notification
      type="is-warning"
      has-icon
      aria-close-label="Close notification"
      role="alert"
      :closable="false"
      ><p>
        Thanks for checking out this tool! Right now, this is a public beta,
        which means that we&rsquo;re still gathering feedback, testing the data
        outputs and fixing bugs.
        <strong
          >Data from this tool should not yet be used for engineering or 
          decision&ndash;making purposes.</strong
        >  <NuxtLink to="/beta">Read more</NuxtLink>
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
  name: "BetaFeedback",
};
</script>
