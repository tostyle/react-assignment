import reducer, * as order from "../order"

describe("orderReducer", () => {
  describe("changeOrder", () => {
    test("random payload", () => {
      const payload = { name: "a", value: "1" }
      const state = reducer(undefined, order.changeOrder(payload))
      expect(state).toEqual(order.getInitState())
    })
    test("normal payload", () => {
      const payload = { name: "numberOfPeople", value: "5" }
      const state = reducer(undefined, order.changeOrder(payload))
      expect(state).toEqual({
        ...order.getInitState(),
        [payload.name]: payload.value
      })
    })
  })

  describe("addDish", () => {
    test("normal payload", () => {
      const payload = { id: "1", dishId: "1", numberOfServing: "5" }
      const state = reducer(undefined, order.addDish(payload))
      expect(state.dishes).toEqual([payload])
    })
  })

  describe("editDish", () => {
    test("empty dishes", () => {
      const payload = { id: "1", dishId: "1", numberOfServing: "5" }
      const state = reducer(undefined, order.editDish(payload))
      expect(state.dishes).toEqual([])
    })

    test("have dishes", () => {
      const payload = { id: "1", dishId: "1", numberOfServing: "5" }
      const state = reducer(
        {
          dishes: [
            {
              id: "1"
            }
          ]
        },
        order.editDish(payload)
      )
      expect(state.dishes).toEqual([payload])
    })
  })

  describe("removeDish", () => {
    test("empty dishes", () => {
      const payload = "1"
      const state = reducer(undefined, order.removeDish(payload))
      expect(state.dishes).toEqual([])
    })

    test("have dishes", () => {
      const payload = "1"
      const state = reducer(
        {
          dishes: [
            {
              id: "1"
            }
          ]
        },
        order.removeDish(payload)
      )
      expect(state.dishes).toEqual([])
    })
  })
})
