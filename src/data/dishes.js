import * as R from "ramda"
import data from "./dishes.json"

const indexReduce = R.addIndex(R.reduce)
const formatData = (obj, current, index) => {
  obj[index] = { id: index, name: current }
  return obj
}

export const getMeals = R.pipe(
  R.map(dish => dish.availableMeals),
  R.flatten,
  R.uniq,
  indexReduce(formatData, {})
)

export const getRestaurants = R.pipe(
  R.map(dish => dish.restaurant),
  R.uniq,
  indexReduce(formatData, {})
)

const mappingId = R.pipe(
  R.values,
  R.reduce((obj, current) => {
    obj[current.name] = current.id + ''
    return obj
  }, {})
)

const getInitialData = (initData = data) => {
  const { dishes: dishData } = initData
  const restaurants = getRestaurants(dishData)
  const meals = getMeals(dishData)
  const mapping = {
    meal: mappingId(meals),
    restaurant: mappingId(restaurants)
  }
  const dishes = dishData.reduce((dishObj, dish) => {
    dishObj[dish.id] = {
      id: dish.id,
      name: dish.name,
      restaurant: mapping.restaurant[dish.restaurant],
      availableMeals: dish.availableMeals.map(meal => mapping.meal[meal])
    }
    return dishObj
  }, {})
  return {
    dishes,
    restaurants,
    meals
  }
}

export default getInitialData 
