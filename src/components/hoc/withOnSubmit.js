import { withHandlers, compose, setDisplayName } from "recompose"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { changeStep } from "../../redux/modules/step"

const handler = (step) => ({
  onSubmit: ({ isValidForm, changeStep, history }) => e => {
    e.preventDefault()
    if (isValidForm()) {
      changeStep(step)
      history.push(step)
    }
  }
})
export { handler }
export default step =>
  compose(
    setDisplayName("WithOnSubmit"),
    withRouter,
    connect(
      null,
      { changeStep }
    ),
    withHandlers(handler(step))
  )
