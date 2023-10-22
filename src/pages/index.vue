<script setup lang="ts">
  import type { Project } from '~/utils/types/projects.types';
  import useFetchData from '~/utils/useFetch';

  const { result, isLoading, error, fetchData } = useFetchData<Project[]>(`/api/projects/?limit=3`);

  await fetchData();
</script>

<template>
  <v-parallax class="hero-parallax" src="/background_parallax.jpeg">
    <h1 class="text-black" style="font-size: 4rem;">Welcome to My Portfolio</h1>
    <h2 class="text-black">Showcasing my passion for Software Development.</h2>
  </v-parallax>
  <v-container>
    <section class="hero-text">
      <h2>TL;DR</h2>
      <p>
        Curious, passionate and selftaught.
        <br />
        I focus on the quality of my web development, collaborative work and knowledge-sharing.
        <br />
        Engineer in software studies and development, specializing in web technologies, I know how
        to take the step back to measure the stakes of a project and I can adapt quickly to new
        environments.
        <br />
        I continually question my work, in order to make quality work as close to user expectations
        as possible.
      </p>
    </section>
    <async-loader :is-loading="isLoading" :error="error">
      <v-carousel
        v-if="Number(result?.length) > 0"
        height="400"
        hide-delimiters
        cycle
        interval="6000"
        :show-arrows="false"
      >
        <v-carousel-item
          v-for="(project, i) in result"
          :key="i"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        >
          <section class="d-flex flex-column fill-height justify-center align-center">
            <h2 class="pb-5" style="color: white">
              {{ project.name }}
            </h2>
            <span v-if="project.shortDescription" class="ma-6" style="color: white">
              {{ project.shortDescription }}
            </span>
            <v-btn :to="`/projects/${project.slug}`"> See more </v-btn>
          </section>
        </v-carousel-item>
        <v-carousel-item>
          <div class="d-flex fill-height justify-center align-center bg-grey-darken-2">
            <v-btn to="/work"> See all projects </v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
    </async-loader>
  </v-container>
  <v-container fluid class="bg-grey-darken-4">
    <v-row>
      <v-col class="d-flex justify-center">
        <h2>Development Services</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="3">
        <div class="service-card">
          <h3>Web Development</h3>
          <p>From static sites to full scale Web</p>
        </div>
      </v-col>
      <v-col col="3">
        <div class="service-card">
          <h3>UI/UX Design</h3>
          <p>Designing intuitive and user-friendly interfaces for a seamless user experience.</p>
        </div>
      </v-col>
      <v-col col="3">
        <div class="service-card">
          <h3>Database</h3>
          <p>Database/Mock Database Systems Creation, Management & Interfacing</p>
        </div>
      </v-col>
      <v-col col="3">
        <div class="service-card">
          <h3>CI/CD</h3>
          <p>Automate your development practice</p>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">
        <h2>My Articles</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center">
        <span>Coming soon</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .hero-parallax {
    height: 70vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
  }

  .hero-text {
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    text-align: center;
  }

  .service-card {
    text-align: center;
    padding: 1rem;
    border: 1px solid #ccc;
    height: 100%;
    margin-bottom: 1rem;
  }

  .service-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .service-card p {
    font-size: 1rem;
  }
</style>
