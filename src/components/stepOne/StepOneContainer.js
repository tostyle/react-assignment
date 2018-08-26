import { compose, setDisplayName } from "recompose"
import { connect } from "react-redux"
import { STEP2 } from "../../redux/modules/step"
import { changeOrder } from "../../redux/modules/order"
import { withStepForm } from "../hoc"
import StepOne from "./StepOne"

const mapState = state => {
  const { meal, numberOfPeople } = state.order
  return {
    meals: state.data.meals,
    meal,
    numberOfPeople
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    onChangeOrder: e => {
      const { name, value } = e.target
      return dispatch(changeOrder({ name, value }))
    }
  }
}

const validation = ({ setError, meal, numberOfPeople }) => () => {
  const errors = []
  let isValid = true
  if (!meal) {
    isValid = false
    errors.push("You are not select meal")
  }
  if (!numberOfPeople) {
    isValid = false
    errors.push("You are not insert no. people")
  }
  setError(errors)
  return isValid
}

export default compose(
  setDisplayName("StepOneContainer"),
  connect(
    mapState,
    mapDispatch
  ),
  withStepForm(validation, STEP2)
)(StepOne)
