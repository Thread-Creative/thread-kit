import {Box, Flex, Stack, Text} from '@sanity/ui'
import {
  type FieldMember,
  FormFieldValidationStatus,
  ObjectInputMember,
  ObjectInputProps,
} from 'sanity'
import styled from 'styled-components'

import {LinkValue} from '../types'

const ValidationErrorWrapper = styled(Box)`
  contain: size;
  margin-bottom: 6px;
  margin-left: auto;
  margin-right: 12px;
`

const FullWidthStack = styled(Stack)`
  width: 100%;
`

/**
 * Custom input component for the link object.
 * Nicely renders the type and link fields next to each other, with the
 * description and any validation errors for the link field below them.
 *
 * The rest of the fields ("blank" and "advanced") are rendered as usual.
 */
export function LinkInput(props: ObjectInputProps<LinkValue>) {
  const [textField, typeField, linkField, ...otherFields] = props.members as FieldMember[]

  const {
    field: {
      validation: linkFieldValidation,
      schemaType: {description: linkFieldDescription},
    },
  } = linkField

  const description = linkFieldDescription

  const renderProps = {
    renderAnnotation: props.renderAnnotation,
    renderBlock: props.renderBlock,
    renderField: props.renderField,
    renderInlineBlock: props.renderInlineBlock,
    renderInput: props.renderInput,
    renderItem: props.renderItem,
    renderPreview: props.renderPreview,
  }

  return (
    <Stack space={4}>
      <ObjectInputMember
        member={{
          ...textField,
          field: {
            ...textField.field,
            schemaType: {
              ...textField.field.schemaType,
              title: textField.field.schemaType.title,
            },
          },
        }}
        {...renderProps}
      />

      <Stack space={3}>
        <Text as="label" weight="medium" size={1}>
          Link
        </Text>

        {/* Render any validation errors for the link field */}
        {linkFieldValidation.length > 0 && (
          <ValidationErrorWrapper>
            <FormFieldValidationStatus
              fontSize={1}
              placement="top-start"
              validation={linkFieldValidation}
            />
          </ValidationErrorWrapper>
        )}

        <Flex gap={2} align="center">
          {/* Render the type field (without its label) */}
          <ObjectInputMember
            member={{
              ...typeField,
              field: {
                ...typeField.field,
                schemaType: {
                  ...typeField.field.schemaType,
                  title: undefined,
                },
              },
            }}
            {...renderProps}
          />

          <FullWidthStack space={2}>
            {/* Render the input for the selected type of link (withouts its label) */}
            <ObjectInputMember
              member={{
                ...linkField,
                field: {
                  ...linkField.field,
                  schemaType: {
                    ...linkField.field.schemaType,
                    title: undefined,
                  },
                },
              }}
              {...renderProps}
            />
          </FullWidthStack>
        </Flex>
        

        {/* Render the description of the selected link field, if any */}
        {description && (
          <Text muted size={1}>
            {description}
          </Text>
        )}
      </Stack>

      {/* Render the rest of the fields as usual */}
      {otherFields.map((field) => (
        <ObjectInputMember key={field.key} member={field} {...renderProps} />
      ))}
    </Stack>
  )
}
