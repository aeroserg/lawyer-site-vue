<template>
  <v-app>
    <Header />
    <v-main>
        <slot />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/shared/Header.vue";
import Footer from "../components/shared/Footer.vue";

export default defineComponent({
  name: "MainLayout",
  components: { Header, Footer },
});
</script>
