import {RiRadioButtonFill} from 'react-icons/ri'
import {defineField, defineType} from 'sanity'

import {FormFieldEnum} from '../../enums'
import {formCommon} from '../common'

export default defineType({
  name: FormFieldEnum.enum.formRadioButton,
  title: 'Radio Button',
  type: 'object',
  icon: RiRadioButtonFill,
  fields: [
    ...formCommon,
    defineField({
      title: 'Value',
      name: 'value',
      type: 'string',
      description: 'The value this radio button represents',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Field Error Message',
      name: 'fieldErrorMessage',
      type: 'string',
      description: 'Default error message if validation fails e.g. This field is required',
      hidden: ({parent}: {parent: {required: boolean}}) => parent && !parent.required,
    }),
    defineField({
      title: 'Default checked',
      name: 'checkedDefault',
      description: 'Set this to be the initially checked',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'fieldLabel',
      options: 'options',
    },
    prepare({title}) {
      return {
        title: title as string,
      }
    },
  },
})
