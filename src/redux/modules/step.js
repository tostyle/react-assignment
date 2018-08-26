import createAction from '../createAction'

const CHANGE_STEP = 'step/CHANGE_STEP'
export const STEP1 = '1'
export const STEP2 = '2'
export const STEP3 = '3'
export const REVIEW = 'review'

//actions
export const changeStep = createAction(CHANGE_STEP)

export const getInitState = () => STEP1
//reducers
export default (state = getInitState(), action) => {
  switch(action.type) {
    case CHANGE_STEP:
      return action.payload
    default:
      return state
  }
}
