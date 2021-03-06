import React from "react";
import { TouchableOpacity } from "react-native";
import { AppLoading, Font } from "expo";

import {
  ListView,
  ImageBackground,
  Title,
  Tile,
  Subtitle,
  Screen
} from "@shoutem/ui";
import { connect } from "react-redux";
import { fetchRestaurant } from "../redux/actions/restaurant";
import { withNavigation } from "react-navigation";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {};
  }

  state = {
    fontsAreLoaded: false
  };

  componentDidMount() {
    this.props.fetchRestaurant();
  }

  handleClick = id => {
    switch (id) {
      case 274852:
        return this.props.navigation.navigate("Events");
      case 277744:
        return this.props.navigation.navigate("Restaurant");
      case 1:
        return this.props.navigation.navigate("Maps");
      case 29:
        return this.props.navigation.navigate("Category");
    }
  };

  async componentWillMount() {
    await Font.loadAsync({
      "Rubik-Black": require("../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf"),
      "Rubik-BlackItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf"),
      "Rubik-Bold": require("../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf"),
      "Rubik-BoldItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf"),
      "Rubik-Italic": require("../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf"),
      "Rubik-Light": require("../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf"),
      "Rubik-LightItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf"),
      "Rubik-Medium": require("../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf"),
      "Rubik-MediumItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf"),
      "Rubik-Regular": require("../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
      "rubicon-icon-font": require("../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf")
    });

    this.setState({
      fontsAreLoaded: true
    });
  }
  renderRow(restaurant) {
    return (
      // <TouchableOpacity onPress={() =>
      //   this.props.navigation.navigate('Details', {...restaurant.collection})}>
      <TouchableOpacity
        onPress={() => this.handleClick(restaurant.collection.collection_id)}>
        <ImageBackground
          styleName="large-banner"
          source={{ uri: restaurant.collection.image_url }}>
          <Tile>
            <Title>{restaurant.collection.title}</Title>
            <Subtitle>{restaurant.collection.description}</Subtitle>
          </Tile>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  static navigationOptions = {
    title: "Home",
    header: null
  };

  render() {
    const { restaurants } = this.props;
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <Screen>
        {restaurants.length <= 0 ? (
          <AppLoading />
        ) : (
          <ListView
            data={restaurants}
            renderRow={restaurant => this.renderRow(restaurant)}
          />
        )}
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants.restaurantData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurant: () => dispatch(fetchRestaurant())
  };
};

HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

export default withNavigation(HomeScreen);
