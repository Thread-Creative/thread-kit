import { BulbOutlineIcon } from '@sanity/icons'
import { defineField, FieldDefinition } from 'sanity'

type Props = {
  paragraph: string
  lockedSlugs?: readonly string[];
  title?: string
  link?: string
  checkSlug?: boolean
}

export function defineNote(schema: Props): FieldDefinition<'string'> {
  const {title='Note', paragraph, link, checkSlug=false, lockedSlugs} = schema
  return defineField({
    title,
    description: <GlobalNote paragraph={paragraph} href={link} />,
    name: 'myCustomNote',
    type: 'note',
    initialValue: 'module',
    options: {
      icon: BulbOutlineIcon,
      tone: 'caution',
    },
    hidden: ({document}: {document: any}) => !checkSlug ? false : (typeof document?.slug?.current === 'string' ? !lockedSlugs?.includes(document.slug.current) : true),

  })
}

const GlobalNote = ({paragraph, href}: {paragraph?: string; href?: string}) => {
  return (
    <div>
      <p>{paragraph}</p>
      {href && (
        <p>
          To edit the contents of this module <a href={href}>click here</a>
        </p>
      )}
    </div>
  )
}
