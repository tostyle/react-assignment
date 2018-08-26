import { compose } from "ramda"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { STEP1, STEP2, STEP3 } from "../../redux/modules/step"
import { changeOrder } from "../../redux/modules/order"
import StepTwo from "./StepTwo"
import { withStepForm } from "../hoc"
import { branch, renderComponent, setDisplayName } from "recompose"
import { NotValidStep } from "../../components/shared"

const mapState = state => {
  const { restaurant } = state.order
  return {
    currentStep: state.step,
    restaurants: state.data.restaurants,
    restaurant
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    onChangeOrder: e => {
      const { name, value } = e.target
      return dispatch(changeOrder({ name, value }))
    },
    onClickPrev: e => {
      ownProps.history.push(`/step/${STEP1}`)
    }
  }
}

const validation = ({ restaurant, setError }) => () => {
  setError([])
  let isValid = true
  if (!restaurant) {
    isValid = false
    setError(state => [...state, "You need to choose restaurant"])
  }
  return isValid
}
export { validation }
export default compose(
  setDisplayName("StepTwoContainer"),
  withRouter,
  connect(
    mapState,
    mapDispatch
  ),
  withStepForm(validation, STEP3),
  branch(
    ({ currentStep }) => currentStep < STEP2,
    renderComponent(NotValidStep)
  )
)(StepTwo)
