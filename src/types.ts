import {ObjectSchemaType, SlugDefinition, SlugInputProps, SlugOptions} from 'sanity'

interface ExtendedSlugOptions extends SlugOptions {
  url: string
  folder?: string
  locked?: boolean | (({document}: any) => boolean)
}

export type SlugParams = Omit<SlugDefinition, 'type' | 'options' | 'name'> & {
  name?: string
  options?: ExtendedSlugOptions
}

export interface ExtendedSlugInputProps extends SlugInputProps {
  url: string
  folder?: string
}


export interface LinkFieldPluginOptions {
  linkableSchemaTypes: string[];
  enableLinkParameters?: boolean,
  enableAnchorLinks?: boolean,
}

export interface CustomizableLink {
  parameters?: string
  anchor?: string
  blank?: boolean
}

export interface InternalLink extends CustomizableLink {
  type: 'internal'
  internalLink?: {
    _type: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}

export interface ExternalLink extends CustomizableLink {
  type: 'external'
  url?: string
}

export interface EmailLink {
  type: 'email'
  email?: string
}

export interface PhoneLink {
  type: 'phone'
  phone?: string
}

export type LinkValue = {
  _key?: string
  _type?: 'link'
  text?: string
} & (InternalLink | ExternalLink | EmailLink | PhoneLink)


export type SanityLink = {
  text: string;
  link: string;
  blank?: boolean;
  parameters?: string;
  anchor?: string;
  type?: string;
};

export interface FormBuilderPluginOptions {
  enableModule?: boolean;
  additionalFieldTypes?: {title: string, value: string}[];
  additionalSelectPresets?: {title: string, value: string}[];
}
