import React from "react"
import styled from "react-emotion"
import PropTypes from "prop-types"
import { MIN_DISH, MAX_DISH } from "../../redux/modules/order"

const Container = styled("div")`
  display: flex;
  align-items: flex-end;
`
const Column = styled("div")`
  padding: 1%;
`

const EditDish = ({ dish, dishes, onClickEdit, onClickCancel, onChange }) => {
  return (
    <Container>
      <Column>
        <select name={"dishId"} value={dish.dishId} onChange={onChange}>
          {dishes.map(menuDish => {
            return (
              <option key={menuDish.id} value={menuDish.id}>
                {menuDish.name}
              </option>
            )
          })}
        </select>
      </Column>
      <Column>
        <input
          min={MIN_DISH}
          max={MAX_DISH}
          name={"numberOfServing"}
          type={"number"}
          value={dish.numberOfServing}
          onChange={onChange}
        />
      </Column>
      <Column>
        <button onClick={onClickEdit}>Edit</button>
      </Column>
      <Column><button onClick={onClickCancel}>Cancel</button></Column>
    </Container>
  )
}

EditDish.propTypes = {
  onClickEdit: PropTypes.func,
  onClickCancel: PropTypes.func,
  onChange: PropTypes.func,
  dish: PropTypes.shape({
    dishId: PropTypes.string,
    numberOfServing: PropTypes.string
  }),
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      dishId: PropTypes.string 
   }
  ))
}
export default EditDish
