<script setup lang="ts">
  import type { Skill } from '~/utils/types/skills.types';
  import useFetchData from '~/utils/useFetch';

  const { result, isLoading, error, fetchData } = useFetchData<Skill[]>(`/api/skills/`);

  const skillsList = computed(() => result.value?.filter((skill: Skill) => skill.show));

  await fetchData();
</script>

<template>
  <async-loader :is-loading="isLoading" :error="error">
    <v-container>
      <v-row justify="space-around">
        <v-col v-for="skill in skillsList" :key="skill.key" cols="12" sm="6" md="4" lg="3" xl="2">
          <skill :skill="skill" />
        </v-col>
      </v-row>
    </v-container>
  </async-loader>
</template>
