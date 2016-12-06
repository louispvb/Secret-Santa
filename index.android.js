import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Navigator,
  View,
  TouchableHighlight,
} from 'react-native';
import Styles from './src/components/Styles.js';
import SantaEventPage from './src/components/SantaEventPage.js';
import Card from './src/components/Card.js';

export default class SecretSanta extends Component {
  constructor(props) {
    super(props);
    this.routes = [
      {title: 'Create An Event', index: 0},
      {title: 'Suggest a Gift', index: 1}
    ];
    // var navigator;
    // BackAndroid.addEventListener('hardwareBackPress', () => {
    //   if (navigator) {
    //     navigator.pop();
    //     Alert.alert('b');
    //   }
    //   return true;
    // });
  }

  leftButton = (route, navigator, index, navState) => {
    if (route.index === 0) {
      return null;
    } else {
      return (
        <TouchableHighlight onPress={() => navigator.pop()}>
          <Text style={Styles.navText}>Back</Text>
        </TouchableHighlight>
      )
    }
    return (<Text style={Styles.navText}>Back</Text>);
  }
  rightButton = (route, navigator, index, navState) => {
    return (
      <TouchableHighlight onPress={() => {
        if (route.index === 0) {
          navigator.push(this.routes[1]);
        }
      }}>
        <Text style={Styles.navText}>Done {index}</Text>
      </TouchableHighlight>
    );
  }
  titleText = (route, navigator, index, navState) => {
    return (<Text style={Styles.navText}>{route.title}</Text>);
  }

  render() {
    return (
      <Navigator
        ref={(nav) => {navigator = nav;}}
        initialRoute={this.routes[0]}
        initialRouteStack={this.routes}
        renderScene={(route, nav) => {
            return this.navRenderScene(route, nav);
        }}
        style={Styles.navView}
        navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: this.leftButton,
               RightButton: this.rightButton,
               Title: this.titleText,
             }}
             style={Styles.navBar}
           />
        } />
    );
  }

  navRenderScene(route, navigator) {
    let routeIndexed = [
      <SantaEventPage />,
      <Text>Hi</Text>
    ];
    if (route.index >= routeIndexed.length)
      return (<Text>Oops, reached an invalid route</Text>);
    return routeIndexed[route.index];
  }
}

AppRegistry.registerComponent('SecretSanta', () => SecretSanta);
