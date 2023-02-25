<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="6" v-for="link in links" :key="link.title">
        <v-card
          class="d-flex align-center justify-center"
          :height="size"
          :href="link.link"
        >
          <v-card-text class="text-center">
            <v-icon size="100" :color="link.color">mdi-{{ link.icon }}</v-icon>
            <br />
            {{ link.title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import * as linker from "@/links.json";
import { ref } from "vue";

const links = ref([...linker.links]);
const size = ref(200);
</script>
