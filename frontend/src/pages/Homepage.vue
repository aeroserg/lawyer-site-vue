<template>
  <MainLayout>
    <MainScreen />
    <AboutSection />
    <ServicesSection />
    <PriceListSection />
    <CasesSection />
    <ContactSection />
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import MainScreen from '../components/shared/MainScreen.vue';
import AboutSection from '../components/shared/AboutSection.vue';
import ServicesSection from '../components/shared/ServicesSection.vue';
import PriceListSection from '../components/shared/PriceList.vue';
import CasesSection from '../components/shared/CasesSection.vue';
import ContactSection from '../components/shared/ContactSection.vue';

export default {
  components: {
    MainLayout,
    MainScreen,
    AboutSection,
    ServicesSection,
    PriceListSection,
    CasesSection,
    ContactSection
  }
}
</script>
