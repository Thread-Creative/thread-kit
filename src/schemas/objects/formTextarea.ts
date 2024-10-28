import {RiTextWrap} from 'react-icons/ri'
import {defineField, defineType} from 'sanity'

import {FormFieldEnum} from '../../enums'
import {formCommon} from '../common'

export default defineType({
  name: FormFieldEnum.enum.formTextarea,
  title: 'Textarea',
  type: 'object',
  icon: RiTextWrap,
  fields: [
    ...formCommon,
    defineField({
      title: 'Text Max length',
      name: 'fieldMaxLength',
      type: 'number',
      description: 'Maximum number of characters users can add',
    }),
    defineField({
      title: 'Field Placeholder',
      name: 'fieldPlaceholder',
      type: 'string',
      description: 'Placeholder text (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'fieldLabel',
    },
    prepare({title}) {
      return {
        title: `Textarea - ${title}`,
      }
    },
  },
})
