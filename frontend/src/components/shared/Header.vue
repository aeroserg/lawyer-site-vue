<template>
  <v-app-bar
    flat
    :style="headerStyles"
    density="comfortable"

  >
    <v-img src="/logo.svg" alt="Logo" max-width="140" style="margin-bottom: 5px;" />

    <v-spacer></v-spacer>

    <!-- Contact Button -->
    <v-btn
      class="contact-button"
      :style="contactButtonStyles"
      small
      @click="scrollToForm"
    >
      Связаться с юристом
    </v-btn>

    <!-- Responsive: Burger menu on smaller screens -->
    <v-btn
      icon
      class="menu-icon"
      v-if="isSmallScreen"
      @click="toggleMenu"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <!-- Menu items for larger screens -->
    <div class="menu-container" v-else>
      <v-btn
        v-for="item in menuItems"
        :key="item.id"
        variant="text"
        :href="item.link"
        class="nav-link"
        :target="item.is_external ? '_blank' : '_self'"
        :rel="item.is_external ? 'noopener noreferrer' : ''"
      >
        {{ item.section_name }}
      </v-btn>
    </div>
  </v-app-bar>

  <!-- Burger menu drawer -->
  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
    right
    :style="{ position: 'fixed'}"
  >
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.id"
        :href="item.link"
        :target="item.is_external ? '_blank' : '_self'"
        :rel="item.is_external ? 'noopener noreferrer' : ''"
      >
        <v-list-item-title>{{ item.section_name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { fetchData } from "../../utils/api";

export default defineComponent({
  name: "Header",
  setup() {
    const drawer = ref(false);
    const { mdAndDown } = useDisplay();
    const isSmallScreen = computed(() => mdAndDown.value);

    const toggleMenu = () => {
      drawer.value = !drawer.value;
    };

    const scrollToForm = () => {
      const form = document.getElementById("contact");
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        
      }
    };

    const headerStyles = computed(() => {
      return isSmallScreen.value
        ? "background-color: white; color: #010138; padding: 0 5px; width: 100%; position: fixed; top: 0; left: 0; z-index: 1000; box-shadow: 0 2px 0px rgba(0, 0, 0, 0.6);"
        : "background-color: white; color: #010138; margin: 20px 5% 0 5%;position: fixed; padding: 10px 20px; border-radius: 18px; box-shadow: 0 2px 0px rgba(0, 0, 0, 0.6); width: 90%;";
    });

    const contactButtonStyles = computed(() => {
      return isSmallScreen.value
        ? "background-color: #eb8917; color: white; font-size: 10px; padding: 8px 6px!important; height: fit-content;"
        : "background-color: #eb8917; color: white; font-size: 14px;";
    });

    return { drawer, isSmallScreen, toggleMenu, headerStyles, contactButtonStyles, scrollToForm };
  },
  data() {
    return {
      menuItems: [] as Array<{
        id: number;
        section_name: string;
        link: string;
        is_external: boolean;
      }>,
    };
  },
  async created() {
    try {
      const response = await fetchData("menu", { populate: "*" });
      const menu = response.data?.menu_json?.menu || [];

      this.menuItems = menu.map((m: any) => ({
        id: m.id,
        section_name: m.section_name || "",
        link: m.link || "#",
        is_external: m.is_external || false,
      }));
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  },
});
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  margin: 0 0px;
  font-size: 16px;
  font-weight: 500;
  color: #010138;
  text-transform: none;
  letter-spacing: 0;
}

.menu-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
}

.contact-button {
  margin-left: 5px;
  text-transform: none;
  letter-spacing: 0;
}

.menu-icon {
  margin-left: 12px;
}

@media (max-width: 767px) {
  .menu-container {
    display: none;
  }
  .v-navigation-drawer__content {
    margin-top: 20px;
  }
}
</style>
