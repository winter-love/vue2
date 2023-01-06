/* eslint-disable unicorn/prevent-abbreviations */
import Vue, {h as _h} from 'vue'
import VueRouter2 from 'vue-router'
export * from 'vue'
export * from 'vue-router'
export type {VueConstructor} from 'vue/types/vue'
export const isVue2 = true
export const isVue3 = false

export const createElement = _h

const StartOnRegex = /^on[A-Z]/u

const getEvent = (props: Record<string, any>) => {
  const events = []
  const leftProps = []

  Object.entries(props).forEach((value) => {
    const [key] = value
    if (StartOnRegex.test(key)) {
      events.push(value)
    } else {
      leftProps.push(value)
    }
  })

  return {
    events: Object.fromEntries(
      events.map(([key, value]) => [key.replace(/^on/u, '').toLowerCase(), value]),
    ),
    leftProps: Object.fromEntries(leftProps),
  }
}

const getProps = (props: Record<string, any>, propsOptions?: Record<string, any> | string[]) => {
  const _keys = Array.isArray(propsOptions) ? propsOptions : Object.keys(propsOptions)
  return Object.fromEntries(_keys.map((key) => [key, props[key]]))
}

const removeProps = (props: Record<string, any>, propsOptions?: Record<string, any> | string[]) => {
  const _keys = Array.isArray(propsOptions) ? propsOptions : Object.keys(propsOptions)
  return {
    ...props,
    ...Object.fromEntries(_keys.map((key) => [key])),
  }
}

export const h = (element, props, slot) => {
  const _rawProps = slot === undefined ? {} : props
  const {events, leftProps} = getEvent(_rawProps)
  const _slot = slot === undefined ? props : slot
  const propsOptions = typeof element == 'string' ? [] : element.props
  const _props = getProps(leftProps, propsOptions)
  const attrs = removeProps(leftProps, propsOptions)
  const data = {attrs, on: events, props: _props}
  if (Array.isArray(_slot)) {
    return createElement(element, data, _slot)
  }
  if (typeof _slot === 'object') {
    return createElement(element, {...data, scopedSlots: _slot})
  }

  if (typeof _slot === 'function') {
    return createElement(element, {...data, scopedSlots: {default: _slot}})
  }
  return createElement(element, data, _slot)
}

export default Vue

export const Vue2 = Vue

export const createApp = () => {
  throw new Error('you do not use createApp in Vue2')
}

export const version = '2.7.14'

const throwError = () => {
  throw new Error('you do not use createApp in VueRouter3')
}
export const createRouter = () => {
  throwError()
}

export const createMemoryHistory = () => {
  throwError()
}

export const createWebHistory = () => {
  throwError()
}

export {VueRouter2}
