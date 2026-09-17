<template>
  <footer class="footer">
    <div class="container content is-size-5">
      <div class="columns">
        <div class="logo column is-one-fifth has-text-centered">
          <img src="~/assets/images/UAF.svg" alt="UAF Logo" /><br />
        </div>
        <div class="column is-four-fifths">
          <p class="lead">
            Arctic Environmental and Engineering Data and Design Support System
            (Arctic-EDS)
          </p>

          <p>
            This tool was developed by the
            <a href="https://www.snap.uaf.edu/" title="🐨🐨🐨"
              >Scenarios Network for Alaska and Arctic Planning</a
            >
            located at the
            <a href="https://uaf-iarc.org"
              >International Arctic Research Center</a
            >. Funding provided by the U.S. Department of Defense
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
            Copyright &copy; {{ year }} University of Alaska Fairbanks. All
            rights reserved. The
            <a href="https://www.alaska.edu/">University of Alaska</a> is an
            Equal Opportunity/Equal Access Employer and Educational Institution.
            The University is committed to a
            <a href="https://www.alaska.edu/nondiscrimination/"
              >policy of non-discrimination</a
            >
            against individuals on the basis of any legally protected status.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.footer {
  box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.4);

  .logo {
    text-align: center;
    @media (min-width: 600px) {
      text-align: right;
    }
    img {
      position: relative;
      top: 1.25rem;
      width: 75%;
      max-width: 40vw;
      margin-bottom: 1.5rem;
    }
  }

  p {
    margin: 1rem;
  }

  .lead {
    font-size: 1.5rem;
    font-weight: 700;
  }

  :deep(.button) {
    font-weight: bold;
    &:hover {
      background-color: #312e30;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
