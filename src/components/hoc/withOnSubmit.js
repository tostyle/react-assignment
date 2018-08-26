import { withHandlers, compose, setDisplayName } from "recompose"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { changeStep } from "../../redux/modules/step"

export default step =>
  compose(
    setDisplayName("WithOnSubmit"),
    withRouter,
    connect(
      null,
      { changeStep }
    ),
    withHandlers({
      onSubmit: ({ isValidForm, changeStep, history }) => e => {
        e.preventDefault()
        if (isValidForm()) {
          changeStep(step)
          history.push(step)
        }
      }
    })
  )
