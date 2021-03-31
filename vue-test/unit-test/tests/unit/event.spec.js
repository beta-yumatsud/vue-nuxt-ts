import { shallowMount } from '@vue/test-utils'
import Event from '@/components/Event.vue'

describe('Event.vue', () => {
  it('Event test', () => {
    const email = 'hoge@example.com'
    const wrapper = shallowMount(Event)

    wrapper.find("#email").setValue(email)
    wrapper.find("form").trigger('submit.prevent')

    expect(wrapper.find('#result').text())
      .toContain('登録完了：' + email)
  })
})
