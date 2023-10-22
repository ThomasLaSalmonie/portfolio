<script setup lang="ts">
  import type { Skill } from '~/utils/types/skills.types';

  export type SkillProps = {
    skill: Skill;
    iconOnly?: boolean;
  };

  const props = withDefaults(defineProps<SkillProps>(), {
    iconOnly: false
  });
</script>

<template>
  <v-sheet class="px-6 py-4" color="grey-lighten-3" rounded>
    <v-row align="center">
      <v-col class="d-flex justify-center" :cols="props.iconOnly ? 12 : 4">
        <v-avatar size="x-large">
          <v-icon color="black" size="x-large" :icon="`mdi-${props.skill.icon}`"></v-icon>
        </v-avatar>
      </v-col>
      <v-col cols="8" v-if="!props.iconOnly">
        <h4>{{ props.skill.name }}</h4>
        <v-progress-linear
          class="my-3"
          color="primary"
          :model-value="props.skill.progress"
          :height="12"
        ></v-progress-linear>
        <v-btn rounded> See more </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>
