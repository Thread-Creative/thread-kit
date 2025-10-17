import React from 'react'
import {Card, Flex, Box, Inline, Heading, Text} from '@sanity/ui'

import type {noteInputProps} from '../types'

const startCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

const NoteInput = React.forwardRef((args: noteInputProps, ref: any) => {
  const {title, description, options} = args.schemaType

  // get last item in args.path array
  const pathId = args.path[args.path?.length - 1] as any as string

  const displayTitle = startCase(pathId) === title ? null : title
  const icon = options?.icon
  const tone = options?.tone ?? 'primary'

  // bail if nothing was set
  if (!displayTitle && !description) return null

  const CustomIcon = icon as React.ElementType

  return (
    <Card ref={ref} padding={[2, 4]} radius={3} tone={tone}>
      {displayTitle && (
        <Box marginBottom={description ? 2 : 0}>
          <Inline space={1}>
            {icon && <CustomIcon />}
            <Heading size={1}>{displayTitle}</Heading>
          </Inline>
        </Box>
      )}

      {description && (
        <Flex align="center">
          <Box style={{flexShrink: 0, lineHeight: 0}}>
            {icon && !displayTitle && <CustomIcon style={{fontSize: 24}} />}
          </Box>
          <Box marginLeft={displayTitle ? 0 : 3} marginTop={!icon && displayTitle ? 1 : 0}>
            <Text size={[1, 1, 1]}>{description}</Text>
          </Box>
        </Flex>
      )}
    </Card>
  )
})

NoteInput.displayName = 'NoteInput'

export default NoteInput
