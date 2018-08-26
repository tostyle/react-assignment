import React from "react"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import StepOneContainer from "./components/stepOne/StepOneContainer"
import StepTwoContainer from "./components/stepTwo/StepTwoContainer"
import StepThreeContainer from "./components/stepThree/StepThreeContainer"
import ReviewContainer from "./components/review/ReviewContainer"
import * as step from "./redux/modules/step"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={`/step/${step.STEP1}`} component={StepOneContainer} />
        <Route path={`/step/${step.STEP2}`} component={StepTwoContainer} />
        <Route path={`/step/${step.STEP3}`} component={StepThreeContainer} />
        <Route path={`/step/${step.REVIEW}`} component={ReviewContainer} />
      </Switch>
    </Router>
  )
}
export default App
