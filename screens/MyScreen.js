import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  Platform
} from "react-native";
import Carousel from "react-native-snap-carousel";
import MapView from "react-native-maps";
import { withNavigation } from "react-navigation";
import SliderEntryMaps from "./styles/SliderEntryMaps";
import { connect } from "react-redux";
import { fetchMaps } from "../redux/actions/restaurant";

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

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.05;
const slideWidth = wp(50);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
class MyScreen extends React.Component {
  state = {
    scrolledX: 0,
    markers: [
      {
        coordinate: {
          latitude: -6.2350734451,
          longitude: 106.8134050816
        },
        title: "Sushi Haha",
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
      latitudeDelta: 0.06,
      longitudeDelta: 0.06
    }
  };
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
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
  _renderItem({ item, index }) {
    return (
      <View style={styles.card} key={index}>
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.textContent}>
          <Text numberOfLines={1} style={styles.cardtitle}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.cardDescription}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  }
  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntryMaps
        data={item}
        navigation={this.props.navigation}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }
  render() {
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
      return {
        scale,
        opacity
      };
    });
    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}>
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
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.View
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}>
          <Carousel
            navigation={this.props.navigation}
            style={styles.carouselStyle}
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.markers}
            height={260}
            renderItem={this._renderItemWithParallax.bind(this)}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            onScroll={event => {
              this.animation.setValue(event.nativeEvent.contentOffset.x);
            }}
            useScrollView={true}
          />
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  carouselStyle: {
    padding: 25
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,153,102, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,153,102, 0.5)",
    position: "absolute",
    borderWidth: 0.5,
    borderColor: "rgba(0,153,102, 0.5)"
  }
});
export default withNavigation(MyScreen);
