import { compose, setDisplayName } from "recompose"
import withOnSubmit from "./withOnSubmit"
import withValidation from "./withValidation"

export default (validation, step) =>
  compose(
    setDisplayName("WithStepForm"),
    withValidation(validation),
    withOnSubmit(step)
  )
