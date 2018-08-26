import React from "react"
import styled from "react-emotion"
import PropTypes from "prop-types"

const Container = styled("div")`
  display: flex;
  align-items: flex-end;
`
const Column = styled("div")`
  padding: 1%;
`

const ShowDish = ({ name, dish, onClickEdit, onClickRemove }) => {
  return (
    <Container>
      <Column>
        <span>{name}</span>
      </Column>
      <Column>
        <span>{dish.numberOfServing}</span>
      </Column>
      <Column>
        <button onClick={onClickEdit}>Edit</button>
      </Column>
      <Column>
        <button onClick={onClickRemove}>Delete</button>
      </Column>
      {!dish.isValid && <Column><span>** You can't choose this dish **</span></Column>}
    </Container>
  )
}

ShowDish.displayName = "ShowDish"
ShowDish.propTypes = {
  onClickEdit: PropTypes.func,
  onClickRemove: PropTypes.func,
  name: PropTypes.string,
  dish: PropTypes.shape({
    numberOfServing: PropTypes.string
  })
}
export default ShowDish
