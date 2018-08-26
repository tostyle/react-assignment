import getInitialData, * as dishesJS from '../dishes'
import data from '../dishes.json'

describe('normalize dishes data', () => {
  test('getMeals', () => {
    const result = dishesJS.getMeals(data.dishes)
    expect(result).toMatchSnapshot()
  })
  test('getRestaurants', () => {
    const result = dishesJS.getRestaurants(data.dishes)
    expect(result).toMatchSnapshot() 
  })
  test('getInitialData', () => {
    const data = getInitialData()
    expect(data).toMatchSnapshot() 
  })
})