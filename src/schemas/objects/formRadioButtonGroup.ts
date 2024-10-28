import {RiListRadio} from 'react-icons/ri'
import {defineField, defineType} from 'sanity'

import {FormFieldEnum} from '../../enums'

export default defineType({
  name: FormFieldEnum.enum.formRadioButtonGroup,
  title: 'Radio Buttons',
  type: 'object',
  icon: RiListRadio,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'fields',
      type: 'array',
      of: [{type: FormFieldEnum.enum.formRadioButton}],
      validation: (Rule) => Rule.required().min(2),
    }),
  ],
})
