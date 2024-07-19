import {definePlugin} from 'sanity'

interface MyPluginConfig {
  /* nothing here yet */
}

export const myPlugin = definePlugin<MyPluginConfig | void>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello  world')
  return {
    name: 'thread-kit',
  }
})

export * from './utils'
export {CharacterCountInput} from './components/CharacterCountInput'
export {linkField} from './objects/linkField'
