import {
  compose,
  branch,
  renderComponent,
  withHandlers,
  setDisplayName
} from "recompose"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { REVIEW, STEP3 } from "../../redux/modules/step"
import { NotValidStep } from "../shared"
import Review from "./Review"

const mapState = state => ({
  currentStep: state.step,
  order: state.order,
  data: state.data
})

const handlers = {
  onClickPrev: props => () => {
    props.history.push(`/step/${STEP3}`)
  },
  onSubmit: props => () => {
    console.log(JSON.stringify(props.order, null, 2))
  }
}

export default compose(
  setDisplayName("ReviewContainer"),
  withRouter,
  connect(mapState),
  withHandlers(handlers),
  branch(
    ({ currentStep }) => currentStep < REVIEW,
    renderComponent(NotValidStep)
  )
)(Review)
