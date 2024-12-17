<template>
  <v-container
    class="responsive-container"
    style="margin-top: 50px; position: relative; padding-bottom: 10px;"
    max-width="1280px"
    
  >
    <v-row>
      <!-- Left vertical line and typography -->
      <v-col cols="1" class="line-container">
        <div class="vertical-line">
          <div class="vertical-text top">Юрист</div>
          <div class="vertical-text bottom">{{ new Date().getFullYear() }}</div>
        </div>
      </v-col>

      <v-col cols="11">
        <v-row justify="center">
          <v-col cols="12" class="stats-container">
            <div class="stats-line">
              <div
                v-for="(stat, index) in parsedStatPairs"
                :key="index"
                class="stat-pair"
              >
                <div class="stat-large">{{ stat.large }}</div>
                <div class="stat-small">{{ stat.small }}</div>
              </div>
            </div>
          </v-col>

          <!-- Title, Description, and Image Layout -->
          <v-col cols="12" class="content-container">
            <div class="content-flex">
              <!-- Title and Description -->
              <div class="text-content">
                <div
                  class="rich-text-content b-h1 mb-8"
                  v-html="renderRichText(mainScreen.title)"
                ></div>
                <div
                  class="rich-text-content"
                  v-html="renderRichText(mainScreen.description)"
                ></div>

                <!-- Contact Button -->
                <v-btn class="contact-button" @click="scrollToForm">
                  Связаться с юристом
                </v-btn>
              </div>

              <!-- Image -->
              <v-img
                v-if="mainScreen"
                :src="mainScreen.photo"
                :alt="mainScreen.photoAlt || 'Main Image'"
                max-width="100%"
                min-width="280px"
                class="content-image mx-auto place-bottom"
              />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { fetchData } from "../../utils/api";
import { renderRichText } from "../../utils/render-rich-text";

interface MainScreenData {
  title: object[];
  stats: object[];
  description: object[];
  photo: string;
  photoAlt: string;
}

interface StatPair {
  large: string;
  small: string;
}

export default defineComponent({
  name: "MainScreen",
  data() {
    return {
      mainScreen: {
        title: [],
        stats: [],
        description: [],
        photo: "",
        photoAlt: "",
      } as MainScreenData,
    };
  },
  computed: {
    parsedStatPairs(): StatPair[] {
      const parsedStats = this.mainScreen.stats.map((stat: any) => {
        const html = renderRichText([stat]);
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
      });

      const statPairs: StatPair[] = [];
      for (let i = 0; i < parsedStats.length; i += 2) {
        statPairs.push({
          large: parsedStats[i] || "",
          small: parsedStats[i + 1] || "",
        });
      }
      return statPairs;
    },
  },
  methods: {
    renderRichText,
    scrollToForm() {
      const formElement = document.querySelector("#contatcs");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth",  block: "center"  });
      }
    },
  },
  async created() {
    try {
      const response = await fetchData("main-screens", { populate: "*" });
      if (response.data && response.data.length > 0) {
        const screenData = response.data[0];

        this.mainScreen = {
          title: screenData.title || [],
          stats: screenData.stats || [],
          description: screenData.description || [],
          photo: screenData.photo?.url || "",
          photoAlt: screenData.photo?.alternativeText || "Main Image",
        };
      }
    } catch (error) {
      console.error("Error fetching main screen data:", error);
    }
  },
});
</script>

<style>
h1 {
  font-size: 80px;
  line-height: 70px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
}
h1.strong {
  font-weight: 900;
}
@media (max-width: 992px) {
  h1 {
    font-size: 50px;
    line-height: 45px;
  }
}
@media screen and (max-width: 550px) {
  h1 {
    font-size: 30px;
    line-height: 30px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
  }

  h1.strong {
    font-weight: 900;
  }
  h2 {
    font-size: 18px;
    line-height: 24px;
  }
}
</style>

<style scoped>
.text-center {
  text-align: center;
}

h1 {
  font-size: 80px;
  line-height: 70px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
}
h1.strong {
  font-weight: 900;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.line-container {
  position: relative;
  min-height: 100%;
}

.vertical-line {
  position: absolute;
  height: 80%;
  width: 2px;
  background-color: var(--color-blue, #010138);
  left: 50%;
  top: 55px;
  transform: translateX(-50%);
}
.responsive-container {
  padding-bottom: 0!important;
}
.vertical-text {
  position: absolute;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-underline-position: from-font;
  text-decoration: none;
  text-decoration-skip-ink: none;
}

.vertical-text.top {
  top: -45px;
  left: -9px;
}

.vertical-text.bottom {
  bottom: -35px;
  left: -9px;
}

.stats-container {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  gap: 20px;
}

.stats-line {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.stat-pair {
  display: flex;
  justify-content: left;
  align-items: flex-end;
  gap: 0;
}

.stat-large {
  font-size: 50px;
  font-family: Carlito, sans-serif;
  font-weight: 400;
  line-height: 50px;
}

.stat-small {
  font-size: 25px;
  font-family: Carlito, sans-serif;
  font-weight: 400;
}

.content-container {
  display: flex;
  flex-direction: column;
}

.content-flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.text-content {
  flex: 1;
  padding: 20px 0;
}

.content-image {
  flex: 1;
  vertical-align: bottom;
}


.contact-button {
  display: inline-block;
  margin-top: 20px;
  padding: 15px 30px;
  background-color: var(--color-orange, #eb8917);
  color: white;
  font-size: 14px;
  border-radius: 8px;
  font-weight: 500;
  height: fit-content;
  text-transform: none;
}

@media (max-width: 1280px) {
  .stat-large {
    font-size: 45px;
  }

  .stat-small {
    font-size: 22px;
  }

  .responsive-container {
    margin-top: 20px!important;
  }
}

@media (max-width: 992px) {
  .stats-container {
    flex-direction: column;
    gap: 15px;
  }

  .stat-pair {
    flex-direction: column;
    align-items: flex-start;
  }

  .stat-large {
    font-size: 40px;
    line-height: 30px;
  }

  .stat-small {
    font-size: 20px;
  }
}
@media (max-width: 767px) {
  .text-content {
    padding: 15px;
  }

  .content-image {
    display: none;
  }


  .contact-button {
    padding: 12px;
    font-size: 12px;
  }
  .responsive-container {
    padding-bottom: 40px!important;
  }
}
@media (max-width: 550px) {
  .content-flex {
    flex-direction: column;
  }

  .stat-large {
    font-size: 22px;
  }
  .stats-line {
    gap: 10px;
  }
  .stat-small {
    font-size: 12px;
  }
}
@media (max-width: 430px) {
  .content-flex {
    flex-direction: column;
  }

  .stat-large {
    font-size: 22px;
  }

  .stat-small {
    font-size: 12px;
  }
}
</style>
