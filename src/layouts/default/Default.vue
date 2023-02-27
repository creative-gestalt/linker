<template>
  <v-app theme="dark">
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultView from "./View.vue";
</script>

<style>
html {
  background-color: black;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 10px;
  background-color: #171717;
}
::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-color: #898989;
}
</style>
