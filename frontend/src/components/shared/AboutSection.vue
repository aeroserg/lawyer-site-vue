<template>
  <section id="about" style="background-color: var(--color-light-purple); padding: 70px 0;">
    <v-container 
      max-width="1280px"
    >
      <!-- Section Title -->
      <h2 class="section-title">{{ aboutTitle }}</h2>

      <!-- Flex Container for the 3 Sections -->
      <div class="about-flex-container">
        <!-- Main Description -->
        <div class="main-description">
          <div class="text-content" v-html="renderedMainDescription"></div>
          <svg
            v-if="screenWidth > 997"
            width="331"
            height="199"
            viewBox="0 0 331 199"
            fill="none"
            class="my-4"
            xmlns="http://www.w3.org/2000/svg"
          >
        <path opacity="0.85"
         d="M330.638 155.762C331.032 154.73 330.515 153.574 329.483 153.18L312.669 146.754C311.637 146.36 310.481 146.877 310.087 147.909C309.693 148.941 310.21 150.097 311.241 150.491L326.187 156.202L320.476 171.148C320.082 172.18 320.599 173.336 321.63 173.73C322.662 174.125 323.818 173.608 324.212 172.576L330.638 155.762ZM237.565 192.518L237.245 190.544L237.565 192.518ZM259.882 185.844L260.698 187.669L259.882 185.844ZM192.589 195.18L192.906 193.205L192.589 195.18ZM221.288 195.159L220.968 193.185L221.288 195.159ZM84.0947 89.9164L82.1405 90.3421L84.0947 89.9164ZM88.3364 103.47L90.1846 102.705L88.3364 103.47ZM80.3016 72.5047L78.3474 72.9304L80.3016 72.5047ZM210.969 35.4904L212.59 34.3194L210.969 35.4904ZM211.466 36.1788L213.087 35.0078L211.466 36.1788ZM136.222 149.872L136.739 147.94L136.222 149.872ZM65.9433 129.871L66.7617 128.046L65.9433 129.871ZM79.5039 134.692L80.021 132.76L79.5039 134.692ZM23.84 98.0484L25.4546 96.8682L23.84 98.0484ZM22.995 96.8925L24.6097 95.7122L22.995 96.8925ZM3.61204 23.4712L1.63276 23.1841L3.61204 23.4712ZM3.10016 13.0685L1.63276 23.1841L5.59133 23.7583L7.05873 13.6427L3.10016 13.0685ZM7.331 70.7367L10.305 78.1273L14.0158 76.634L11.0418 69.2435L7.331 70.7367ZM21.3804 98.0727L22.2253 99.2286L25.4546 96.8682L24.6097 95.7122L21.3804 98.0727ZM58.8514 128.883L65.1249 131.696L66.7617 128.046L60.4883 125.233L58.8514 128.883ZM78.9868 136.624L135.705 151.804L136.739 147.94L80.021 132.76L78.9868 136.624ZM206.715 126.838L212.769 118.588L209.545 116.222L203.49 124.471L206.715 126.838ZM213.087 35.0078L212.59 34.3194L209.348 36.6614L209.845 37.3498L213.087 35.0078ZM165.177 4.64699L146.924 1.45521L146.235 5.39543L164.488 8.58722L165.177 4.64699ZM78.3474 72.9304L82.1405 90.3421L86.0489 89.4907L82.2557 72.079L78.3474 72.9304ZM86.4882 104.234L101.144 139.674L104.84 138.145L90.1846 102.705L86.4882 104.234ZM169.136 193.435L192.272 197.154L192.906 193.205L169.771 189.485L169.136 193.435ZM221.609 197.133L237.885 194.492L237.245 190.544L220.968 193.185L221.609 197.133ZM260.698 187.669L329.586 156.874L327.953 153.222L259.065 184.018L260.698 187.669ZM237.885 194.492C245.753 193.216 253.421 190.922 260.698 187.669L259.065 184.018C252.105 187.129 244.77 189.323 237.245 190.544L237.885 194.492ZM192.272 197.154C201.989 198.716 211.894 198.709 221.609 197.133L220.968 193.185C211.675 194.692 202.201 194.699 192.906 193.205L192.272 197.154ZM140.771 183.754C149.61 188.564 159.201 191.838 169.136 193.435L169.771 189.485C160.283 187.96 151.124 184.834 142.683 180.241L140.771 183.754ZM101.144 139.674C108.917 158.471 122.905 174.031 140.771 183.754L142.683 180.241C125.622 170.955 112.263 156.096 104.84 138.145L101.144 139.674ZM82.1405 90.3421C83.1754 95.0923 84.6303 99.7412 86.4882 104.234L90.1846 102.705C88.4173 98.4317 87.0333 94.0094 86.0489 89.4907L82.1405 90.3421ZM111.178 6.27202C86.0464 18.1343 72.4319 45.7766 78.3474 72.9304L82.2557 72.079C76.7368 46.7455 89.4386 20.9564 112.886 9.88932L111.178 6.27202ZM146.924 1.45521C134.797 -0.665223 122.311 1.01727 111.178 6.27202L112.886 9.88932C123.272 4.98685 134.921 3.41715 146.235 5.39543L146.924 1.45521ZM212.59 34.3194C201.257 18.6277 184.245 7.98102 165.177 4.64699L164.488 8.58722C182.529 11.7417 198.625 21.8149 209.348 36.6614L212.59 34.3194ZM226.049 68.3225C224.64 56.2939 220.178 44.8255 213.087 35.0078L209.845 37.3498C216.536 46.6145 220.747 57.4367 222.076 68.7876L226.049 68.3225ZM212.769 118.588C223.392 104.114 228.136 86.154 226.049 68.3225L222.076 68.7876C224.046 85.6146 219.568 102.563 209.545 116.222L212.769 118.588ZM149.558 153.985C171.964 155.125 193.441 144.924 206.715 126.838L203.49 124.471C191.013 141.473 170.823 151.062 149.761 149.99L149.558 153.985ZM135.705 151.804C140.233 153.015 144.876 153.747 149.558 153.985L149.761 149.99C145.36 149.766 140.996 149.079 136.739 147.94L135.705 151.804ZM65.1249 131.696C69.6066 133.706 74.2421 135.354 78.9868 136.624L80.021 132.76C75.4825 131.545 71.0486 129.969 66.7617 128.046L65.1249 131.696ZM22.2253 99.2286C31.6524 112.126 44.2752 122.346 58.8514 128.883L60.4883 125.233C46.5458 118.98 34.4718 109.204 25.4546 96.8682L22.2253 99.2286ZM10.305 78.1273C13.155 85.2095 16.8753 91.9095 21.3804 98.0727L24.6097 95.7122C20.3005 89.817 16.7419 83.4083 14.0158 76.634L10.305 78.1273ZM1.63276 23.1841C-0.699276 39.26 1.26676 55.6669 7.331 70.7367L11.0418 69.2435C5.24124 54.8288 3.36067 39.1353 5.59133 23.7583L1.63276 23.1841Z" 
         fill="#010138"/>


          </svg>
        </div>

        <!-- Card Title and Description -->
        <v-card class="card-description">
          <div class="card-text-container">
            <div class="card-title" v-html="renderedCardTitle"></div>
            <div v-html="renderedCardDescription"></div>
          </div>
          <v-img
            v-if="cardPhotoUrl"
            :src="cardPhotoUrl"
            alt="Card Image"
            
            :min-width="screenWidth > 997 ? '100%' : (cardWidthfinal - 75) as number"
            style="display: block; margin: 0 auto;"
          ></v-img>
        </v-card>

        <!-- Expertise Points -->
        <div class="expertise-points">
          <div v-html="renderedExpertise"></div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from "@vue/runtime-core";
