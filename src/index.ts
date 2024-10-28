import {definePlugin} from 'sanity'
import {z} from 'zod'

import {FormDocumentTypeEnum, FormFieldEnum} from './enums'
import formDocument from './schemas/documents/form'
import formField from './schemas/objects/formField'
import formTextarea from './schemas/objects/formTextarea'
import formSelect from './schemas/objects/formSelect'
import formCheckbox from './schemas/objects/formCheckbox'
import formRadioButton from './schemas/objects/formRadioButton'
import formRadioButtonGroup from './schemas/objects/formRadioButtonGroup'
import formCheckboxGroup from './schemas/objects/formCheckboxGroup'
import formGroup from './schemas/objects/formGroup'
import formModule from './schemas/objects/module/formModule'
import {FormBuilderPluginOptions} from './types'

/* ------------- Character Input, Link Field and helper objects ------------- */
export {CharacterCountInput} from './components/CharacterCountInput'
export {linkField} from './schemas/objects/linkField'
export {defineNote, defineSlug} from './utils'

/* ------------------------ Form Builder Plugin below ----------------------- */

export const FormBuilderPlugin = definePlugin<FormBuilderPluginOptions | void>((props) => {
  const {
    enableModule = false,
    additionalFieldTypes = [],
    additionalSelectPresets = [],
  } = props || {}

  const defaultFieldTypes = [
    {title: 'Text', value: 'text'},
    {title: 'Email', value: 'email'},
    {title: 'Telephone', value: 'tel'},
    {title: 'Number', value: 'number'},
    {title: 'URL', value: 'url'},
    {title: 'Hidden', value: 'hidden'},
  ]
  const defaultSelectPresets = [
    {title: 'Countries', value: 'countries'},
    {title: 'Currencies', value: 'currencies'},
  ]

  const fieldTypes = [...defaultFieldTypes, ...additionalFieldTypes]
  const selectPresets = [...defaultSelectPresets, ...additionalSelectPresets]
  const enabledTypes = enableModule ? [formModule] : []

  return {
    name: 'form-builder',
    schema: {
      types: [
        formDocument,
        formField(fieldTypes),
        formTextarea,
        formSelect(selectPresets),
        formCheckbox,
        formCheckboxGroup,
        formRadioButton,
        formRadioButtonGroup,
        formGroup,
        ...enabledTypes,
      ],
    },
  }
})

export const FormBuilderEnums = {
  documents: FormDocumentTypeEnum.enum,
  fields: FormFieldEnum.enum,
}

export type FormBuilderEnumsType = {
  documents: z.infer<typeof FormDocumentTypeEnum>
  fields: z.infer<typeof FormFieldEnum>
}
