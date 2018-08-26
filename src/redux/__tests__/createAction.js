import createAction from '../createAction'

describe('createAction', () => {
  test('with normal payload', () => {
    const type = "TEST"
    const payload = 1
    const action = createAction(type)(payload)
    const expectedResult = { type, payload }
    expect(action).toEqual(expectedResult)
  })
  test('with obj payload', () => {
    const type = "TEST"
    const payload = { a: 1, b: 2 }
    const action = createAction(type)(payload)
    const expectedResult = { type, payload }
    expect(action).toEqual(expectedResult)
  })
})