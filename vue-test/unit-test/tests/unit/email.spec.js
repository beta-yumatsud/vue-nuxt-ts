import Email from '@/components/Email.vue'

describe('Email.vue', () => {
  it('computed test', () => {
    const that = { email: 'HOGE@example.com' }
    expect(Email.computed.localEmail.call(that)).toBe('hoge')
  })
})
