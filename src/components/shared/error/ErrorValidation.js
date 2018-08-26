import React from "react"
import uuid from "uuid/v4"

const ErrorValidation = ({ errors }) => {
  if (!errors || errors.length === 0) {
    return null
  }
  return (
    <div>
      <p>Error:</p>
        <ul>
        {errors.map((err, index) => (
          <li key={uuid()}>{err}</li>
        ))}
      </ul>
    </div>
  )
}
export default ErrorValidation
