import React  from "react"
import PropTypes from 'prop-types'
import { Layout, ErrorValidation } from "../shared"
import { values } from "ramda"

const StepTwo = ({
  restaurants,
  onChangeOrder,
  onClickPrev,
  restaurant,
  onSubmit,
  errors
}) => (
  <Layout>
    <form onSubmit={onSubmit}>
      <div>
        <p>Please Select Restaurant</p>
        <select name="restaurant" onChange={onChangeOrder} value={restaurant}>
          <option value="">---</option>
          {values(restaurants).map(restaurant => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </div>
      <ErrorValidation errors={errors} />
      <button type="button" onClick={onClickPrev}>
        Prev
      </button>
      <button type="submit">Next</button>
    </form>
  </Layout>
)

StepTwo.propTypes = {
  onChangeOrder: PropTypes.func, 
  onClickPrev: PropTypes.func, 
  onSubmit: PropTypes.func, 
  errors: PropTypes.array,
  restaurants: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }
  )),
  restaurant: PropTypes.string
}
export default StepTwo
