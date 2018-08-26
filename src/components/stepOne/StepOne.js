import React, { Fragment } from "react"
import PropTypes from 'prop-types'
import { Layout, ErrorValidation } from "../shared"
import { MIN_DISH, MAX_DISH } from "../../redux/modules/order"
import { values } from "ramda"

const StepOne = ({
  meals,
  onChangeOrder,
  meal,
  numberOfPeople,
  onSubmit,
  errors
}) => (
  <Layout>
    <Fragment>
      <form onSubmit={onSubmit}>
        <div>
          <p>Please Select Meal</p>
          <select name="meal" onChange={onChangeOrder} value={meal}>
            <option value="">---</option>
            {values(meals).map(meal => (
              <option key={meal.id} value={meal.id}>
                {meal.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Please Enter Number Of People</p>
          <input
            min={MIN_DISH}
            max={MAX_DISH}
            name="numberOfPeople"
            type="number"
            onChange={onChangeOrder}
            value={numberOfPeople}
          />
        </div>
        <ErrorValidation errors={errors} />
        <button>Next</button>
      </form>
    </Fragment>
  </Layout>
)
StepOne.propTypes = {
  errors: PropTypes.array,
  onChangeOrder: PropTypes.func, 
  onSubmit: PropTypes.func,
  numberOfPeople: PropTypes.string,
  meal: PropTypes.string,
  meals: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
     name: PropTypes.string
    }
  ))
}
export default StepOne
