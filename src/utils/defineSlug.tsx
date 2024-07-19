import {defineField, FieldDefinition} from 'sanity'
import {SlugParams} from '../types'
import SlugInput from '../components/SlugInput'

export function defineSlug(schema: SlugParams = {name: 'slug'}): FieldDefinition<'slug'> {
  const slugOptions = schema?.options
  const folder = slugOptions?.folder?.startsWith('/')
    ? slugOptions.folder
    : '/' + slugOptions?.folder

  return defineField({
    ...schema,
    name: schema.name ?? 'slug',
    title: schema?.title ?? 'URL',
    type: 'slug',
    components: {
      ...schema.components,
      input: (props) =>
        SlugInput({
          ...props,
          url: slugOptions?.url || '',
          folder,
        }),
    },
    options: {
      ...(slugOptions ?? {}),
      maxLength: 200,
      source: 'name',
    },
    readOnly: slugOptions?.locked,
    validation: (R) => R.required(),
  })
}