import { fetchData } from "../../utils/api";
import { renderRichText } from "../../utils/render-rich-text";

export default defineComponent({
  name: "AboutSection",
  setup() {
    const aboutTitle = ref("О компании");
    const mainDescription = ref([] as Array<any>);
    const cardDescription = ref([] as Array<any>);
    const expertise = ref([] as Array<any>);
    const cardPhotoUrl = ref("");
    const screenWidth = ref(window.innerWidth);
    const cardTitle = ref("");
    const cardWidth = ref(150);

    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", updateScreenWidth);
      fetchAboutData();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScreenWidth);
    });

    const renderedMainDescription = computed(() => renderRichText(mainDescription.value));
    const renderedCardDescription = computed(() => renderRichText(cardDescription.value));
    const renderedExpertise = computed(() => renderRichText(expertise.value));
    const renderedCardTitle = computed(() => cardTitle.value);
    const cardWidthfinal = computed(() => cardWidth.value);
    const fetchAboutData = async () => {
      try {
        const response = await fetchData("about", { populate: "*" });
        if (response.data && response.data.length) {
          const aboutData = response.data[0];
          console.log(aboutData)
          aboutTitle.value = aboutData.title || "О компании";
          mainDescription.value = aboutData.description || [];
          cardDescription.value = aboutData.card_desciption || [];
          expertise.value = aboutData.expertise || [];
          cardTitle.value = aboutData.card_title || "";
          cardPhotoUrl.value = 'http://localhost:1337/' + aboutData.card_photo?.at(0)?.url || "";
          cardWidth.value = aboutData.card_photo.at(0).width || 200;
        }
      } catch (error) {
        console.error("Error fetching about content:", error);
      }
    };

    return {
      aboutTitle,
      mainDescription,
      cardDescription,
      expertise,
      cardPhotoUrl,
      screenWidth,
      renderedMainDescription,
      renderedCardDescription,
      renderedExpertise,
      renderedCardTitle,
      cardWidthfinal
    };
  },
});
</script>

<style scoped>
/* Section Title Styling */
.section-title {
  font-family: var(--font-family-carlito, 'Carlito');
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: justify;
}

/* Flex Container */
.about-flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-direction: column;
}

@media (min-width: 997px) {
  .about-flex-container {
    flex-direction: row;
  }
}

/* Main Description */
.main-description {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-description .text-content {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}


/* Card Description */
.card-description {
  flex: 1;
  background-color: var(--color-white);
  padding: 0.75rem 1rem 2rem 1rem;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  /* justify-items: space-around; */
}

.card-title {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  text-align: left;
  color: var(--color-orange);
  margin-bottom: 1rem;
}

@media (min-width: 997px) {
  .card-description {
    padding: 2rem;
  }
}
@media (max-width: 996.9px) {
  #about {
  padding: 30px 0!important;
}
  .card-description {
    flex-direction: row-reverse;
  }
  .card-title {
    margin-top: 1.5rem;
  }
}
@media (max-width: 767px) {
  .card-description {
    flex-direction: column
  }
}


/* Expertise Points */
.expertise-points {
  flex: 1;
  background-color:transparent;
  padding: 0rem;
}
</style>
