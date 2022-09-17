<script setup>
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'

import { restaurantSchema } from '../../constants/restaurant.schema'

import AlertComponent from '../utils/AlertComponent.vue'

// Imports above

const props = defineProps({
  fieldsObj: {
    type: Array,
    default: () => {
      return []
    },
  },
  submitButtonName: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['formSubmitted'])

/**
 * Handler to be called upon submission of the form. Prevents default action and emits a `formSubmitted` event for components higher up in the chain to consume.
 * @param {Event} e the form submit event that occurs
 */
function formSubmit(formObj, { resetForm }) {
  resetForm()
  emit('formSubmitted', formObj)
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
</script>

<template>
  <Form
    @submit="formSubmit"
    :validation-schema="restaurantSchema"
    v-slot="{ errors }">
    <!-- Main Labels and Fields -->
    <div v-for="(field, index) of fieldsObj" :key="index">
      <!-- Loop with label-field pair -->
      <div class="flex my-2">
        <label :for="field.name" class="label label-text mr-3">
          {{ field.field }}

          <!-- * if field is required -->
          <p v-if="field.required">*</p>
        </label>

        <!-- Input field -->
        <Field
          :name="field.name"
          :type="field.type"
          :id="field.name"
          class="input input-bordered input-sm w-full max-w-xs inline-block" />
      </div>

      <!-- Alert for each particular input field -->
      <AlertComponent
        v-if="errors[field.name]"
        class="alert-error py-2 rounded-md">
        <template #message>
          <p class="text-md">{{ errors[field.name] }}</p>
        </template>
      </AlertComponent>
    </div>

    <!-- Submit button -->
    <div class="">
      <input
        type="submit"
        :value="submitButtonName"
        class="btn btn-accent btn-sm" />
    </div>
  </Form>
</template>

<style scoped></style>
