import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  ListView,
  ImageBackground,
  Title,
  Tile,
  Subtitle,
  Divider,
  Screen,
  NavigationBar,
  GridRow,
  Card,
  Image,
  Caption
} from "@shoutem/ui";

export default class RestaurantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      restaurants: [
        {
          name: "Gaspar Brasserie",
          address: "185 Sutter St, San Francisco, CA 94109",
          image: {
            uri:
              "https://shoutem.github.io/static/getting-started/restaurant-1.jpg"
          }
        },
        {
          name: "Chalk Point Kitchen",
          address: "527 Broome St, New York, NY 10013",
          image: {
            uri:
              "https://shoutem.github.io/static/getting-started/restaurant-2.jpg"
          }
        },
        {
          name: "Kyoto Amber Upper East",
          address: "225 Mulberry St, New York, NY 10012",
          image: {
            uri:
              "https://shoutem.github.io/static/getting-started/restaurant-3.jpg"
          }
        },
        {
          name: "Gaspar Brasserie",
          address: "185 Sutter St, San Francisco, CA 94109",
          image: {
            uri:
              "https://shoutem.github.io/static/getting-started/restaurant-1.jpg"
          }
        },
        {
          name: "Chalk Point Kitchen",
          address: "527 Broome St, New York, NY 10013",
          image: {
            uri:
              "https://shoutem.github.io/static/getting-started/restaurant-2.jpg"
          }
        },
        {
          name: "Kyoto Amber Upper East",
          address: "225 Mulberry St, New York, NY 10012",
          image: {
            uri:
              "https://shoutem.github.io/static/getting-started/restaurant-3.jpg"
          }
        }
      ]
    };
  }
  static navigationOptions = {
    title: "Newly Opened Restaurant"
  };
  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow
    const { navigation } = this.props;
    if (index === "0") {
      const title = rowData[0].name;
      const description = rowData[0].address;
      const image = rowData[0].image;
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("Details", { title, description, image })
          }>
          <ImageBackground styleName="large" source={rowData[0].image}>
            <Tile>
              <Title styleName="md-gutter-bottom">{rowData[0].name}</Title>
              <Subtitle styleName="sm-gutter-horizontal">
                {rowData[0].address}
              </Subtitle>
            </Tile>
          </ImageBackground>
          <Divider styleName="line" />
        </TouchableOpacity>
      );
    }

    const cellViews = rowData.map((restaurant, id) => {
      const title = restaurant.name;
      const description = restaurant.address;
      const image = restaurant.image;
      return (
        <TouchableOpacity
          key={id}
          styleName="flexible"
          onPress={() =>
            navigation.navigate("Details", { title, description, image })
          }>
          <Card styleName="flexible">
            <Image styleName="medium-wide" source={restaurant.image} />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{restaurant.name}</Subtitle>
              <View styleName="horizontal">
                <Caption styleName="collapsible" numberOfLines={2}>
                  {restaurant.address}
                </Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });

    return <GridRow columns={2}>{cellViews}</GridRow>;
  }

  render() {
    const restaurants = this.state.restaurants;
    // Group the restaurants into rows with 2 columns, except for the
    // first restaurant. The first restaurant is treated as a featured restaurant
    let isFirstArticle = true;
    const groupedData = GridRow.groupByRows(restaurants, 2, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 2;
      }
      return 1;
    });

    return (
      <Screen>
        <ListView
          navigation={this.props.navigation}
          data={groupedData}
          renderRow={this.renderRow.bind(this)}
        />
      </Screen>
    );
  }
}
