import { validateHandlers } from "../StepThreeContainer"


describe("addFormValidation", () => {
  test("valid form", () => {
    const props = {
      addForm: {
        dishId: "1",
        numberOfServing: "1"
      },
      dishes: [],
      numberOfPeople: "1",
      setError: jest.fn()
    }
    expect(validateHandlers.validateAddForm(props)()).toBe(true)
  })
  test("requiredDish", () => {
    const props = {
      addForm: {},
      dishes: [],
      numberOfPeople: "1",
      setError: jest.fn()
    }
    expect(validateHandlers.validateAddForm(props)()).toBe(false) 
  })
  test("invalidTotalDish", () => {
    const props = {
      addForm: {
        dishId: "1",
        numberOfServing: "2"
      },
      dishes: [],
      numberOfPeople: "1",
      setError: jest.fn()
    }
    expect(validateHandlers.validateAddForm(props)()).toBe(false) 
  })
  test("invalidAddDish", () => {
    const props = {
      addForm: {
        dishId: "1",
        numberOfServing: "2"
      },
      dishes: [
        {dishId: "1"}
      ],
      numberOfPeople: "1",
      setError: jest.fn()
    }
    expect(validateHandlers.validateAddForm(props)()).toBe(false) 
  })
})

describe("editFormValidation", () => {
  test("valid form", () => {
    const currentDish = {
      dishId: "1",
      numberOfServing: "1"
    }
    const props = {
      editForm: currentDish,
      dishes: [],
      numberOfPeople: "1",
      setError: jest.fn()
    }
    
    expect(validateHandlers.validateEditForm(props)(currentDish)).toBe(true)
  })
  test("requiredDish", () => {
    const currentDish = {}
    const props = {
      editForm: currentDish,
      dishes: [],
      numberOfPeople: "1",
      setError: jest.fn()
    }
    
    expect(validateHandlers.validateEditForm(props)(currentDish)).toBe(false)
  })
  test("invalidTotalDish", () => {
    const currentDish = {
      dishId: "1",
      numberOfServing: "5"
    }
    const props = {
      editForm: {
        dishId: "1",
        numberOfServing: "10"
      },
      dishes: [{
        dishId: "1",
        numberOfServing: "5"
      }],
      numberOfPeople: "5",
      setError: jest.fn()
    }
    
    expect(validateHandlers.validateEditForm(props)(currentDish)).toBe(false) 
  })

  test("invalidEditDish", () => {
    const currentDish = {
      dishId: "1",
      numberOfServing: "5"
    }
    const props = {
      editForm: {
        dishId: "2",
        numberOfServing: "4"
      },
      dishes: [{
        dishId: "1",
        numberOfServing: "4"
      }, {
        dishId: "2",
        numberOfServing: "1"
      }],
      numberOfPeople: "5",
      setError: jest.fn()
    }
    
    expect(validateHandlers.validateEditForm(props)(currentDish)).toBe(false) 
  })
})

describe("submitFormValidation", () => {
  test('invalidDish', () => {
    const props = {
      dishes: [{
        dishId: "1",
        numberOfServing: "4",
        isValid: false
      }, {
        dishId: "2",
        numberOfServing: "1",
        isValid: true
      }],
      numberOfPeople: "5",
      setError: jest.fn()
    }
    expect(validateHandlers.validateSubmitForm(props)()).toBe(false)
  })
  test('invalidMinDish', () => {
    const props = {
      dishes: [{
        dishId: "1",
        numberOfServing: "4",
        isValid: false
      }, {
        dishId: "2",
        numberOfServing: "1",
        isValid: true
      }],
      numberOfPeople: "7",
      setError: jest.fn()
    }
    expect(validateHandlers.validateSubmitForm(props)()).toBe(false) 
  })
})