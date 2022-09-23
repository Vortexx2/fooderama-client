<script setup>
import { Form, Field, FieldArray } from 'vee-validate'

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
  schema: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['formSubmitted'])

/**
 * Handler to be called upon submission of the form. Resets the form and emits a `formSubmitted` event for components higher up in the chain to consume.
 * @param {Event} e the form submit event that occurs
 */
function formSubmit(formObj, { resetForm }) {
  resetForm()
  emit('formSubmitted', formObj)
}
</script>

<template>
  <Form @submit="formSubmit" :validation-schema="schema" v-slot="{ errors }">
    <!-- Main Labels and Fields -->
    <div v-for="field of fieldsObj" :key="field.name">
      <!-- Loop with label-field pair -->
      <div class="flex my-2" v-if="field.type === 'text'">
        <label :for="field.name" class="label label-text mr-3">
          {{ field.field }}

          <!-- * if field is required -->
          <p v-if="field.required">*</p>
        </label>

        <!-- Input field -->
        <Field
          :name="field.name"
          type="text"
          :id="field.name"
          class="input input-bordered input-sm w-full max-w-xs inline-block" />
      </div>

      <div class="my-2" v-if="field.type === 'multiselect'">
        <div class="overflow-x-auto overflow-y-scroll max-h-96 w-fit">
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th v-for="heading of field.fieldHeadings" :key="heading">
                  {{ heading }}
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Table entry for each row -->
              <tr
                v-for="entry in field.options"
                :key="entry[field.idReference]">
                <!-- Checkbox -->
                <th>
                  <label>
                    <Field
                      :name="field.name"
                      :unchecked-value="false"
                      :value="entry[field.idReference]"
                      type="checkbox"
                      class="checkbox" />
                  </label>
                </th>

                <!-- Get corresponding values in the row other than the checkbox -->
                <th v-for="(heading, idx) of field.fieldHeadings" :key="idx">
                  {{ entry[heading] }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
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

    <!-- The alert that will be shown if an error is received from the server -->
    <slot name="networkErrorAlert"></slot>

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
