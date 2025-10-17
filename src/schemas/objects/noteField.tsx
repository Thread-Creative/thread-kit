import {definePlugin, defineType} from 'sanity'
import NoteInput from '../../components/NoteInput'

export const noteField = definePlugin(() => {
  return {
    name: 'notefield',
    schema: {
      types: [
        defineType({
          title: 'Note',
          name: 'note',
          type: 'string',
          components: {input: NoteInput, field: (props) => <>{props.children}</>},
        }),
      ],
    },
  }
})
