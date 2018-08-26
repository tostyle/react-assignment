import styled from 'react-emotion'
import { Link } from "react-router-dom"

const Navbar = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: black;
`

Navbar.Item = styled('li')`
  float: left;
`

Navbar.Link = styled(Link)`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none
`

export default Navbar