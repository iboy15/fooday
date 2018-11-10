const intialState = {
    restaurantData : [],
}

const restaurantReducer = (state = intialState, action) => {
    switch (action.type) {
        default:
            return state
            
        case 'ADD_RESTAURANT':
            return {
                ...state,
                restaurantData : action.payload.restaurants,
            }
    }
}

export default restaurantReducer