<template>
  <b-container class="bv-example-row">
    <b-container style="text-align: left">
      <h1>About CodeVQL</h1>
      <p>
        Numerous tools and techniques have been developed to perform program
        analysis on a particular version of the software. While the software
        development process is usually incremental and iterative, there are
        usually multiple historical versions introduced. Yet, there does not
        exist an effective way of performing program analysis across different
        versions.
      </p>
      <p>
        This project aims to provide a new query language - CodeVQL for code
        security analysis on specified version(s) of a software program. CodeVQL
        does the high-level code analysis for structural code changes, and thus
        it can provide useful information for quality control purpose across
        different versions. Unlike databases that other program analysis tools
        based on, the database that Code- VQL queries upon contains both program
        facts and the version a record belongs to. We name the version-aware
        database as the versionized factbase. Analysis like but not limited to
        "what are the methods that are invoked in version N and but not invoked
        in version M" can be found through a simple SQL-like query.
      </p>
      <p>For a visual illustration of CodeVQL, please refer to this video.</p>
    </b-container>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/c9eIc_Ylcc0"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </b-container>
</template>
