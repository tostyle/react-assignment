import { compose, withState, withHandlers, setDisplayName } from "recompose"

export default isValidForm =>
  compose(
    setDisplayName("WithValidation"),
    withState("errors", "setError", []),
    withHandlers({ isValidForm })
  )
