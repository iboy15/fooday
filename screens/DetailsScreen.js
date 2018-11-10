import React, {
    Component
  } from 'react';
  
  import {
    ScrollView,
    Button
  } from 'react-native';
  
  import {
    Icon,
    Row,
    Subtitle,
    Text,
    Title,
    View,
    ImageBackground,
    Divider,
    Tile
  } from '@shoutem/ui';
  
  export default class Details extends Component {
    
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Details',
     
      };
    };
  
    render() {
      // const { title, description, url, share_url,image_url} = this.props.navigation.state.params;
      const { title, description, url, share_url,image_url} = this.props.navigation.state.params;
  
      return (
        <ScrollView style = {{marginTop:-70}}>
          <ImageBackground styleName="large-portrait" source={{  uri: image_url }}>
            <Tile>
              <Title>{title}</Title>
              <Subtitle>{description}</Subtitle>
            </Tile>
          </ImageBackground>
  
          <Row>
            <Text>{description}</Text>
          </Row>
  
          <Divider styleName="line" />
  
          <Row>
            <Icon name="laptop" />
            <View styleName="vertical">
              <Subtitle>Visit webpage</Subtitle>
              <Text>{url}</Text>
            </View>
            <Icon name="right-arrow" />
          </Row>
  
          <Divider styleName="line" />
  
          <Row>
            <Icon name="pin" />
            <View styleName="vertical">
              <Subtitle>Address</Subtitle>
              <Text>{share_url}</Text>
            </View>
            <Icon name="right-arrow" />
          </Row>
  
          <Divider styleName="line" />
  
          <Row>
            <Icon name="email" />
            <View styleName="vertical">
              <Subtitle>Email</Subtitle>
              <Text>{share_url}</Text>
            </View>
          </Row>
  
          <Divider styleName="line" />
        </ScrollView>
      );
    }
  }