const intialState = {
  restaurantData: [],
  mapData: []
};

const restaurantReducer = (state = intialState, action) => {
  switch (action.type) {
    default:
      return state;

    case "ADD_RESTAURANT":
      return {
        ...state,
        restaurantData: action.payload.restaurants
      };
    case "ADD_MAP":
      return {
        ...state,
        mapData: action.payload.maps
      };
  }
};

export default restaurantReducer;
