import {RiListCheck3} from 'react-icons/ri'
import {defineField, defineType} from 'sanity'

import {FormFieldEnum} from '../../enums'
import {formCommon} from '../common'

export default defineType({
  name: FormFieldEnum.enum.formCheckboxGroup,
  title: 'Checkbox Group',
  type: 'object',
  icon: RiListCheck3,
  fields: [
    ...formCommon,
    defineField({
      name: 'fields',
      type: 'array',
      of: [{type: FormFieldEnum.enum.formCheckbox, name: FormFieldEnum.enum.formGroupedCheckbox}],
    }),
  ],
})
