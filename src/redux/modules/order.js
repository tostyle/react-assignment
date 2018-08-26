import createAction from "../createAction"
const CHANGE_ORDER = "order/CHANGE_ORDER"
const ADD_DISH = "order/ADD_DISH"
const EDIT_DISH = "order/EDIT_DISH"
const REMOVE_DISH = "order/REMOVE_DISH"
export const MIN_DISH = 1
export const MAX_DISH = 10
export const changeOrder = createAction(CHANGE_ORDER)
export const addDish = createAction(ADD_DISH)
export const editDish = createAction(EDIT_DISH)
export const removeDish = createAction(REMOVE_DISH)
export const getInitState = () => ({
  meal: "",
  restaurant: "",
  numberOfPeople: "1",
  dishes: [] 
})

const order = (
  state = getInitState(),
  action
) => {
  switch (action.type) {
    case CHANGE_ORDER:
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value
      }
    case ADD_DISH:
      return {
        ...state,
        dishes: [...state.dishes, action.payload]
      }
    case EDIT_DISH:
      const edittedDish = state.dishes.map(dish => {
        if (dish.id === action.payload.id) {
          return action.payload
        }
        return dish
      })
      return { ...state, dishes: edittedDish }
    case REMOVE_DISH:
      const removedDish = state.dishes.filter(
        dish => dish.id !== action.payload
      )
      return { ...state, dishes: removedDish }
    default:
      return state
  }
}

export default order
