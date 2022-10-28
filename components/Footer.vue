<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="logo column is-one-fifth has-text-centered">
          <img src="~/assets/images/UAF.svg" alt="UAF Logo" />
        </div>
        <div class="column is-four-fifths">
          <p class="lead">
            Arctic Environmental and Engineering Data + Design Support System
          </p>

          <p>
            Engineers and scientists working in the Arctic need easily
            obtainable engineering and environmental data. The Arctic-EDS is a
            system of online technologies that curate and dynamically update
            relevant Arctic environmental data in a central repository for use
            in web-based maps, modules, and notebooks.
          </p>

          <p>
            This tool was developed by the
            <a href="https://www.snap.uaf.edu/" title="👍"
              >Scenarios Network for Alaska and Arctic Planning</a
            >
            at the
            <a href="https://uaf-iarc.org"
              >International Arctic Research Center</a
            >.
          </p>

          <p>
            Funding provided by the U.S. Department of Defense Environmental
            Security Technology Certification Program (<a
              href="https://serdp-estcp.org"
              >ESTCP</a
            >).
          </p>

          <p>
            Please contact
            <a href="mailto:uaf-snap-data-tools@alaska.edu"
              >uaf-snap-data-tools@alaska.edu</a
            >
            if you have questions or would like to provide feedback for this
            tool.
          </p>

          <p>
            Copyright &copy; {{ year }} University of Alaska Fairbanks. All
            rights reserved.
          </p>

          <p>
            UA is an AA/EO employer and educational institution and prohibits
            illegal discrimination against any individual.
            <a href="https://www.alaska.edu/nondiscrimination/"
              >Statement of Nondiscrimination</a
            >
            and
            <a
              href="https://www.alaska.edu/records/records/compliance/gdpr/ua-privacy-statement/"
              >Privacy Statement</a
            >
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
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
}
</style>
