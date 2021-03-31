describe('jest', () => {
  beforeEach(() => {
    console.log(new Date().toLocaleString())
  })

  it('first test', () => {
    expect(1 + 1).toBe(2)
  })
})
