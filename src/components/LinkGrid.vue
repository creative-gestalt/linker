<template>
  <v-btn
    variant="text"
    position="absolute"
    icon="mdi-menu"
    @click="toggleDrawer"
  ></v-btn>
  <v-container class="fill-height">
    <v-row>
      <v-col :cols="columns" v-for="link in links" :key="link.title">
        <v-card
          class="d-flex align-center justify-center"
          href="#"
          @click="handleNavigate(link.port)"
          :style="{ borderRadius: `${radius}px` }"
          :variant="cardStyle"
          :color="cardColor"
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
import { nextTick, onMounted, ref } from "vue";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app";

const links = ref([] as any);
const mobile = useDisplay().xs.value;
const appStore = useAppStore();
const { drawer, radius, columns, cardStyle, cardColor, selectedUrl, ssl } =
  storeToRefs(appStore);

function toggleDrawer(): void {
  drawer.value = !drawer.value;
}

function handleNavigate(port: string): void {
  nextTick(
    () =>
      (location.href =
        (ssl.value ? "https://" : "http://") + `${selectedUrl.value}:${port}`)
  );
}

onMounted(() => {
  fetch("/linker/links.json")
    .then((response) => response.json())
    .then((data) => {
      links.value = data.links;
    });
});
</script>
