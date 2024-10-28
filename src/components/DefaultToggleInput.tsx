import {Box, Flex, Switch, Text, Tooltip} from '@sanity/ui'
import {useCallback} from 'react'
import {type ObjectItemProps, PatchEvent, set, useFormValue} from 'sanity'
import {useDocumentPane} from 'sanity/structure'

export interface SelectOption {
  _key: string
  optionDefault?: boolean
  optionValue?: string
}

export function DefaultToggleItem(props: ObjectItemProps<SelectOption>) {
  const {value, path} = props

  // Item props don't have `onChange`, but we can get it from useDocumentPane()
  // This hook is currently marked internal - be aware that this can break in
  // future Studio updates
  const {onChange} = useDocumentPane()

  // Get the parent array to check if any other items are set as default
  const parentPath = path.slice(0, -1)
  const allItems = useFormValue(parentPath) as SelectOption[]

  const handleClick = useCallback(() => {
    const nextValue = !value?.optionDefault
    const clickedFeaturedPath = [...path, 'optionDefault']
    const otherFeaturedPaths = allItems.length
      ? allItems
          ?.filter((p) => p._key !== value?._key && p.optionDefault)
          .map((p) => [...parentPath, {_key: p._key}, 'optionDefault'])
      : []

    // Because onChange came from useDocumentPane
    // we need to wrap it in a PatchEvent
    // and supply the path to the field
    onChange(
      PatchEvent.from([
        // Update this field
        set(nextValue, clickedFeaturedPath),
        // Maybe update other fields
        ...otherFeaturedPaths.map((otherPath) => set(false, otherPath)),
      ]),
    )
  }, [value?.optionDefault, value?._key, path, allItems, onChange, parentPath])

  return (
    <Flex gap={3} paddingRight={2} align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Tooltip
        content={
          <Box padding={2}>
            <Text muted size={1}>
              {`Set as default option`}
            </Text>
          </Box>
        }
        fallbackPlacements={['right', 'left']}
        placement="top"
        portal
      >
        <Switch checked={value?.optionDefault} onClick={handleClick} />
      </Tooltip>
    </Flex>
  )
}
