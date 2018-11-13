import React from "react";
import { Button, StyleSheet } from "react-native";
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
  Html
} from "@shoutem/ui";
import { InlineMap } from "@shoutem/ui-addons";

import SocialButton from "./styles/SocialButton";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "About Me"
  };

  renderImage() {
    return (
      <Image
        styleName="large"
        source={{
          uri:
            "http://s3.amazonaws.com/v4.static.shoutem.com/apps/267/imageqnW38M_1hUKupHfMzVf1tQ.png"
        }}
        // defaultSource={require('../assets/images/image-fallback.png')}
        animationName="hero"
      />
    );
  }

  renderTitle() {
    return (
      <View styleName="lg-gutter-bottom">
        <Title styleName="xl-gutter-top xl-gutter-bottom h-center">
          Iboy's
        </Title>
      </View>
    );
  }

  renderInfo() {
    return (
      <View styleName="md-gutter-horizontal md-gutter-bottom">
        <Html
          body={`<b>Programmer Ganteng</b> <br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. `}
        />
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
          <Caption>Tes Iboy</Caption>
        </Divider>
        <TouchableOpacity onPress={openMap}>
          <InlineMap
            initialRegion={region}
            markers={[marker]}
            selectedMarker={marker}
            styleName="medium-tall">
            <View styleName="overlay vertical v-center h-center fill-parent">
              <Subtitle>{`Iboyzzzzz`}</Subtitle>
              <Caption>{`Iboy Location`}</Caption>
            </View>
          </InlineMap>
        </TouchableOpacity>
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
    return (
      <ScrollView>
        {this.renderImage()}
        <View styleName="solid">
          {this.renderTitle()}
          {this.renderInfo()}
          {this.renderMap()}
          {/* {this.renderOpeningHours()} */}
          {this.renderFooterButtons()}
          <Divider />
        </View>
      </ScrollView>
    );
  }
}
