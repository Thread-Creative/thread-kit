import {Box, Button, Card, Code, Flex, Stack, Text, TextInput} from '@sanity/ui'
import React, {useCallback} from 'react'
import styled from 'styled-components'

import {ExtendedSlugInputProps} from '../types'
import {usePrefixLogic} from '../utils/usePrefixLogic'
const UrlPrefix = styled(Card)`
  flex: 0 1 min-content;

  pre {
    padding: 1em 0;
  }

  pre,
  code {
    overflow: hidden;
    white-space: nowrap;
    max-width: 30ch;
    text-overflow: ellipsis;
  }

  // When no generate button is available, make it bigger
  &[data-no-generate='true'] {
    pre,
    code {
      max-width: 35ch;
    }
  }
`

/**
 * Custom slug component for better UX & safer slugs:
 * - shows the final URL for the relative address (adds the BASE.PATH/ at the start)
 * - removes special characters and startin/trailing slashes
 */
export default function SlugInput(props: ExtendedSlugInputProps) {
  const {value, schemaType, url} = props
  const baseUrl = url.endsWith('/') ? url : url + '/'

  const {prefix, generateSlug, updateValue, formatSlug} = usePrefixLogic(props)

  const onChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => updateValue(event.currentTarget.value),
    [updateValue],
  )

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement, Element>) => {
      formatSlug(event.currentTarget.value)
      props.elementProps.onBlur(event)
    },
    // eslint-disable-next-line
    [formatSlug, props.elementProps.onBlur],
  )

  return (
    <Stack space={3}>
      <Text size={1}>
        {baseUrl + (prefix == undefined ? '' : prefix)}
        {props.value?.current || ''}
      </Text>
      <Flex style={{gap: '0.5em'}} align="center">
        {prefix && prefix != '/' && (
          <UrlPrefix data-no-generate={!schemaType.options?.source}>
            <Code size={2}>{prefix}</Code>
          </UrlPrefix>
        )}
        <Box flex={3}>
          <TextInput
            value={value?.current || ''}
            readOnly={props.readOnly}
            {...props.elementProps}
            onChange={onChange}
            onBlur={onBlur}
          />
        </Box>
        {schemaType.options?.source && (
          <Button
            mode="ghost"
            type="button"
            disabled={props.readOnly}
            onClick={generateSlug}
            text={'Generate'}
          />
        )}
      </Flex>
    </Stack>
  )
}
