import {defineField, definePlugin, defineType, type ObjectInputProps} from 'sanity'

import type {LinkFieldPluginOptions, LinkValue} from '../../types'
import { LinkTypeInput } from '../../components/LinkTypeInput'
import {LinkInput} from '../../components/LinkInput'
import { LinkIcon } from '@sanity/icons'

export const linkField = definePlugin<LinkFieldPluginOptions | void>((props) => {
  const {
    linkableSchemaTypes = ['page'],
    enableLinkParameters = true,
    enableAnchorLinks = true,
  } = props || {}

  const linkType = {
    name: 'link',
    title: 'Link',
    type: 'object',
    icon: LinkIcon,
    fieldsets: [
      {
        name: 'advanced',
        title: 'Advanced',
        description: 'Optional. Add anchor links and custom parameters.',
        options: {
          collapsible: true,
          collapsed: true,
        },
      },
    ],
    fields: [
      defineField({
        name: 'text',
        type: 'string',
        validation: (rule) => rule.required(),
      }),

      defineField({
        name: 'type',
        type: 'string',
        initialValue: 'internal',
        validation: (Rule) => Rule.required(),
        components: {
          input: (props) => LinkTypeInput({linkableSchemaTypes, ...props}),
        },
      }),

      // Internal
      defineField({
        name: 'internalLink',
        type: 'reference',
        to: linkableSchemaTypes.map((type: string) => ({
          type,
        })),
        options: {
          disableNew: true,
        },
        description: 'Link to another page or document on the website.',
        hidden: ({parent}) => !!parent?.type && parent?.type !== 'internal',
        validation: (Rule) =>
          Rule.custom((value, context) => {
            if (!value && (context.parent as any)?.type == 'internal') {
              return 'Link is required'
            }
            return true
          }),
      }),

      // External
      defineField({
        name: 'url',
        type: 'url',
        description: 'Link to an absolute URL to a page on another website.',
        validation: (rule) =>
          rule
            .uri({
              allowRelative: true,
              scheme: ['https', 'http'],
            })
            .custom((value, context) => {
              if (!value && (context.parent as any)?.type == 'external') {
                return 'Link is required'
              }
              return true
            }),
        hidden: ({parent}) => parent?.type !== 'external',
      }),

      // E-mail
      defineField({
        name: 'email',
        type: 'email',
        description: 'Link to send an e-mail to the given address.',
        hidden: ({parent}) => parent?.type !== 'email',
        validation: (Rule) =>
          Rule.custom((value, context) => {
            if (!value && (context.parent as any)?.type == 'email') {
              return 'Email is required'
            }
            return true
          }),
      }),

      // Phone
      defineField({
        name: 'phone',
        type: 'string',
        description: 'Link to call the given phone number.',
        validation: (rule) =>
          rule.custom((value, context) => {
            if (!value && (context.parent as any)?.type == 'phone') {
              return 'Phone is required'
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!value || (context.parent as any)?.type !== 'phone') {
              return true
            }

            return (
              (new RegExp(/^\+?[0-9\s-]*$/).test(value) &&
                !value.startsWith('-') &&
                !value.endsWith('-')) ||
              'Must be a valid phone number'
            )
          }),
        hidden: ({parent}) => parent?.type !== 'phone',
      }),

      // New tab
      defineField({
        title: 'Open in new window',
        name: 'blank',
        type: 'boolean',
        initialValue: false,
        hidden: ({parent}) =>
          parent?.type === 'email' || parent?.type === 'phone' || parent?.type === 'internal',
      }),

      // Parameters
      ...(enableLinkParameters || enableAnchorLinks
        ? [
            ...(enableLinkParameters
              ? [
                  defineField({
                    title: 'Parameters',
                    name: 'parameters',
                    type: 'string',
                    description: 'Optional. Add custom parameters to the URL, such as UTM tags.',
                    validation: (rule) =>
                      rule.custom((value, context) => {
                        if (
                          !value ||
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (context.parent as any)?.type === 'email' ||
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (context.parent as any)?.type === 'phone'
                        ) {
                          return true
                        }

                        if (value.indexOf('?') !== 0) {
                          return 'Must start with ?; eg. ?utm_source=example.com&utm_medium=referral'
                        }

                        if (value.length === 1) {
                          return 'Must contain at least one parameter'
                        }

                        return true
                      }),
                    hidden: ({parent}) => parent?.type === 'email' || parent?.type === 'phone',
                    fieldset: 'advanced',
                  }),
                ]
              : []),

            // Anchor
            ...(enableAnchorLinks
              ? [
                  defineField({
                    title: 'Anchor',
                    name: 'anchor',
                    type: 'string',
                    description:
                      'Optional. Add an anchor to link to a specific section on the page.',
                    validation: (rule) =>
                      rule.custom((value, context) => {
                        if (
                          !value ||
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (context.parent as any)?.type === 'email' ||
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (context.parent as any)?.type === 'phone'
                        ) {
                          return true
                        }

                        if (value.indexOf('#') !== 0) {
                          return 'Must start with #; eg. #page-section-1'
                        }

                        if (value.length === 1) {
                          return 'Must contain at least one character'
                        }

                        return (
                          new RegExp(/^([-?/:@._~!$&'()*+,;=a-zA-Z0-9]|%[0-9a-fA-F]{2})*$/).test(
                            value.replace(/^#/, ''),
                          ) || 'Invalid URL fragment'
                        )
                      }),
                    hidden: ({parent}) => parent?.type === 'email' || parent?.type === 'phone',
                    fieldset: 'advanced',
                  }),
                ]
              : []),
          ]
        : []),
    ],
    components: {
      input: (props: ObjectInputProps) => LinkInput({...props, value: props.value as LinkValue}),
    },
  }

  return {
    name: 'link-field',
    schema: {
      types: [defineType(linkType)],
    },
  }
})
