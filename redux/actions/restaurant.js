import axios from 'axios'

export const fetchRestaurant  = () => {
    return (dispatch) => {
        axios.get('https://developers.zomato.com/api/v2.1/collections?city_id=1&count=5',
        { headers: { 'user-key' : 'f9b739f79b51fddcac1d73d3c936b453'  }})
            .then(response => {
                const restaurants = response.data
                dispatch({
                    type : 'ADD_RESTAURANT',
                    payload : {
                        restaurants : restaurants.collections
                    }
                })
            })
    }
}

export const fetchMaps = () => {
    return (dispatch) => {
        axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=10',
        { headers: { 'user-key' : 'f9b739f79b51fddcac1d73d3c936b453'  }})
            .then(response => {
                const maps = response.data
                dispatch({
                    type : 'ADD_MAP',
                    payload : {
                        maps : maps.restaurants
                    }
                })
            })
    }
}