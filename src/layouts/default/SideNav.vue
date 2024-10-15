<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list-item title="Base Urls"></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item title="New">
        <v-text-field v-model="newBaseUrl" density="compact" variant="outlined">
          <template #append>
            <v-btn
              icon="mdi-check"
              @keyup.enter="addNewUrl"
              @click="addNewUrl"
              variant="text"
              size="x-small"
            ></v-btn>
          </template>
        </v-text-field>
      </v-list-item>

      <v-list-item title="Url List">
        <template #append>
          <v-icon
            icon="mdi-pencil"
            :color="editMode ? 'orange' : 'grey'"
            @click="editMode = !editMode"
            size="small"
          ></v-icon>
        </template>
        <v-radio-group v-if="!editMode" v-model="selectedUrl">
          <v-radio
            v-for="(url, index) of baseUrls"
            :key="index"
            :value="url"
            :label="url"
          >
          </v-radio>
        </v-radio-group>
        <div v-else>
          <v-btn
            v-for="(url, index) of baseUrls"
            :key="index"
            color="red"
            variant="outlined"
            class="ma-1"
            @click="removeUrl(url)"
          >
            {{ url }}
          </v-btn>
        </div>
      </v-list-item>
    </v-list>

    <v-list-item title="Options"></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item title="Radius">
        <v-slider v-model="radius"></v-slider>
      </v-list-item>
      <v-list-item title="Columns">
        <v-select
          v-model="columns"
          :items="columnOptions"
          density="compact"
        ></v-select>
      </v-list-item>
      <v-list-item title="Styles">
        <v-select
          v-model="cardStyle"
          :items="cardStyles"
          density="compact"
        ></v-select>
      </v-list-item>
      <v-list-item title="Color">
        <v-select
          v-model="cardColor"
          :items="cardColors"
          density="compact"
        ></v-select>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const appStore = useAppStore();
const { drawer, radius, columns, cardStyle, cardColor, selectedUrl, baseUrls } =
  storeToRefs(appStore);
const columnOptions = ref([3, 4, 6, 12]);
const cardStyles = ref([
  "elevated",
  "text",
  "plain",
  "tonal",
  "flat",
  "outlined",
]);
const cardColors = ref(["black", "grey-darken-4", "white"]);
const newBaseUrl = ref("");
const editMode = ref(false);

function addNewUrl(): void {
  baseUrls.value.push(String(newBaseUrl.value));
  newBaseUrl.value = "";
}

function removeUrl(baseUrl: string): void {
  baseUrls.value = baseUrls.value.filter((url) => url !== baseUrl);
}
</script>
