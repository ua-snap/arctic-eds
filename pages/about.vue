<template>
  <div class="container">
    <div class="content is-size-5">
      <h2>About this tool</h2>
      <p>
        In the late 20th century, the need for accessible environmental
        information tailored to engineers and decision&ndash;makers, led to the
        publication of the Environmental Atlas of Alaska. The publication
        compiled maps of the best data available at the time. The Atlas provided
        a well&ndash;organized overview of the physical characteristics of the
        state alongside its waters, sunlight, and general climate. This was
        paired with engineering requirements and guidelines, as well as a
        thorough bibliography.
      </p>
    </div>
    <div>
      <div class="tile is-parent is-ancestor">
        <div class="tile is-child">
          <img
            src="~/assets/images/atlas-cover.jpg"
            alt="Cover of the Environmental Atlas of Alaska, April 1978"
          />
        </div>

        <div class="tile is-child">
          <img
            src="~/assets/images/heating_degree_days.png"
            alt="Image from the Environmental Atlas of Alaska, April 1978"
          />
        </div>
      </div>
    </div>
    <div class="content is-size-5">
      <h2>The Atlas ages</h2>
      <p>
        Over time the Atlas&rsquo; shortcomings became clear. Data gaps
        frustrated engineers and planners not working along the state&rsquo;s
        road systems or rivers, and presented particular challenges to engineers
        in the far north and west. Complex topography, particularly in Southeast
        Alaska, also made coarse&ndash;scale maps imprecise. The data also
        assumed a steady climatic state while modern data tells a more detailed
        story&mdash;one of significant change.
      </p>
      <h2>A path forward</h2>
      <p>
        Alaska&rsquo;s infrastructure must be robust to support the economic,
        defense, and social needs of a state experiencing a changing climate.
        Arctic Environmental and Engineering Data and Design Support System
        (Arctic-EDS) was created to replace the aging Environmental Atlas of
        Alaska while addressing the old atlas&rsquo; shortcomings by providing
        finer scale data, filling data gaps, and incorporating climate
        projections. The Arctic-EDS provides easily obtainable,
        well&ndash;vetted, and reliable engineering and environmental data in a
        central website designed to meet the needs of engineering professionals.
      </p>
      <p>
        Improved historical data allows this site to provide a more detailed
        picture of Alaska&rsquo;s climate history. Modern climate science also
        allows the Arctic-EDS to make informed projections about the future of
        the state&rsquo;s climate over the lifespan of Alaska&rsquo;s
        infrastructure. Finally, the integration of functional modules, a data
        API, and Python notebooks allow for easy integration of Arctic-EDS data
        into modern engineering workflows relying on computer programs.
      </p>
      <p>
        The tool, built by the team at the University of Alaska Fairbanks
        Scenarios Network for Alaska + Arctic Planning, is under active
        development. The Arctic-EDS team comprises experts from the University
        of Alaska Fairbanks&rsquo; International Arctic Research Center and
        Department of Civil, Geological, and Environmental Engineering;
        alongside experts from the University of Alaska Anchorage; the Cold
        Regions Research and Engineering Laboratory; Neptune, Inc.; and Lawrence
        Berkeley National Laboratory.
      </p>
      <h3>Thank you to our funders</h3>
      <p>
        Funding comes from the Environmental Security Technology Certification
        Program, an environmental technology demonstration and validation
        program of the United States Department of Defense. The team is grateful
        for ongoing support and feedback from the United States Army Corps of
        Engineers.
      </p>
      <h3>License</h3>
      <p>
        Unless otherwise specified by source providers, all data available
        through this tool is available through the
        <a href="https://creativecommons.org/licenses/by/4.0/"
          >Creative Commons Attribution 4.0 International (CC by 4.0)</a
        >.
      </p>

      <h3>Rasdaman raster database</h3>
      <p>
        This tool uses the
        <a href="http://www.rasdaman.org/">rasdaman</a> array database
        management system. This technology enables our team to store, analyze
        and visualize the 5+ TB of climate data that are presented through this
        interface. We wish to thank the rasdaman project and team for their
        inspiration and support, and for providing this important innovation in
        data technology.
      </p>
      <blockquote>
        Peter Baumann, email: p.baumann@jacobs-university.de, & website:
        rasdaman.org. (2018). rasdaman - raster data manager (9.5.0). Zenodo.
        <a href="https://doi.org/10.5281/zenodo.1163021"
          >https://doi.org/10.5281/zenodo.1163021</a
        >
      </blockquote>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  max-width: 40em;
  margin: 1.25rem auto;
}
img {
  padding: 1rem;
}
h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>

<script>
export default {
  layout: 'content',
}
</script>
