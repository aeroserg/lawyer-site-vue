<template>
  <section id="contact">
    <v-container max-width="1280px">
      <h2 class="section-title">{{ sectionTitle }}</h2>
      <v-row dense class="contact-container">
        <v-col
          v-if="mapIframe && mapIframe.includes('<iframe')"
          :cols="12"
          :sm="6"
          :md="8"
          class="map-column"
        >
          <div v-html="mapIframe" class="map-iframe"></div>
        </v-col>
        <v-col :cols="12" :sm="6" :md="4" class="form-column">
          <div>
            <h3 id="contatcs" class="contacts-title">{{ contactsTitle }}</h3>
            <p class="contact-item">
              <strong>Телефон: </strong>
              <a :href="`tel:${phone}`" class="contact-link">{{ phone }}</a>
            </p>
            <p class="contact-item">
              <strong>Email: </strong>
              <a :href="`mailto:${email}`" class="contact-link">{{ email }}</a>
            </p>
          </div>
          <h3 class="contacts-title mt-4 mb-0"> Свяжитесь со мной</h3>
          <form @submit.prevent="handleSubmit" class="feedback-form">
            <input
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="Имя"
              required
            />

            <input
              v-model="formData.phone"
              type="text"
              class="form-input"
              placeholder="Телефон"
              required
            />

            <input
              v-model="formData.email"
              type="email"
              class="form-input"
              placeholder="Email"
              required
            />

            <textarea
              v-model="formData.problem"
              class="form-input problem-textarea"
              placeholder="Опишите вашу проблему"
              required
            ></textarea>

            <button
              type="submit"
              class="submit-button"
            >
              Оставить заявку
            </button>
          </form>
        </v-col>
      </v-row>
      <v-snackbar v-model="toast.visible" :color="toast.color" timeout="4000" top>
        {{ toast.message }}
      </v-snackbar>
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { fetchData } from '../../utils/api';
import axios from 'axios';
import { environment } from '../../environment/environment';

export default defineComponent({
  name: 'ContactSection',
  data() {
    return {
      sectionTitle: '',
      contactsTitle: '',
      mapIframe: '',
      email: '',
      phone: '',
      toast: {
        visible: false,
        timeout: 6000,
        position: 'top',
        message: '',
        color: '',
      },
      formData: {
        name: '',
        phone: '',
        email: '',
        problem: '',
      },
    };
  },
  async created() {
    try {
      const response = await fetchData('kontakties');
      const data = response.data[0];
      this.sectionTitle = data.section_title || 'Контакты';
      this.contactsTitle = data.contacts_title || 'Контакты';
      this.mapIframe = data.map_iframe || '';
      this.email = data.email || '';
      this.phone = data.phone || '';
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const emailContent = `
          <h1>Новая заявка</h1>
          <p><strong>Имя:</strong> ${this.formData.name}</p>
          <p><strong>Телефон:</strong> ${this.formData.phone}</p>
          <p><strong>Email:</strong> ${this.formData.email}</p>
          <p><strong>Описание проблемы:</strong></p>
          <p>${this.formData.problem}</p>
        `;

        await axios.post(`${environment.strapiUrl}/api/email/`, {
          to: environment.email || 'A1308267@ya.ru',
          subject: 'Новая заявка с сайта',
          text: 'Новая заявка с сайта',
          html: emailContent,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.toast = {
          visible: true,
          message: 'Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.',
          color: 'green',
          position: 'top',
        };

        this.formData = { name: '', phone: '', email: '', problem: '' };
      } catch (error) {
        console.error('Error sending email:', error);
        this.toast = {
          visible: true,
          message: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже. Вы можете попробовать отправить заявку по телефону или на почту.',
          color: 'red',
        };
      }
    },
  },
});
</script>

<style scoped>
#contact {
  background-color: var(--color-light-purple);
}

.section-title {
  font-family: Carlito;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  margin: 6rem 0 2rem 0;
  text-align: left;
}

.contact-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.map-column {
  border-radius: 0.5rem;
  overflow: hidden;
  padding-right: 2rem;
}
.form-column {
  padding-left: 2rem;
}

.map-iframe iframe {
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  max-height: 550px;
}

.contacts-title {
  font-family: Carlito;
  font-size: 26px;
  font-weight: 700;
  line-height: 30px;
  margin-bottom: 1rem;
}

.contact-item strong {
  color: var(--color-primary);
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
}

.contact-item .contact-link {
  color: var(--color-primary);
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-decoration: none;
}

.contact-item .contact-link:hover {
  text-decoration: underline;
}

.feedback-form {
  max-width: 450px;
  margin: 0 auto;
  width: 100%;
  margin-top: 2rem;
}

.form-input {
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 14px;
  border: 1px solid var(--color-light-gray);
  width: 100%;
  margin-bottom: 1rem;
  background-color: var(--color-white);
}

.problem-textarea {
  height: 100px;
}

.submit-button {
  background-color: var(--color-orange);
  color: var(--color-white);
  font-size: 14px;
  border-radius: 0.5rem;
  text-align: center;
  width: 100%;
  padding: 1rem;
  border: none;
}

@media screen and (max-width: 768px) {
  .map-column {
    min-width: 100%;
    padding-right: 0;
  }
  .form-column {
    padding-left: 0;
    min-width: 100%;
  }
  .section-title {
    margin: 0 0 2rem 0;
  }

}
</style>
