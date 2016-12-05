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
  View
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

class HomePage extends Component {
  render() {
    return <Text>This is the homepage</Text>;
  }
}

export default class SecretSanta extends Component {
  render() {
    return (
      <View>
        <ToolbarAndroid
          logo={require('./assets/logo.svg')}
          title="Secret Santa" />
        <Navigator
          initialRoute={{name: 'My First Scene', index: 0}}
          renderScene={this.navRenderScene} />
      </View>);
  }

  navRenderScene(route, navigator) {
    return (
      <HomePage
        name={route.name}
        onForward={() => {
          var nextIndex = route.index + 1;
          navigator.push({
            name: 'Scene ' + nextIndex,
            index: nextIndex,
          });
        }}
        onBack={() => {
          if (route.index > 0) {
            navigator.pop();
          }
        }}/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SecretSanta', () => SecretSanta);
