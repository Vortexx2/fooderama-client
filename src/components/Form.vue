<script setup>
import { ref } from 'vue'

const props = defineProps({
  fieldsObj: {
    type: Object,
    required: true,
  },
  submitButtonName: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['formSubmitted'])

const formObj = ref(props.fieldsObj)

/**
 * Handler to be called upon submission of the form. Prevents default action and emits a `formSubmitted` event for components higher up in the chain to consume.
 * @param {Event} e the form submit event that occurs
 */
function formSubmit(e) {
  e.preventDefault()
  emit('formSubmitted', formObj.value)

  clearAllValues(formObj.value)
}

/**
 * Clears all `value` subproperties that reside under the main keys
 * @param {Object} obj any object that has object in its field which contains the property `value` in them
 */
function clearAllValues(obj) {
  for (const key in obj) {
    obj[key].value = ''
  }
}

// TODO: Check why this runs everytime any value is changed
/**
 * Determine type of input depending on the type of `value` field that is passed in.
 * @param {Object} obj the field object that has a value field in it. This value field will be used to determine type of input.
 */
function determineFormInputType(obj) {
  console.log(typeof obj.value)
  return typeof obj.value === 'string' ? 'text' : 'checkbox';
}
</script>

<template>
  <form>
    <div
      v-for="(field, index) in Object.keys(formObj)"
      :key="index"
      class="mt-3"
    >
      <label class="mr-3 text-lg" :for="field">{{
        formObj[field].displayField
      }}</label>
      <input
        :type="determineFormInputType(formObj[field])"
        class="bg-transparent text-white border-white border-solid border-2 px-2"
        :id="field"
        v-model="formObj[field].value"
      />
    </div>
    <button class="btn-green mt-4" @click="formSubmit">
      {{ submitButtonName }}
    </button>
  </form>
</template>

<style scoped></style>
