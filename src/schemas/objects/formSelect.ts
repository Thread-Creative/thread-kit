import {RiCheckLine, RiNavigationLine, RiStarFill} from 'react-icons/ri'
import {defineArrayMember, defineField, defineType, isKeyedObject} from 'sanity'

import {DefaultToggleItem} from '../../components/DefaultToggleInput'
import {FormFieldEnum} from '../../enums'
import {formCommon} from '../common'

export interface SelectOption {
  _key: string
  optionDefault?: boolean
  optionValue?: string
}

export default (selectPresetOptions: Array<{title: string; value: string}>) =>
  defineType({
    name: FormFieldEnum.enum.formSelect,
    title: 'Select/Dropdown',
    type: 'object',
    icon: RiNavigationLine,
    fields: [
      ...formCommon,
      defineField({
        name: 'selectPreset',
        title: 'Options Preset',
        description: 'Use preset options such for the select. i.e. Countries',
        type: 'string',
        options: {
          layout: 'dropdown',
          list: selectPresetOptions,
        },
      }),
      defineField({
        name: 'options',
        title: 'Options',
        description:
          'List of options for dropdown. NOTE: only one value can be set as default/initial value',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            name: 'selectOption',
            icon: RiCheckLine,
            components: {item: DefaultToggleItem},
            fields: [
              defineField({
                title: 'Label',
                name: 'optionLabel',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                title: 'Value',
                name: 'optionValue',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                title: 'Default value',
                name: 'optionDefault',
                description: 'Set this to be the initial value selected on dropdown',
                type: 'boolean',
                initialValue: false,
              }),
            ],
            preview: {
              select: {
                title: 'optionLabel',
                optionDefault: 'optionDefault',
              },
              prepare: ({title, optionDefault}) => {
                const mediaIcon = optionDefault ? RiStarFill : RiCheckLine
                return {
                  title: `${title ?? `-`}`,
                  media: mediaIcon,
                }
              },
            },
          }),
        ],
        hidden: ({parent}) => {
          return parent.selectPreset ? true : false
        },
        validation: (rule) =>
          rule.custom((items, {parent}: any) => {
            if (!items && !parent.selectPreset) {
              return 'Options or a preset must be set'
            }
            // Confirm only one items is set as default
            const featuredItems = (items ?? []).filter((item) => (item as SelectOption).optionDefault)

            if (featuredItems.length > 1) {
              return {
                paths: featuredItems.filter(isKeyedObject).map((item) => [{_key: item._key}]),
                message: 'Only one option can be set as default',
              }
            }

            // Verify that options values are unique
            const fieldNames = new Set(
              (items ?? []).map((item) => (item as SelectOption).optionValue) ?? [],
            )
            if ([...fieldNames].length < (items ?? []).length) {
              return {
                message: 'Multiple items have the same value',
              }
            }
            return true
          }),
      }),
    ],
    preview: {
      select: {
        title: 'fieldLabel',
        options: 'options',
        selectPreset: 'selectPreset',
      },
      prepare({title, options, selectPreset}) {
        const selectOptions = options as {
          optionValue: string
          optionLabel: string
        }[]
        return {
          title: `Select - ${title}`,
          subtitle: options ? selectOptions.map((o) => o.optionLabel).join(', ') : selectPreset || '',
        }
      },
    },
  })
