/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  Navigator,
  ToolbarAndroid,
  View,
  TextInput,
  Button,
  Dimensions,
  DatePickerAndroid
} from 'react-native';

//
// export default class SecretSanta extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//           helllo
//         </Text>
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
const windowWidth = Dimensions.get('window').width;

class CreateSantaEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'ddfgdfg'
    }
  }
  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={() => null}
          value={this.state.text}
        />
        <View style={{width: windowWidth * .5}}>
          <Button
            style={styles.button}
            onPress={() => null}
            title="Create Event"
          />
        </View>
      </View>
    );
  }
}

export default class SecretSanta extends Component {
  render() {
    const routes = [
      {title: 'Create An Event', index: 0},
      {title: 'Suggest a Gift', index: 1}
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, nav) => {
            return this.navRenderScene(route, nav);
        }}
        style={styles.navView}
        navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) =>
                { return (<Text>Back</Text>); },
               RightButton: (route, navigator, index, navState) =>
                 { return (<Text>Done</Text>); },
               Title: (route, navigator, index, navState) =>
                 { return (<Text>{route.title}</Text>); },
             }}
             style={styles.navBar}
           />
        } />
    );
  }

  navRenderScene(route, navigator) {
    if (route.index === 0) {
      return (<CreateSantaEvent />);
    }
    return (<Text>Oops, reached an invalid route</Text>);
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
  button: {
    width: windowWidth * .3,
    backgroundColor: 'crimson'
  },
  input: {
    height: 40,
    width: windowWidth * .8
  },
  navView: {
    paddingLeft: 20,
    paddingTop: 80
  },
  navBar: {
    backgroundColor: 'gainsboro',
    // height: 40,
    // paddingTop: 20,
    // paddingBottom: 20,
    // marginBottom: 20,
  },
});

AppRegistry.registerComponent('SecretSanta', () => SecretSanta);
