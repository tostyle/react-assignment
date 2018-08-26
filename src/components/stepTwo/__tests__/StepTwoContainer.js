import { validation } from "../StepTwoContainer"

describe("validation", () => {
  test("not choose restaurant", () => {
    const props = {
      restaurant: "",
      setError: jest.fn()
    }
    expect(validation(props)()).toBe(false)
  })
  test("valid form", () => {
    const props = {
      restaurant: "1",
      setError: jest.fn()
    }
    expect(validation(props)()).toBe(true)
  })
})
