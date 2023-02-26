<template>
  <v-app theme="dark">
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HelloWorld from "@/components/LinkGrid.vue";
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
