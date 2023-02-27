<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="4" v-for="link in links" :key="link.title">
        <v-card
          class="d-flex align-center justify-center"
          href="#"
          @click="handleNavigate(link.link)"
        >
          <v-card-text class="text-center">
            <v-icon :size="mobile ? 50 : 100" :color="link.color">
              mdi-{{ link.icon }}
            </v-icon>
            <br />
            <div v-if="!mobile">{{ link.title }}</div>
            <div v-else style="font-size: 10px; white-space: nowrap">
              {{ link.title }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import * as linker from "@/assets/links.json";
import { nextTick, ref } from "vue";
import { useDisplay } from "vuetify";

const links = ref([...linker.links]);
const mobile = useDisplay().xs.value;

function handleNavigate(link: string): void {
  nextTick(() => (location.href = link));
}
</script>
