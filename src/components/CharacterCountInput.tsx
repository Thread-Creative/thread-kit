import {Stack} from '@sanity/ui'
import {StringInputProps, StringOptions, StringSchemaType} from 'sanity'

interface ExtendedStringSchemaType extends StringSchemaType {
  options?: StringOptions & {
    maxLength?: number
  }
}

type Props = StringInputProps<ExtendedStringSchemaType>

export function CharacterCountInput(props: Props) {
  //const maxLength = props.schemaType.options?.maxLength || 160
  const maxLength =
    (props?.schemaType?.validation as any[])?.[0]?._rules?.find((item: any) => item.flag === 'max')
      ?.constraint ?? 160

  return (
    <Stack space={3}>
      <div>
        <div
          style={{
            display: 'inline-block',
            padding: '0.15rem',
            paddingLeft: '0.25rem',
            paddingRight: '0.25rem',
            borderRadius: '.2rem',
            fontSize: '0.75rem',
            border: `${props.value?.length && props.value?.length > maxLength ? '1px solid #f76d5f' : '1px solid'}`,
          }}
        >
          {props.value?.length ? props.value.length : '0'}/{maxLength}
        </div>
      </div>

      {props.renderDefault(props)}
    </Stack>
  )
}
