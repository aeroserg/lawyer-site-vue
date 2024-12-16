<template>
  <section id="cases">
    <v-container max-width="1280px">
      <h2 
        class="section-title my-8 "
      >
        {{ sectionTitle }}
      </h2>
      <v-row 
        dense
        class="cases-row"
      >
        <v-col
          v-for="caseItem in caseCards"
          :key="caseItem.id"
          cols="12"
          :sm="6"
          :md="4"
          class="case-column"
        >
          <div class="case-divider"></div>
          <v-card style="box-shadow: none;">
            <h3
              class="case-title mb-4"
            >
              {{ caseItem.article_title }}
            </h3>
            <p v-if="caseItem.case_number" class="case-number mb-4">
              {{ caseItem.case_number }}
            </p>
            <div v-html="renderRichText(caseItem.case_description)"></div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { fetchData } from "../../utils/api";
import { renderRichText } from "../../utils/render-rich-text";

interface CaseCard {
  id: number;
  article_title: string;
  case_number: string | null;
  case_description: Array<any>;
}

export default defineComponent({
  name: "CasesSection",
  methods: {
    renderRichText,
  },
  data() {
    return {
      sectionTitle: "",
      caseCards: [] as CaseCard[],
    };
  },
  async created() {
    try {
      const response = await fetchData("case", { populate: "*" });

      const item = Array.isArray(response.data) ? response.data[0] : response.data;

      this.sectionTitle = item.section_title || "Cases";

      this.caseCards = (item.case_card || []).map((c: any) => ({
        id: c.id,
        article_title: c.article_title || "",
        case_number: c.case_number || null,
        case_description: c.case_description || [],
      }));
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  },
});
</script>

<style scoped>
.section-title {
  font-family: Carlito;
  font-weight: 700;
  line-height: 22px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  font-size: 30px;
  margin-bottom: 2rem;
}

@media (max-width: 767px) {
  .section-title {
    font-size: 20px;
  }
  .case-divider {
  width: 100%;
}
}

.case-column {
  margin-bottom: 4rem;
  padding: 1rem;
}

.case-divider {
  height: 3px;
  background-color: var(--color-primary);
  width: 90%;
  margin-bottom: 1rem;
}

.case-title {
  color: var(--color-orange);
  font-family: Carlito;
  font-size: 26px;
  font-weight: 700;
  line-height: 30px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.case-number {
  color: var(--color-primary);
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}


</style>
