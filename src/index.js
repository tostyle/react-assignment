import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import createStore from "./redux/createStore"
import App from "./App"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import getInitialData from "./data/dishes"
import { getInitState as getInitOrderState } from "./redux/modules/order"
import { getInitState as getInitStepState } from "./redux/modules/step"

const getInitState = () => {
  const order = JSON.parse(localStorage.getItem("order"))
  const currentStep = JSON.parse(localStorage.getItem("currentStep"))
  return {
    data: getInitialData(),
    order: order || getInitOrderState(),
    step: currentStep || getInitStepState()
  }
}
const store = createStore(getInitState())

store.subscribe(() => {
  let order = store.getState().order
  let currentStep = store.getState().step
  localStorage.setItem("order", JSON.stringify(order))
  localStorage.setItem("currentStep", JSON.stringify(currentStep))
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
