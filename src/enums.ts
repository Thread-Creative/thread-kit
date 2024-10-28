import {z} from 'zod'

export const FormDocumentTypeEnum = z.enum(['formEntry', 'form'])
export const FormFieldEnum = z.enum([
  'formField',
  'formTextarea',
  'formSelect',
  'formCheckbox',
  'formCheckboxGroup',
  'formRadioButton', //Hidden
  'formRadioButtonGroup',
  'formGroupedCheckbox', //Hidden
  'formGroup',
])
