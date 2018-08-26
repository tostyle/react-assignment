import { validation } from "../StepOneContainer"
describe("validation", () => {
  test("not choose meal", () => {
    const props = {
      meal: "",
      numberOfPeople: "1",
      setError: jest.fn()
    }
    expect(validation(props)()).toBe(false)
  })
  test("not insert numberOfPeople", () => {
    const props = {
      meal: "1",
      numberOfPeople: "",
      setError: jest.fn()
    }
    expect(validation(props)()).toBe(false)
  })
  test("valid form", () => {
    const props = {
      meal: "1",
      numberOfPeople: "1",
      setError: jest.fn()
    }
    expect(validation(props)()).toBe(true) 
  })
})