import Vue, {h as _h} from 'vue'
import VueRouter2 from 'vue-router'
export * from 'vue'
export * from 'vue-router'
export type {VueConstructor} from 'vue/types/vue'
export const isVue2 = true
export const isVue3 = false

export const createElement = _h

export const h = (element, props, slot) => {
  const _props = slot === undefined ? {} : props
  const _slot = slot === undefined ? props : slot
  if (Array.isArray(_slot)) {
    return createElement(element, {props: _props}, _slot)
  }
  if (typeof _slot === 'object') {
    return createElement(element, {props: _props, scopedSlots: _slot})
  }

  if (typeof _slot === 'function') {
    return createElement(element, {props: _props, scopedSlots: {default: _slot}})
  }
  return createElement(element, {props: _props}, _slot)
}

export default Vue

export const Vue2 = Vue

export const createApp = () => {
  throw new Error('you do not use createApp in Vue2')
}

export const version = '2.7.14'

export const createRouter = () => {
  throw new Error('you do not use createApp in VueRouter3')
}

export {VueRouter2}
