<template>
  <section id="services" class="services-section">
    <v-container class="services-container">

      <!-- Section Title -->
      <h2 class="section-title">{{ sectionTitle }}</h2>

      <div class="services-slider">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          :class="['service-card', { 'last-card': service.id === services[`${Object.keys(services).at(-1)}`].id }]"
          @mouseover="hoverCard(index)"
          @mouseleave="resetHover"
          @touchstart="hoverCard(index)"
          :style="{
            width: hoveredCard === index ? '325px' : hoveredCard === index - 1 || hoveredCard === index + 1 ? '295px' : '295px',
          }"
        >
          <div
            class="card-background"
            :style="{
              backgroundImage: hoveredCard === index ? `url(${service.photo})` : 'none',
            }"
          >
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">
              {{ hoveredCard === index ? service.fullDescription : service.briefDescription }}
            </p>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { fetchData } from "../../utils/api";

export default defineComponent({
  name: "ServicesSection",
  data() {
    return {
      sectionTitle: "Services",
      services: [] as {
        id: number;
        title: string;
        briefDescription: string;
        fullDescription: string;
        photo: string | null;
      }[],
      hoveredCard: -1,
    };
  },
  methods: {
    hoverCard(index: number) {
      this.hoveredCard = index;
    },
    resetHover() {
      this.hoveredCard = -1;
    },
  },
  async created() {
    try {
      const response = await fetchData("services", {
        populate: {
          service_card: {
            populate: "service_photo",
          },
        },
      });

      if (response.data && response.data.length) {
        this.sectionTitle = response.data[0].section_title || "Services";
        this.services = response.data[0].service_card.map((card: any) => ({
          id: card.id,
          title: card.title || "Untitled",
          briefDescription: card.brief_description?.toUpperCase() || "NO DESCRIPTION AVAILABLE",
          fullDescription: card.full_description || "No detailed description available",
          photo: card.service_photo?.url
            ? `http://admin.copydef.ru${card.service_photo.url}`
            : null,
        }));
      }
    } catch (error) {
      console.error("Error fetching services data:", error);
    }
  },
});
</script>

<style scoped>
/* Services Section */
.services-section {
  background-color: var(--color-white);
  padding: 2rem 0;
}

@media (max-width: 997px) {
  .services-section {
    padding: 1rem;
  }
}

/* Container */
.services-container {
  max-width: 1280px;
}

/* Section Title */
.section-title {
  font-family: 'Carlito', sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 1rem;
  text-align: left;
}

/* Slider Container */
.services-slider {
  display: flex;
  gap: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 1rem;
}

/* Hide Scrollbar */
.services-slider::-webkit-scrollbar {
  display: none;
}

.services-slider {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  scroll-snap-type: x mandatory;
  overflow-y: hidden;
  height: 430px;
}

/* Cards */
.service-card {
  display: flex;
  flex-shrink: 0;
  height: 430px;
  transition: width 0.3s ease, color 0.6s ease;
  border-right: 2px solid var(--color-primary);
}

.service-card.last-card {
  border-right: none; 
}

.card-background {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1rem 0.5rem 1rem;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.3s ease;
}

/* Title Typography */
.service-title {
  font-family: 'Carlito', sans-serif;
  font-size: 70px;
  font-weight: 700;
  color: var(--color-primary);
  text-align: left;
  margin-bottom: 1rem;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

/* Brief Description Typography */
.service-description {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--color-primary);
}

/* Full Description Typography */
.service-card:hover .service-description,
.service-card:hover .service-title {
  color: var(--color-white);
}
.service-card:hover .service-description {
  text-transform: none;
}
@media screen and (max-width: 768px) {
  .services-section {
    padding: 0;
  }
  .section-title {
    font-size: 20px;
    margin-bottom: 1rem;
  }
}
</style>
