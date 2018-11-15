const intialState = {
  restaurantData: [],
  mapData: [],
  restoData: []
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
    case "ADD_RESTO":
      return {
        ...state,
        restoData: action.payload.resto
      };
  }
};

export default restaurantReducer;
