import React from "react"
import styled from "react-emotion"
import Navbar from "./Navbar"
import { STEP1, STEP2, STEP3, REVIEW } from "../../../redux/modules/step"

const Container = styled("div")`
  padding-left: 10%;
  padding-right: 10%;
`
const isActiveStyle = (path, step) => ({
  backgroundColor: path === `/step/${step}` ? "green" : "none"
})

const Layout = ({ changeStep, location: { pathname }, children, ...props }) => {
  return (
    <Container>
      <Navbar>
        <Navbar.Item>
          <Navbar.Link
            style={isActiveStyle(pathname, STEP1)}
            to={`/step/${STEP1}`}
            onClick={changeStep(STEP1)}
          >
            Step 1
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link
            style={isActiveStyle(pathname, STEP2)}
            to={`/step/${STEP2}`}
            onClick={changeStep(STEP2)}
          >
            Step 2
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link
            style={isActiveStyle(pathname, STEP3)}
            to={`/step/${STEP3}`}
            onClick={changeStep(STEP3)}
          >
            Step 3
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link
            style={isActiveStyle(pathname, REVIEW)}
            to={`/step/${REVIEW}`}
            onClick={changeStep(REVIEW)}
          >
            Review
          </Navbar.Link>
        </Navbar.Item>
      </Navbar>
      {children}
    </Container>
  )
}
export default Layout
