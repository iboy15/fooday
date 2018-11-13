import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity
} from "react-native";

import { AppLoading } from "expo";
import { connect } from "react-redux";
import { fetchMaps } from "../redux/actions/restaurant";
import MapView from "react-native-maps";
const Images = [
  {
    uri:
      "https://b.zmtcdn.com/data/pictures/3/18567253/234c8d74022f82e43556504198cbb885.jpg"
  },
  {
    uri:
      "https://b.zmtcdn.com/data/reviews_photos/5ca/51f7802da8b7ec1e9a3dc3dbee8065ca_1518958801.jpg"
  },
  {
    uri:
      "https://b.zmtcdn.com/data/pictures/1/18744701/d13f600237899732f089e662ba109012.jpg"
  },
  {
    uri:
      "https://b.zmtcdn.com/data/pictures/3/18567253/234c8d74022f82e43556504198cbb885.jpg"
  },
  {
    uri:
      "https://b.zmtcdn.com/data/reviews_photos/7aa/7e2f2d04a1d98c53137939e853c5e7aa_1513668658.jpg"
  }
];

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 20;

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

class MapsScreen extends React.Component {
  static navigationOptions = {
    tabBarVisible: false,
    title: "Foods Around You"
  };
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      markers: [
        {
          coordinate: {
            latitude: -6.2350734451,
            longitude: 106.8134050816
          },
          title: "Sushi Hiro",
          description: "Sushi, Japanese",
          image: Images[0]
        },
        {
          coordinate: {
            latitude: -6.2283835483,
            longitude: 106.8555476144
          },
          title: 'Sate Taichan "Goreng"',
          description: "Satay",
          image: Images[1]
        },
        {
          coordinate: {
            latitude: -6.1104808747,
            longitude: 106.7377671227
          },
          title: "Wan Treasures",
          description: "Asian, Chinese, Dimsum",
          image: Images[2]
        },
        {
          coordinate: {
            latitude: -6.1697409906,
            longitude: 106.8993132189
          },
          title: "Sushi Hiro",
          description: "Sushi, Japanese",
          image: Images[3]
        },
        {
          coordinate: {
            latitude: -6.1953134363,
            longitude: 106.8199607357
          },
          title: "Sushi Go!",
          description: "Sushi, Japanese",
          image: Images[4]
        }
      ],
      region: {
        latitude: -6.205695,
        longitude: 106.8384574,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08
      }
    };
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.props.fetchMaps();
    console.log(maps);

    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    // const {maps} =  this.props;
    // if(!maps.length)
    // return null;

    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp"
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp"
      });
      return { scale, opacity };
    });
    return (
      <View style={mapstyles.container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={mapstyles.container}>
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale
                }
              ]
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity
            };

            // const mycoordinate = {
            //   latitude: -6.205695,
            //   longitude: 106.8384574,
            // }

            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[mapstyles.markerWrap, opacityStyle]}>
                  <Animated.View style={[mapstyles.ring, scaleStyle]} />
                  <View style={mapstyles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          style={mapstyles.scrollView}
          contentContainerStyle={mapstyles.endPadding}>
          {this.state.markers.map((marker, index) => (
            <View style={mapstyles.card} key={index}>
              <TouchableOpacity
                onPress={() =>
                  this.handleClick(restaurant.collection.collection_id)
                }>
                <Image
                  // source={{ uri: marker.restaurant.thumb.split('?')[0]}}
                  source={marker.image}
                  style={mapstyles.cardImage}
                  resizeMode="cover"
                />

                <View style={mapstyles.textContent}>
                  <Text numberOfLines={1} style={mapstyles.cardtitle}>
                    {marker.title}
                  </Text>
                  <Text numberOfLines={1} style={mapstyles.cardDescription}>
                    {marker.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const mapstyles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});

const mapStateToProps = state => {
  return {
    maps: state.restaurants.mapData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMaps: () => dispatch(fetchMaps())
  };
};

MapsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapsScreen);

export default MapsScreen;
