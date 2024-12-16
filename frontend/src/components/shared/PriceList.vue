<template>
  <section id="price-list" class="price-list-section">
    <v-container 
      max-width="1280px"
      fluid
      class="price-list-container"
    >
      <!-- Section Title -->
      <h2 class="section-title">{{ sectionTitle }}</h2>

      <div class="price-list-flex-container">
        <!-- Service Type List -->
        <div class="service-type-list">
          <div
            v-for="(card, index) in priceListCards"
            :key="card.id"
            :class="['service-type-item', { active: selectedIndex === index }]"
           
          >
          <div
        class="item-content"
        @click="selectedIndex = selectedIndex === index ? null : index"
      >
        <div class="active-indicator" v-if="selectedIndex === index">
                <svg
                  width="13"
                  height="20"
                  viewBox="0 0 13 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.025 20L0.25 18.225L8.475 10L0.25 1.775L2.025 0L12.025 10L2.025 20Z"
                    fill="#010138"
                  />
                </svg>
              </div>
              <span>{{ card.service_type }}</span>
            </div>

            <!-- Service Price Cards for smaller screens -->
            <div
              v-if="selectedIndex === index && isMobile"
              class="service-price-container"
            >
              <div class="service-price-list">
                <div
                  v-for="(service, sIndex) in priceListCards[index].service_price_card"
                  :key="service.id"
                  class="service-price-card"
                >
                  <div class="service-card-flex-container">
                    <!-- Left Container -->
                    <div class="service-card-left">
                      <h3 class="service-title">{{ service.service_title }}</h3>
                      <p class="service-inscription" v-if="service.service_card_inscription">
                        {{ service.service_card_inscription }}
                      </p>
                    </div>

                    <!-- Details Section -->
                    <div v-if="showDetails[sIndex]" class="details-container">
                      <div
                        v-for="(detail, dIndex) in service.service_card_details"
                        :key="dIndex"
                        v-html="renderRichText([detail])"
                      ></div>
                    </div>

                    <!-- Right Container -->
                    <div class="service-card-right">
                      <span class="service-price" v-if="service.service_card_price">{{ service.service_card_price }}</span>
                      <v-btn
                      
                        v-if="service.service_card_details && service.service_card_details.length > 0"
                        variant="text"
                        class="details-button"
                        @click="toggleDetails(sIndex)"
                      >
                        {{ showDetails[sIndex] ? 'Скрыть' : 'Подробнее' }}
                        <svg
                          width="10"
                          height="7"
                          viewBox="0 0 10 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            :d="showDetails[sIndex] 
                              ? 'M10 5.9875L9.1125 6.875L5 2.7625L0.8875 6.875L0 5.9875L5 0.9875L10 5.9875Z'
                              : 'M10 1.0125L9.1125 0.125L5 4.2375L0.8875 0.125L0 1.0125L5 6.0125L10 1.0125Z'"
                            fill="#525252"
                          />
                        </svg>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Price Cards for larger screens -->
        <div class="service-price-container" v-if="selectedIndex !== null && !isMobile">
          <div class="service-price-list">
            <div
              v-for="(service, sIndex) in priceListCards[selectedIndex].service_price_card"
              :key="service.id"
              class="service-price-card"
            >
              <div class="service-card-flex-container">
                <!-- Left Container -->
                <div class="service-card-left">
                  <h3 class="service-title">{{ service.service_title }}</h3>
                  <p class="service-inscription" v-if="service.service_card_inscription">
                    {{ service.service_card_inscription }}
                  </p>
                </div>

                <!-- Details Section -->
                <div v-if="showDetails[sIndex]" class="details-container">
                  <div
                    v-for="(detail, dIndex) in service.service_card_details"
                    :key="dIndex"
                    v-html="renderRichText([detail])"
                  ></div>
                </div>

                <!-- Right Container -->
                <div class="service-card-right">
                  <span class="service-price" v-if="service.service_card_price">{{ service.service_card_price }}</span>
                  <v-btn
                    v-if="service.service_card_details && service.service_card_details.length > 0"
                    variant="text"
                    class="details-button"
                    @click="toggleDetails(sIndex)"
                  >
                    {{ showDetails[sIndex] ? 'Скрыть' : 'Подробнее' }}
                    <svg
                      width="10"
                      height="7"
                      viewBox="0 0 10 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        :d="showDetails[sIndex] 
                          ? 'M10 5.9875L9.1125 6.875L5 2.7625L0.8875 6.875L0 5.9875L5 0.9875L10 5.9875Z'
                          : 'M10 1.0125L9.1125 0.125L5 4.2375L0.8875 0.125L0 1.0125L5 6.0125L10 1.0125Z'"
                        fill="#525252"
                      />
                    </svg>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchData } from "../../utils/api";
