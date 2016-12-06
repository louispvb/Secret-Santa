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
  DatePickerAndroid,
  TouchableHighlight,
  Alert
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

class Card extends Component {
  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardTitle}>
          <Text style={styles.cardTitle.Text}>{this.props.title}</Text>
        </View>
        <View style={styles.children}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

class CreateSantaEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'ddfgdfg',
      date: 'Choose a day to exchange gifts',
    }
  }

  datePress = async () => {
    try {
      const {action, month, day, year} = await DatePickerAndroid.open({date: new Date()});
      if (action !== DatePickerAndroid.dismissedAction) {
        let dateStr = `${month} / ${day} / ${year}`;
        this.setState({
          date: dateStr
        });
      }
    } catch (e) {
      Alert.alert(this);
    }
  }
  // <TextInput
  // style={styles.input}
  // onChangeText={() => null}
  // value={this.state.text}
  // />
  // <Button
  // style={styles.button}
  // onPress={this.createButtonPress}
  // title="Create Event"
  // />

  render() {
    return (
      <View>
        <Card title="Date">
          <View>
            <TouchableHighlight
              onPress={this.datePress}>
              <Text>{this.state.date}</Text>
            </TouchableHighlight>
          </View>
        </Card>
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
  cardTitle: {
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 2.5,
    borderBottomColor: '#d6d7da',
    backgroundColor: '#f6f7f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cardTitleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardContainer: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
    margin: 10,
    marginVertical: 5,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    overflow: 'hidden',
  },
  children: {
    margin: 10
  },
  button: {
    width: windowWidth * .3,
    backgroundColor: 'crimson',
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
  },
});

AppRegistry.registerComponent('SecretSanta', () => SecretSanta);
