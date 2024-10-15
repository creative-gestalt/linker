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
    const baseUrls = ref([] as string[]);
    const ssl = ref(false);

    return {
      drawer,
      columns,
      radius,
      cardStyle,
      cardColor,
      selectedUrl,
      baseUrls,
      ssl,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
