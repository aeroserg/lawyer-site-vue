<template>
  <v-footer
    class="pa-4"
    style="background-color: var(--color-primary); color: white"
  >
    <v-container class="main-container" max-width="1280px">
      <!-- Logo Section -->
      <div class="logo-container">
        <v-img src="/logo_w.svg" alt="Logo" max-width="185px"></v-img>
      </div>
      <div class="info-containers">
        <!-- Email Section -->
        <div class="info-container">
          <v-img
            src="/email_icon.svg"
            alt="Email Icon"
            max-width="80px"
            class="icon-footer"
          ></v-img>
          <h3 class="info-title">Email</h3>
          <a :href="`mailto:${email}`" class="info-link">{{ email }}</a>
        </div>

        <!-- Phone Section -->
        <div class="info-container">
          <v-img
            src="/phone_icon.svg"
            alt="Phone Icon"
            max-width="80px"
            class="icon-footer"
          ></v-img>
          <h3 class="info-title">Телефон</h3>
          <a :href="`tel:${phone}`" class="info-link">{{ phone }}</a>
        </div>

        <!-- Address Section -->
        <div class="info-container">
          <v-img
            src="/map_icon.svg"
            alt="Map Icon"
            max-width="80px"
            class="icon-footer"
          ></v-img>
          <h3 class="info-title">Адрес</h3>
          <p class="info-link">{{ address }}</p>
        </div>
      </div>

      <!-- Menu Section -->
      <div class="menu-container">
        <ul>
          <li v-for="menuItem in menu" :key="menuItem.id">
            <a
              :href="menuItem.link"
              :target="menuItem.is_external ? '_blank' : '_self'"
              class="menu-link"
            >
              {{ menuItem.section_name }}
            </a>
          </li>
        </ul>
      </div>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchData } from "../../utils/api";

export interface MenuItem {
  id: number;
  section_name: string;
  link: string;
  is_external: boolean;
}

export default defineComponent({
  name: "Footer",
  setup() {
    const email = ref("");
    const phone = ref("");
    const address = ref("");
    const menu = ref(<MenuItem[]>[]);

    onMounted(async () => {
      try {
        // Fetch contacts data
        const contactResponse = await fetchData("kontakties");
        const contactData = contactResponse.data[0];
        email.value = contactData.email;
        phone.value = contactData.phone;
        address.value = contactData.address;

        // Fetch menu data
        const menuResponse = await fetchData("menu");
        menu.value = menuResponse.data.menu_json.menu;
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    });

    return {
      email,
      phone,
      address,
      menu,
    };
  },
});
</script>

<style scoped>
.main-container {
  display: flex;

  flex-direction: row;
  gap: 2rem;
  padding: 2rem 0;
  justify-content: space-between;
  /* align-items: center; */
}
.info-containers {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
}

@media (max-width: 997px) {
  .main-container {
    flex-direction: column;
  }
  .info-containers {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
  .logo-container {
    width: 100%!important;
  }
  .info-title {
    font-size: 20px!important;
    line-height: 22px;
  }
  .info-link {
    font-size: 16px;
    line-height: 18px;
  }
  .menu-container ul {
    align-items: center!important;
  }
}
@media screen and (max-width: 550px) {
  .info-containers {
    flex-direction: column;
  }
  .icon-footer {
    min-width: 40px!important;
    min-height: 40px!important;
  }
  .main-container {
    gap: 1.25rem;
    flex-direction: column-reverse;
  }
  .info-containers {
    gap: 0.75rem;
  }
}

.logo-container img {
  width: 185px;
}
.logo-container {
  width: 100%;
  display: flex;
  justify-content: center;

  align-items: center;
}

.icon-footer {
  min-height: 80px;
  min-width: 80px;
}
.info-container,
.logo-container {
  width: 200px;
}
.info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.info-title {
  color: var(--color-orange);
  font-family: Carlito;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.info-link {
  color: var(--color-white);
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  text-decoration: none;
}

.menu-container ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.menu-link {
  color: var(--color-white);
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  text-transform: uppercase;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  text-decoration: none;
}
</style>
