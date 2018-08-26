import reducer, * as step from "../step"

describe("changeStep", () => {
  test("changeStep", () => {
    expect(reducer(undefined, step.changeStep(step.REVIEW))).toBe(step.REVIEW)
  })
})