<script setup>
import { ref, reactive, computed } from 'vue';
import axios from 'axios';

import config from '@/config';
import { restaurantFormFields } from '../../constants/rest.const';

/* will map fields to properties the field should have like value, required etc. */
const formObj = ref(restaurantFormFields());

const API_URL = config.BASE_API_URL + '/restaurants';

function clearAllValues(obj) {
  for (const key in obj) {
    obj[key].value = '';
  }
}

/**
 *
 * @param {Event} e
 */
function addRestaurant(e) {
  e.preventDefault();

  const bodyObj = {};

  Object.keys(formObj.value).map(field => {
    if (formObj.value[field].value !== '')
      bodyObj[field] = formObj.value[field].value;
  });

  axios
    .post(API_URL, bodyObj)
    .then(res => {
      clearAllValues(formObj.value);
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
}
</script>

<template>
  <div>
    <div id="title" class="ml-4">
      <h1 class="text-3xl">Add Restaurant</h1>
    </div>
    <form class="ml-6 mt-3">
      <div
        v-for="(field, index) in Object.keys(formObj)"
        :key="index"
        class="mt-2"
      >
        <label class="mr-3" :for="field">{{
          formObj[field].displayField
        }}</label>
        <input
          type="text"
          class="bg-transparent text-white border-white border-solid border-2 px-2"
          :id="field"
          v-model="formObj[field].value"
        />
      </div>
      <button class="bg-lime-500 px-2 mt-4 text-black" @click="addRestaurant">
        Create
      </button>
    </form>
  </div>
</template>
