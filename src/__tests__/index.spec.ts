/**
 * @jest-environment jsdom
 */
import {mount} from '@vue/test-utils'
import {defineComponent, h, ref} from '../'
describe('vue h', () => {
  const setup = (props?, Component?) => {
    const wrapper = mount({
      setup: () => {
        const count = ref(0)
        const click = () => {
          count.value += 1
        }

        const newProps = {onClick: click, title: 'hello', ...props}

        if (Component) {
          return () => h(Component, newProps, () => '')
        }

        return () => h('div', newProps, count.value)
      },
    })
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

    const {wrapper} = setup({name: 'foo'}, Component)

    expect(wrapper.attributes()).toEqual({title: 'hello'})
    expect(wrapper.text()).toBe('foo')
  })
})
