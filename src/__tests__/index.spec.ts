/**
 * @jest-environment jsdom
 */
import {mount} from '@vue/test-utils'
import {defineComponent, h, ref} from '../'
describe('vue h', () => {
  const setup = (props?, Component?) => {
    const wrapper = mount(
      {
        setup: (_, {slots}) => {
          const count = ref(0)
          const click = () => {
            count.value += 1
          }

          const newProps = {onClick: click, title: 'hello', ...props}

          if (Component) {
            return () =>
              h(Component, newProps, {
                default: ({value}) => value ?? '',
              })
          }

          return () => h('div', newProps, slots.default?.({count: count.value}))
        },
      },
      {
        scopedSlots: {
          default: (slot) => slot.count,
        },
      },
    )
    return {wrapper}
  }
  it('should click', async () => {
    const {wrapper} = setup()

    expect(wrapper.text()).toBe('0')

    await wrapper.get('div').trigger('click')

    expect(wrapper.text()).toBe('1')
  })
  it('should render attrs', () => {
    const {wrapper} = setup()

    expect(wrapper.attributes()).toEqual({title: 'hello'})
  })
  it('should render attrs with a Component', () => {
    const Component = defineComponent({
      props: ['name'],
      render() {
        return h('div', {}, this.name)
      },
    })

    const {wrapper} = setup({'aria-current': 'page', name: 'foo'}, Component)

    expect(wrapper.attributes()).toEqual({'aria-current': 'page', title: 'hello'})
    expect(wrapper.text()).toBe('foo')
  })

  it('should render with slot context', () => {
    const Component = defineComponent({
      props: ['name'],
      setup: (_, {slots}) => {
        return () => h('span', {}, slots.default?.({value: 'value'}))
      },
    })
    const {wrapper} = setup({name: 'foo'}, Component)

    expect(wrapper.attributes()).toEqual({title: 'hello'})
    expect(wrapper.text()).toBe('value')
  })

  it('should render class', () => {
    const Component = defineComponent({
      props: ['name'],
      setup: () => {
        return () => h('span', {class: ['foo', 'bar']}, 'hello')
      },
    })
    const {wrapper} = setup({name: 'foo'}, Component)

    expect(wrapper.attributes()).toEqual({class: 'foo bar', title: 'hello'})
    expect(wrapper.text()).toBe('hello')
  })
})
