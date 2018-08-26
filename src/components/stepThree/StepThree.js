import React from "react"
import PropTypes from "prop-types"
import { Layout, ErrorValidation } from "../shared"
import { css } from "react-emotion"
import ShowDish from "./ShowDish"
import EditDish from "./EditDish"

const formStyle = css`
  display: flex;
`
const formDiv = css`
  padding: 1%;
`
const StepThree = ({
  onClickAdd,
  onChangeAddForm,
  onToggleEdit,
  onChangeEditForm,
  onClickCancel,
  onClickEdit,
  onClickRemove,
  onSubmit,
  addForm,
  editForm,
  dishes,
  menuDishes,
  filteredDishes,
  errors
}) => {
  console.log(dishes)
  return (
    <Layout>
      <form onSubmit={onClickAdd} className={formStyle}>
        <div className={formDiv}>
          <p>Please Select a Dish</p>
          <select
            name="dishId"
            onChange={onChangeAddForm}
            value={addForm.dishId}
          >
            <option value="">---</option>
            {filteredDishes.map(dish => (
              <option key={dish.id} value={dish.id}>
                {dish.name}
              </option>
            ))}
          </select>
        </div>
        <div className={formDiv}>
          <p>Please Enter Number Of Serving</p>
          <input
            name="numberOfServing"
            type="number"
            onChange={onChangeAddForm}
            value={addForm.numberOfServing}
          />
          <button type="submit">Add</button>
        </div>
      </form>
      <div>
        {dishes.map(
          dish =>
            editForm.id === dish.id ? (
              <EditDish
                key={dish.id}
                dishes={filteredDishes}
                dish={editForm}
                onClickEdit={onClickEdit(dish)}
                onChange={onChangeEditForm}
                onClickCancel={onClickCancel}
              />
            ) : (
              <ShowDish
                key={dish.id}
                name={menuDishes[dish.dishId].name}
                dish={dish}
                onClickEdit={onToggleEdit(dish)}
                onClickRemove={onClickRemove(dish.id)}
              />
            )
        )}
      </div>
      <ErrorValidation errors={errors} />
      <button onClick={onSubmit}>Next</button>
    </Layout>
  )
}
StepThree.propTypes = {
  onClickAdd: PropTypes.func,
  onChangeAddForm: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onChangeEditForm: PropTypes.func,
  onClickCancel: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickRemove: PropTypes.func,
  onSubmit: PropTypes.func,
  addForm: PropTypes.shape({
    dishId: PropTypes.string,
    numberOfServing: PropTypes.string
  }),
  editForm: PropTypes.shape({
    dishId: PropTypes.string,
    numberOfServing: PropTypes.string
  }),
  dishes: PropTypes.array,
  menuDishes: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string
    }
  )),
  filteredDishes: PropTypes.array,
  errors: PropTypes.array
}
export default StepThree
