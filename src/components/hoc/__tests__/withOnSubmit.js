import { handler } from "../withOnSubmit"

describe("withOnSubmit", () => {
  test("onSubmit validForm", () => {
    const props = {
      onSubmit: jest.fn(),
      isValidForm: jest.fn(() => true),
      changeStep: jest.fn(),
      history: {
        push: jest.fn()
      }
    }
    const e = {
      preventDefault: jest.fn()
    }
    handler(1).onSubmit(props)(e)
    expect(props.isValidForm).toBeCalled()
    expect(e.preventDefault).toBeCalled()
    expect(props.changeStep).toBeCalled()
    expect(props.history.push).toBeCalled()
  })

  test("onSubmit invalidForm", () => {
    const props = {
      onSubmit: jest.fn(),
      isValidForm: jest.fn(() => false),
      changeStep: jest.fn(),
      history: {
        push: jest.fn()
      }
    }
    const e = {
      preventDefault: jest.fn()
    }
    handler(1).onSubmit(props)(e)
    expect(props.isValidForm).toBeCalled()
    expect(e.preventDefault).toBeCalled()
    expect(props.changeStep).not.toHaveBeenCalled()
    expect(props.history.push).not.toHaveBeenCalled()
  })
})