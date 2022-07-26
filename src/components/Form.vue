<script setup>
import { ref } from 'vue';

const props = defineProps({
  fieldsObj: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['formSubmitted']);

const formObj = ref(props.fieldsObj);

/**
 *
 * @param {Event} e
 */
function formSubmit(e) {
  e.preventDefault();
  emit('formSubmitted', formObj.value);

  clearAllValues(formObj.value);
}

function clearAllValues(obj) {
  for (const key in obj) {
    obj[key].value = '';
  }
}
</script>

<template>
  <form>
    <div
      v-for="(field, index) in Object.keys(formObj)"
      :key="index"
      class="mt-2"
    >
      <label class="mr-3" :for="field">{{ formObj[field].displayField }}</label>
      <input
        type="text"
        class="bg-transparent text-white border-white border-solid border-2 px-2"
        :id="field"
        v-model="formObj[field].value"
      />
    </div>
    <button class="btn-green mt-4" @click="formSubmit">Create</button>
  </form>
</template>

<style scoped></style>
