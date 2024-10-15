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
          href="#"
          @click="handleNavigate(link)"
          :style="{ borderRadius: `${radius}px` }"
          :variant="cardStyle"
          :color="cardColor"
        >
          <v-card-title>
            <v-btn
              small
              class="float-end"
              :color="hasSsl(link) ? 'blue' : 'red'"
              size="x-small"
              @click.stop="updateLinkSsl(link)"
              variant="text"
            >
              {{ hasSsl(link) ? "https" : "http" }}
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <v-icon :size="mobile ? 50 : 100" :color="link.color">
              mdi-{{ link.icon }}
            </v-icon>
            <br />
            <div v-if="!mobile">
              {{ link.title }}
            </div>
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
const { drawer, radius, columns, cardStyle, cardColor, selectedUrl, sslMap } =
  storeToRefs(appStore);

function toggleDrawer(): void {
  drawer.value = !drawer.value;
}

function handleNavigate(link: { [x: string]: any }): void {
  nextTick(
    () =>
      (location.href =
        (hasSsl(link) ? "https://" : "http://") +
        `${selectedUrl.value}:${link.port}`)
  );
}

function hasSsl(link: { [x: string]: any }): boolean {
  return sslMap.value.some(
    (sslLink: { [x: string]: any }) => sslLink.title === link.title
  );
}

function updateLinkSsl(link: { [x: string]: any }): void {
  // check sslMap for link
  const exists = sslMap.value.some(
    (sslLink: { [x: string]: any }) => sslLink.title === link.title
  );

  if (exists) {
    // remove
    sslMap.value = sslMap.value.filter(
      (sslLink: { [x: string]: any }) => sslLink.title !== link.title
    );
  } else {
    // add
    sslMap.value.push(link);
  }
}

onMounted(() => {
  fetch("/linker/links.json")
    .then((response) => response.json())
    .then((data) => {
      links.value = data.links;
    });
});
</script>
