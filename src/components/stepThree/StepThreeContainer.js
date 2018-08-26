import { compose } from "ramda"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import uuid from "uuid/v4"
import {
  branch,
  renderComponent,
  setDisplayName,
  withHandlers,
  withState
} from "recompose"
import * as R from "ramda"
import { NotValidStep } from "../../components/shared"
import { withStepForm } from "../hoc"
import { changeStep, REVIEW, STEP3, STEP2 } from "../../redux/modules/step"
import {
  addDish,
  editDish,
  removeDish,
  MAX_DISH
} from "../../redux/modules/order"
import StepThree from "./StepThree"

const mapState = state => {
  const {
    dishes: orderedDishes,
    restaurant,
    meal,
    numberOfPeople
  } = state.order
  const filteredDishes = R.pipe(
    R.values,
    R.filter(
      dish =>
        dish.restaurant === restaurant && dish.availableMeals.includes(meal)
    )
  )(state.data.dishes)
  const mappingFilteredDish = filteredDishes.reduce((obj, dish) => {
    obj[dish.id] = true
    return obj
  }, {})
  return {
    currentStep: state.step,
    filteredDishes,
    menuDishes: state.data.dishes,
    dishes: orderedDishes.map(dish => ({
      ...dish,
      isValid: !!mappingFilteredDish[dish.dishId]
    })),
    numberOfPeople
  }
}

const getInitialAddForm = () => ({ dishId: "", numberOfServing: "1" })
const getInitialEditForm = () => ({
  dishId: "",
  numberOfServing: "",
  id: ""
})

const getTotalDish = dishes =>
  dishes.reduce((total, dish) => total + +dish.numberOfServing, 0)

const validateHandlers = {
  validateAddForm: props => () => {
    let isValid = true
    const errors = []
    const requiredDish = !props.addForm.dishId
    const invalidAddDish =
      !requiredDish &&
      R.find(R.propEq("dishId", props.addForm.dishId), props.dishes)
    const total = getTotalDish(props.dishes) + +props.addForm.numberOfServing
    const invalidTotalDish = total > props.numberOfPeople || total > MAX_DISH
    if (requiredDish) {
      isValid = false
      errors.push(`You need to choose dish first`)
    }
    if (invalidTotalDish) {
      isValid = false
      errors.push(`Total dish more than ${props.numberOfPeople}`)
    }
    if (invalidAddDish) {
      isValid = false
      errors.push(`You add same dish`)
    }
    props.setError(errors)
    return isValid
  },
  validateEditForm: props => currentDish => {
    let isValid = true
    const errors = []
    const requiredDish = !props.editForm.dishId
    const invalidEditDish =
      !requiredDish &&
      (currentDish.dishId !== props.editForm.dishId &&
        R.find(R.propEq("dishId", props.editForm.dishId), props.dishes))
    const total =
      getTotalDish(props.dishes) -
      currentDish.numberOfServing +
      +props.editForm.numberOfServing
    const invalidTotalDish = total > props.numberOfPeople || total > MAX_DISH
    if (requiredDish) {
      isValid = false
      errors.push(`You need to choose dish first`)
    }
    if (invalidTotalDish) {
      isValid = false
      errors.push(`Total dish more than ${props.numberOfPeople}`)
    }
    if (invalidEditDish) {
      isValid = false
      errors.push(`You add same dish`)
    }
    props.setError(errors)
    return isValid
  },
  validateSubmitForm: props => () => {
    let isValid = true
    const errors = []
    const totalDish = getTotalDish(props.dishes)
    const invalidMaxDish = totalDish > MAX_DISH
    const invalidMinDish = totalDish < props.numberOfPeople
    const invalidDish = R.find(R.propEq("isValid", false), props.dishes)
    if (invalidMaxDish) {
      isValid = false
      errors.push(`Total dish more than ${props.numberOfPeople}`)
    }
    if (invalidMinDish) {
      isValid = false
      errors.push(`Total dish less than ${props.numberOfPeople}`)
    }
    if (invalidDish) {
      isValid = false
      errors.push(`You need to remove invalid dish from your order first`)
    }
    props.setError(errors)
    return isValid
  }
}
const handlers = {
  onClickPrev: ({ history }) => e => {
    history.push(`/step/${STEP2}`)
  },
  onChangeAddForm: ({ setAddForm }) => e => {
    const { name, value } = e.target
    setAddForm(state => ({
      ...state,
      [name]: value
    }))
  },
  onChangeEditForm: ({ setEditForm }) => e => {
    const { name, value } = e.target
    setEditForm(state => ({
      ...state,
      [name]: value
    }))
  },
  onClickAdd: ({ addDish, addForm, dishes, validateAddForm }) => e => {
    e.preventDefault()
    if (validateAddForm()) {
      addDish({
        ...addForm,
        id: uuid()
      })
    }
  },
  onClickEdit: ({
    editForm,
    setEditForm,
    editDish,
    dishes,
    validateEditForm
  }) => currentDish => e => {
    if (validateEditForm(currentDish)) {
      editDish(editForm)
      setEditForm(getInitialEditForm)
    }
  },
  onClickRemove: ({ removeDish }) => id => () => {
    if(window.confirm('Delete this Dish ?')) {
      removeDish(id)
    }
  },
  onClickCancel: ({ setEditForm, setFormError }) => () => {
    setEditForm(getInitialEditForm)
    setFormError([])
  },
  onToggleEdit: ({ setEditForm }) => editForm => () => {
    setEditForm(state => ({
      ...state,
      id: editForm.id,
      dishId: editForm.dishId,
      numberOfServing: editForm.numberOfServing
    }))
  }
}

const {
  validateAddForm,
  validateEditForm,
  validateSubmitForm
} = validateHandlers
export default compose(
  setDisplayName("StepThreeContainer"),
  withRouter,
  connect(
    mapState,
    { changeStep, addDish, editDish, removeDish }
  ),
  withState("addForm", "setAddForm", getInitialAddForm),
  withState("editForm", "setEditForm", getInitialEditForm),
  withStepForm(validateSubmitForm, REVIEW),
  withHandlers({ validateAddForm, validateEditForm }),
  withHandlers(handlers),
  branch(
    ({ currentStep }) => currentStep < STEP3,
    renderComponent(NotValidStep)
  )
)(StepThree)
