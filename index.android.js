import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Navigator,
  View,
  TouchableOpacity,
} from 'react-native';
import Styles from './src/components/Styles';
import SantaEventPage from './src/components/SantaEventPage';
import Card from './src/components/Card';
import GiftSwipeCards from './src/components/GiftSwipeCards'

export default class SecretSanta extends Component {
  constructor(props) {
    super(props);
    this.routes = [
      {title: 'Create An Event', index: 0},
      {title: 'Good Gifts?', index: 1}
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
        <TouchableOpacity onPress={() => navigator.pop()}>
          <Text style={Styles.navText}>Back</Text>
        </TouchableOpacity>
      )
    }
    return (<Text style={Styles.navText}>Back</Text>);
  }
  rightButton = (route, navigator, index, navState) => {
    return (
      <TouchableOpacity onPress={() => {
        if (route.index === 0) {
          navigator.push(this.routes[1]);
        }
      }}>
        <Text style={Styles.navText}>Done</Text>
      </TouchableOpacity>
    );
  }
  titleText = (route, navigator, index, navState) => {
    return (<Text style={Styles.navText}>{route.title}</Text>);
  }

  render() {
    return (
      <Navigator
        ref={(nav) => {navigator = nav;}}
        initialRoute={this.routes[1]}
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
      <GiftSwipeCards />
    ];
    if (route.index >= routeIndexed.length)
      return (<Text>Oops, reached an invalid route</Text>);
    return routeIndexed[route.index];
  }
}

AppRegistry.registerComponent('SecretSanta', () => SecretSanta);
