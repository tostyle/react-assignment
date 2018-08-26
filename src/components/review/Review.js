import React from "react"
import PropTypes from "prop-types"
import { Layout } from "../shared"

const Review = ({ data, order, onClickPrev, onSubmit }) => {
  return (
    <Layout>
      <p>Meal {data.meals[order.meal].name}</p>
      <p>No. of. People {order.numberOfPeople}</p>
      <p>Restaurant {data.restaurants[order.restaurant].name}</p>
      <ul>
        {order.dishes.map(dish => (
          <li key={dish.id}>
            {data.dishes[dish.dishId].name} - {dish.numberOfServing}
          </li>
        ))}
      </ul>
      <button onClick={onClickPrev}>Prev</button>
      <button onClick={onSubmit}>Submit</button>
    </Layout>
  )
}
Review.propTypes = {
  onClickPrev: PropTypes.func,
  onSubmit: PropTypes.func,
  data: PropTypes.shape({
    meals: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
    dishes: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    )
  }),
  order: PropTypes.shape({
    meal: PropTypes.string,
    numberOfPeople: PropTypes.string,
    restaurant: PropTypes.string,
    dishes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        dishId: PropTypes.string,
        numberOfServing: PropTypes.string
      })
    )
  })
}
export default Review
