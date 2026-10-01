<template>
  <footer class="footer">
    <div class="container content is-size-5">
      <p class="title is-4">
        Arctic Environmental and Engineering Data and Design Support System
        (Arctic-EDS)
      </p>

      <p>
        This tool was developed by the
        <a href="https://www.snap.uaf.edu/" title="🐨🐨🐨"
          >Scenarios Network for Alaska and Arctic Planning</a
        >
        located at the
        <a href="https://uaf-iarc.org">International Arctic Research Center</a>.
        Funding provided by the U.S. Department of War
        <a href="https://serdp-estcp.org"
          >Environmental Security Technology Certification Program</a
        >.
      </p>

      <p>
        Please contact
        <a href="mailto:uaf-snap-data-tools@alaska.edu"
          >uaf-snap-data-tools@alaska.edu</a
        >
        with questions or comments.
      </p>

      <p>
        Copyright &copy; {{ year }} University of Alaska Fairbanks. All rights
        reserved. The
        <a href="https://www.alaska.edu/">University of Alaska</a> is an Equal
        Opportunity/Equal Access Employer and Educational Institution. The
        University is committed to a
        <a href="https://www.alaska.edu/nondiscrimination/"
          >policy of non-discrimination</a
        >
        against individuals on the basis of any legally protected status.
      </p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
