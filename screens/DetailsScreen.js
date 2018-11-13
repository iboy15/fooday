import React, { Component } from "react";

import {
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  View
} from "react-native";

import {
  Icon,
  Row,
  Subtitle,
  Text,
  Title,
  ImageBackground,
  Divider,
  Tile
} from "@shoutem/ui";

import { sliderWidth, itemWidth } from "./styles/SliderEntry.style";
import styles, { colors } from "./styles/index.style";
import Carousel from "react-native-snap-carousel";
// import LinearGradient from 'react-native-linear-gradient';
import { ENTRIES3, ENTRIES4, ENTRIES5 } from "./styles/entries";
import SliderEntryMenu from "./styles/SliderEntryMenu";

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      myData: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Details"
    };
  };

  _renderItem({ item, index }) {
    return <SliderEntryMenu data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderLightItem({ item, index }) {
    return <SliderEntryMenu data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntryMenu data={item} even={true} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntryMenu
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  layoutExample(title, subtitle, type) {
    const isTinder = type === "tinder";
    let x;
    if (title === "Foods") {
      x = ENTRIES3;
    } else if (title === "Drinks") {
      x = ENTRIES4;
    } else if (title === "Dessert") {
      x = ENTRIES5;
    }
    return (
      <View
        style={[
          styles.exampleContainer,
          isTinder ? styles.exampleContainerDark : styles.exampleContainerLight
        ]}>
        <Text style={styles.titledark}>{title}</Text>
        <Carousel
          data={x}
          renderItem={isTinder ? this._renderLightItem : this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop={true}
        />
      </View>
    );
  }

  render() {
    // const { title, description, url, share_url,image_url} = this.props.navigation.state.params;
    const { title, description, image } = this.props.navigation.state.params;
    const foods = this.layoutExample("Foods", "Choose Your Favorite", "stack");
    const drinks = this.layoutExample(
      "Drinks",
      "Choose Your Favorite",
      "stack"
    );

    const dessert = this.layoutExample(
      "Dessert",
      "Choose Your Favorite",
      "stack"
    );

    return (
      <ScrollView style={{ marginTop: -70 }}>
        <ImageBackground styleName="large-portrait" source={image}>
          <Tile>
            <Title>{title}</Title>
            <Subtitle>{description}</Subtitle>
          </Tile>
        </ImageBackground>

        <Row>
          <Text>{description}</Text>
        </Row>
        <View style={styles.exampleContainerDark}>
          <Text style={styles.title}>Menu</Text>
          <Text style={styles.subtitle}>Best Menu For You</Text>
          {foods}
          {drinks}
          {dessert}
        </View>
        <Divider styleName="line" />

        <Row>
          <Icon name="laptop" />
          <View styleName="vertical">
            <Subtitle>Visit webpage</Subtitle>
            <Text>{title}</Text>
          </View>
          <Icon name="right-arrow" />
        </Row>

        <Divider styleName="line" />

        <Row>
          <Icon name="pin" />
          <View styleName="vertical">
            <Subtitle>Address</Subtitle>
            <Text>{description}</Text>
          </View>
          <Icon name="right-arrow" />
        </Row>

        <Divider styleName="line" />

        <Row>
          <Icon name="email" />
          <View styleName="vertical">
            <Subtitle>Email</Subtitle>
            <Text>{description}</Text>
          </View>
        </Row>

        <Divider styleName="line" />
      </ScrollView>
    );
  }
}
