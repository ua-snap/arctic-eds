<template>
  <section class="section">
    <div class="content-wrapper">
      <div class="content is-size-5">
        <h2 class="title is-3">
          About this tool
        </h2>
        <p>
          In the late 20th century, the need for accessible environmental information 
          tailored to engineers and decision-makers, led to the publication of the 
          Environmental Atlas of Alaska. The publication compiled maps of the best 
          data available at the time. The Atlas provided a well-organized overview of 
          the physical characteristics of the state alongside its waters, sunlight, and 
          general climate. This was paired with engineering requirements and guidelines, 
          as well as a thorough bibliography. 
        </p>
        <h2 class="title is-3">The Atlas ages</h2>
        <p>
          Over time the Atlas’ shortcomings became clear. Data gaps frustrated 
          engineers and planners not working along the state’s road systems or 
          rivers, and presented particular challenges to engineers in the far 
          north and west. Complex topography, particularly in Southeast Alaska, 
          also made coarse–scale maps frustratingly imprecise. The data also assumed 
          a steady climatic state while modern data tells a more detailed story—one 
          of significant change.
        </p>
        <h2 class="title is-3">A path forward</h2>
        <p>
          Alaska’s infrastructure must be robust to support the economic, defense, 
          and social needs of a state experiencing a changing climate. The Arctic 
          Environmental and Engineering Data & Design Support System was created 
          to replace the aging Environmental Atlas of Alaska while addressing the 
          old atlas’ shortcomings by providing finer scale data, filling data gaps, 
          and incorporating climate projections. The Arctic EDS provides easily 
          obtainable, well–vetted, and reliable engineering and environmental data 
          in a central website designed to meet the needs of engineering professionals.
        </p>
        <p>
          Improved historical data allows this site to provide a more detailed 
          picture of Alaska’s climate history. Modern climate science also allows 
          the Arctic EDS to make informed projections about the future of the state’s 
          climate over the lifespan of Alaska’s infrastructure. Finally, the integration 
          of functional modules, a data API, and python notebooks allow for easy integration 
          of Arctic EDS data into modern engineering workflows relying on computer programs.
        </p>
        <p>
          The tool, built by the team at the University of Alaska Fairbanks 
          Scenarios Network for Alaska + Arctic Planning, is under active development. 
          The Arctic EDS team comprises experts from the University of Alaska Fairbanks’ 
          International Arctic Research Center and Department of Civil, Geological, and 
          Environmental Engineering; alongside experts from the University of Alaska 
          Anchorage; the Cold Regions Research and Engineering Laboratory; Neptune, Inc.; 
          and Lawrence Berkeley National Laboratory.
        </p>
        <h2 class="title is-3">Thank you to our funders</h2>
        <p>
          Funding comes from the Environmental Security Technology Certification
          Program, an environmental technology demonstration and validation
          program of the United States Department of Defense. The team is
          grateful for ongoing support and feedback from the United States Army
          Corps of Engineers.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
p:last-of-type {
  margin-bottom: 2.5rem;
}
</style>

<script>
export default {
  layout: 'content',
}
</script>
