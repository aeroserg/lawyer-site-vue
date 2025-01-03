<script lang="ts">
import { defineComponent } from 'vue';
// import '/styles.css'
export default defineComponent({
  name: 'App',
});
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style >
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Carlito:wght@400;700&display=swap');

:root {
  --color-primary: #010138; /* Deep blue */
  --color-black: #000000;   /* Black */
  --color-orange: #EB8917;  /* Orange */
  --color-white: #FFFFFF;   /* White */
  --color-light-gray: #696969; /* Light Gray */
  --color-light-purple: #EDEDFB; /* Light Purple */
  
}
.place-bottom img {
  object-position: bottom;
}

ul,
ol {
  padding-left: 1rem; /* Adjust padding value as needed */
  margin: 0; /* Optional: remove default margin */
  list-style-position: inside; /* Optional: ensures bullets or numbers align with text */
}

/* Optional: Specific Styling for List Items */
li {
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
}
body {
  font-family: 'Roboto', sans-serif;
  color: var(--color-black); 
  margin: 0;
  padding: 0;
}
.card-image img {
  object-fit: cover!important ;
  object-position: top;
}
/* Add a utility class for Carlito font usage */
.carlito {
  font-family: 'Carlito', sans-serif;
}

h1 {
  font-family: 'Carlito', sans-serif;
}
</style>
