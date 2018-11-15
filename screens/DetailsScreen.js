import React, { Component } from "react";

import { StyleSheet, Platform, SafeAreaView, StatusBar } from "react-native";

import {
  Screen,
  Spinner,
  Title,
  Image,
  View,
  Divider,
  Caption,
  Subtitle,
  TouchableOpacity,
  ScrollView,
  Html,
  Text,
  ImageBackground,
  Tile,
  Row,
  Icon
} from "@shoutem/ui";
import { InlineMap } from "@shoutem/ui-addons";

import SocialButton from "./styles/SocialButton";

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

  layoutExample(title, type) {
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
        style={
          isTinder ? styles.exampleContainerDark : styles.exampleContainerLight
        }>
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
  renderOpeningHours() {
    return (
      <View styleName="vertical">
        <Divider styleName="section-header">
          <Caption>Opening Hours</Caption>
        </Divider>
        <View styleName="md-gutter-horizontal md-gutter-top">
          <Html
            body={`
            <p>
            Monday-Friday:
            <br>
            9:00 -19:15
            </p>
            <p>
            Saturday:
            <br>
            10:00 -22:00
            <p>
            Sunday:
            <br>
            Closed
            </p>
            `}
          />
        </View>
        <Divider />
      </View>
    );
  }
  renderMap() {
    const marker = {
      latitude: parseFloat(40.6781784),
      longitude: parseFloat(-73.9441579),
      title: "iboy addres"
    };

    const region = {
      longitude: marker.longitude,
      latitude: marker.latitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03
    };

    const openMap = () =>
      navigateTo({
        screen: ext("MapScreen"),
        props: { marker, title: profile.name }
      });

    return (
      <View>
        <Divider styleName="section-header">
          <Caption>Find Us on Maps</Caption>
        </Divider>
        <TouchableOpacity onPress={openMap}>
          <InlineMap
            initialRegion={region}
            markers={[marker]}
            selectedMarker={marker}
            styleName="medium-tall">
            <View styleName="overlay vertical v-center h-center fill-parent">
              <Subtitle>{`Iboyzzzzz`}</Subtitle>
              <Caption>{`Restaurant Location`}</Caption>
            </View>
          </InlineMap>
        </TouchableOpacity>
      </View>
    );
  }
  renderInfo() {
    return (
      <View styleName="md-gutter-horizontal md-gutter-bottom">
        <Divider styleName="section-header">
          <Caption>About Resto</Caption>
        </Divider>
        <Html
          body={`<b>About Restoran</b> <br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. `}
        />
      </View>
    );
  }

  renderFooterButtons() {
    return (
      <View styleName="horizontal h-center">
        <View styleName="horizontal h-start wrap">
          <SocialButton
            icon="web"
            url="iboy_ishak.com"
            title="Visit webPage"
            // openURL={openURL}
          />
          <SocialButton
            icon="call"
            url={"087889356310" && `tel:087889356310`}
            title="Phone"
          />
          <SocialButton
            icon="tweet"
            url="https://twitter.com/iboy_ishak"
            title="Twitter"
            // openURL={openURL}
          />
          <SocialButton
            icon="email"
            url={"iboy_ishak@yahoo.com" && `mailto:iboy_ishak@yahoo.com`}
            title="email"
          />
          <SocialButton
            icon="linkedin"
            url="https://www.linkedin.com/in/iboy-ishak-4b81174b/"
            title="LinkedIn"
            // openURL={openURL}
          />
          <SocialButton
            icon="facebook"
            url="https://www.facebook.com/iboy.ishak.Disappear"
            title="Facebook"
            // openURL={openURL}
          />
        </View>
      </View>
    );
  }

  render() {
    // const { title, description, url, share_url,image_url} = this.props.navigation.state.params;
    const { title, description, image } = this.props.navigation.state.params;
    const foods = this.layoutExample("Foods", "stack");
    const drinks = this.layoutExample("Drinks", "tinder");

    const dessert = this.layoutExample("Dessert", "stack");

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
        <View styleName="solid">
          {this.renderInfo()}
          {this.renderOpeningHours()}
          {this.renderMap()}

          {this.renderFooterButtons()}
          <Divider />
        </View>
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
