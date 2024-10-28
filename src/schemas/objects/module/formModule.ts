import {RiPencilLine} from 'react-icons/ri'
import {defineField, defineType} from 'sanity'

import {FormDocumentTypeEnum} from '../../../enums'

export default defineType({
  name: 'formModule',
  type: 'object',
  icon: RiPencilLine,
  fields: [
    defineField({
      name: 'form',
      type: 'reference',
      to: [{type: FormDocumentTypeEnum.enum.form}],
    }),
  ],
  preview: {
    select: {
      title: 'form.formTitle',
    },
    prepare: ({title}: {title?: string}) => {
      return {
        title: 'Form',
        subtitle: title,
      }
    },
  },
})