import { renderRichText } from "../../utils/render-rich-text";

interface ServicePriceCard {
  id: number;
  service_title: string;
  service_card_inscription: string;
  service_card_price: string;
  service_card_details: Array<any> | null;
}

interface PriceListCard {
  id: number;
  service_type: string;
  service_price_card: ServicePriceCard[];
}

export default defineComponent({
  name: "PriceListSection",
  data() {
    return {
      sectionTitle: "Прайс-лист",
      priceListCards: [] as PriceListCard[],
      selectedIndex: null as number | null,
      showDetails: [] as boolean[],
      isMobile: window.innerWidth <= 997,
    };
  },
  async created() {
    try {
      const response = await fetchData('price-list', {
        populate: {
          price_list_card: {
            populate: {
              service_price_card: {
                populate: "*",
              },
            },
          },
        },
      });

      const item = Array.isArray(response.data) ? response.data[0] : response.data;
      this.sectionTitle = item.title || "Прайс-лист";
      const cards = item.price_list_card || [];

      this.priceListCards = cards.map((c: any) => ({
        id: c.id,
        service_type: c.service_type || '',
        service_price_card: (c.service_price_card || []).map((spc: any) => ({
          id: spc.id,
          service_title: spc.service_title || '',
          service_card_inscription: spc.service_card_inscription || '',
          service_card_price: spc.service_card_price || '',
          service_card_details: spc.service_card_details || null,
        })),
      }));

      if (this.priceListCards.length > 0) {
        this.selectedIndex = 0;
        this.showDetails = new Array(this.priceListCards[0].service_price_card.length).fill(false);
      }

      window.addEventListener("resize", this.checkScreenSize);
    } catch (error) {
      console.error("Error fetching price list data:", error);
    }
  },
  methods: {
    toggleDetails(index: number) {
      this.showDetails[index] = !this.showDetails[index];
    },
    renderRichText,
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 997;
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
});
</script>

<style scoped>
.price-list-section {
  background-color: var(--color-light-purple);
  padding: 2rem;
}

.section-title {
  font-family: Carlito, sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 2rem;
}

.price-list-flex-container {
  display: flex;
  gap: 2rem;
}

.service-type-list {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.service-type-item {
  display: flex;
  align-items: center;
  padding: 2rem;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: var(--color-primary);
  transition: all 0.3s ease;

}

.service-type-item .item-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.service-type-item.active {
  background-color: var(--color-white);
}

.active-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-price-container {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.service-price-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
}

.service-price-card {
  background-color: var(--color-white);
  padding: 10px;
  width: calc(50% - 1.5rem);
  min-height: 120px;
}

.service-card-flex-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 100px;
  justify-content: space-evenly;
}

.service-title {
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: var(--color-primary);
}

.service-inscription {
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--color-light-gray);
}

.service-card-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.service-price {
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: var(--color-primary);
}

.details-button {
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: none;
  cursor: pointer;
}

.details-container {
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--color-primary);
}

/* Responsive Styles */
@media (max-width: 997px) {
  .price-list-flex-container {
    flex-direction: column;
    gap: 1rem;
  }

  .service-type-list {
    width: 100%;
  }

  .service-type-item {
    padding: 1.5rem;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
  }

  .service-price-container {
    width: 100%;
  }

  .service-price-list {
    flex-direction: column;
  }

  .service-type-item.active .item-content {
    margin-bottom: 2rem;
  }
  .service-type-item.active {
  background-color: var(--color-light-purple);
  }
  .service-price-card {
    width: 100%;
    min-height: 120px;
  }
}
@media screen and (max-width: 768px) {
  .price-list-section {
    padding: 0;
  }
  .section-title {
    font-size: 20px;
    margin-bottom: 1rem;
  }
  .service-type-item {
    padding: 10px 0;
  }
  .service-type-item.active .item-content {
        margin-bottom: 1rem;
    }
  .service-price-card {
    min-height: 0;
    /* font-size: smaller!important; */
  }
}
</style>
