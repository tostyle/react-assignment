import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { connect } from "react-redux"
import { changeStep } from "../../../redux/modules/step"
import Layout from "./Layout"

const mapState = state => ({ currentStep: state.step })
const mapDispatch = dispatch => ({
  changeStep: step => () => dispatch(changeStep(step))
})

export default compose(
  withRouter,
  connect(
    mapState,
    mapDispatch
  )
)(Layout)
