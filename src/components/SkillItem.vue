<script setup lang="ts">
  import type { Skill } from '~/utils/types/skills.types';

  export type SkillProps = {
    skill: Skill;
    iconOnly?: boolean;
  };

  const properties = withDefaults(defineProps<SkillProps>(), {
    iconOnly: false
  });
</script>

<template>
  <v-sheet class="px-6 py-4" color="grey-lighten-3" rounded>
    <v-row align="center">
      <v-col class="d-flex justify-center" :cols="properties.iconOnly ? 12 : 4">
        <v-tooltip
          location="top"
        >
          <template #activator="{ props }">
            <v-avatar size="x-large" v-bind="props">
                <v-icon v-if="properties.skill.icon" :aria-label="properties.skill.name" color="black" size="x-large" :icon="`mdi-${properties.skill.icon}`" />
                <span v-else style="font-size: 10px;">
                    {{ properties.skill.name }}
                </span>
            </v-avatar>
          </template>
            <span>{{ properties.skill.name }}</span>
        </v-tooltip>
      </v-col>
      <v-col v-if="!properties.iconOnly" cols="8">
        <h4>{{ properties.skill.name }}</h4>
        <v-progress-linear
          class="my-3"
          color="primary"
          :model-value="properties.skill.progress"
          :height="12"
        ></v-progress-linear>
        <v-btn rounded> See more </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>
