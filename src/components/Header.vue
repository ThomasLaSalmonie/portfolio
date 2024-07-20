<script setup lang="ts">
  import { useDisplay } from 'vuetify';

  const { mobile } = useDisplay({ mobileBreakpoint: 960 });
  const drawer = ref<boolean>(false);
</script>

<template>
  <v-app-bar color="black">
    <template v-if="mobile" #prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </template>
    <v-toolbar-title v-if="!mobile">
      <v-btn id="btn-home" to="/">Thomas La Salmonie</v-btn>
    </v-toolbar-title>

    <v-toolbar-items v-if="!mobile">
      <v-btn variant="text" to="/about">About me</v-btn>
      <v-btn variant="text" to="/skills">My skills</v-btn>
      <v-btn variant="text" to="/work">My work</v-btn>
      <v-btn variant="text" to="/contact">Contact me</v-btn>
    </v-toolbar-items>

    <v-spacer />
  </v-app-bar>
  <v-navigation-drawer v-if="mobile" v-model="drawer" temporary>
    <v-list-item prepend-avatar="/profile.jpeg" title="Thomas La Salmonie" to="/"></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard" to="/about" title="About me" />
      <v-list-item prepend-icon="mdi-head-lightbulb-outline" to="/skills" title="My skills" />
      <v-list-item prepend-icon="mdi-briefcase" to="/work" title="My work" />
      <v-list-item prepend-icon="mdi-forum" to="/contact" title="Contact me" />
    </v-list>
  </v-navigation-drawer>
</template>
