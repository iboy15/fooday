import axios from "axios";

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAjOWg3D-R6Ye6NYDO5lrU58m7qj8v6hBc",
  authDomain: "foodsay-bc186.firebaseapp.com",
  databaseURL: "https://foodsay-bc186.firebaseio.com",
  projectId: "foodsay-bc186",
  storageBucket: "foodsay-bc186.appspot.com",
  messagingSenderId: "1029783140111"
};

firebase.initializeApp(firebaseConfig);

// export const fetchRestaurant = () => {
//   return dispatch => {
//     firebase
//       .database()
//       .ref("/menuutama")
//       .on("value", function(snapshot) {
//         const restaurants = snapshot.val();
//         console.log(snapshot.val());
//         dispatch({
//           type: "ADD_RESTAURANT",
//           payload: {
//             restaurants: restaurants.menu
//           }
//         });
//       });
//   };
// };

export const fetchRestaurant = () => {
  return dispatch => {
    axios
      .get(
        "https://developers.zomato.com/api/v2.1/collections?city_id=74&count=4",
        { headers: { "user-key": "f9b739f79b51fddcac1d73d3c936b453" } }
      )
      .then(response => {
        const restaurants = response.data;
        dispatch({
          type: "ADD_RESTAURANT",
          payload: {
            restaurants: restaurants.collections
          }
        });
      });
  };
};

export const fetchMaps = () => {
  return dispatch => {
    firebase
      .database()
      .ref("/restaurant")
      .on("value", function(snapshot) {
        const maps = snapshot.val();
        //console.log(snapshot.val());
        dispatch({
          type: "ADD_MAP",
          payload: {
            maps: maps.restaurant
          }
        });
      });
  };
};

// export const fetchMaps = () => {
//   return dispatch => {
//     axios
//       .get(
//         "https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=10",
//         { headers: { "user-key": "f9b739f79b51fddcac1d73d3c936b453" } }
//       )
//       .then(response => {
//         const maps = response.data;
//         dispatch({
//           type: "ADD_MAP",
//           payload: {
//             maps: maps.restaurants
//           }
//         });
//       });
//   };
// };
