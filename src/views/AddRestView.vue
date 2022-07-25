<template>
  <div>
    <div id="title" class="ml-4">
      <h1 class="text-3xl">Add Restaurant</h1>
    </div>
    <form class="ml-6 mt-3">
      <div v-for="(field, index) in Object.keys(formObj)" :key="index" class="mt-2">
        <label
          class="mr-3"
          :for="field"
          >{{ formObj[field as keyof typeof formObj].displayField }}</label
        >
        <input
          type="text"
          class="bg-transparent text-white border-white border-solid border-2 px-2"
          :id="field"
          v-model="formObj[field as keyof typeof formObj].value"
        />
      </div>
      <button class="bg-lime-500 px-2 mt-4 text-black">Create</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

/* will map fields to properties the field should have like value, required etc. */
const formObj = ref({
  restName: {
    value: '',
    required: true,
    displayField: 'Restaurant Name',
  },
  description: {
    value: '',
    required: false,
    displayField: 'Description',
  },
  openingTime: {
    value: '',
    required: false,
    displayField: 'Opening Time',
  },
  closingTime: {
    value: '',
    required: false,
    displayField: 'Closing Time',
  },
});

const formObjArr = computed(() => {
  const res = Object.keys(formObj.value).map((key, index) => {
    return [key, formObj.value[key as keyof typeof formObj.value]];
  });
  console.log(res);
  return res;
});
</script>
