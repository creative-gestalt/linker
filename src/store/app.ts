// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore(
  "app",
  () => {
    const drawer = ref(false);
    const columns = ref(4);
    const radius = ref(5);
    const cardStyle = ref("elevated" as NonNullable<any>);
    const cardColor = ref("black lighten-4");
    const selectedUrl = ref("");
    const newTab = ref(false);
    const baseUrls = ref([] as string[]);
    const sslMap = ref([] as object[]);

    return {
      drawer,
      columns,
      radius,
      cardStyle,
      cardColor,
      selectedUrl,
      newTab,
      baseUrls,
      sslMap,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
