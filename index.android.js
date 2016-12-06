import React, { Component } from 'react';
import * as _ from 'lodash/fp';
_.map = _.map.convert({'cap': false});
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
          <Text style={styles.cardTitleText}>{this.props.title}</Text>
        </View>
        <View style={styles.children}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

class FriendPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      friendsList: []
    }
  }

  addFriend = () => {
    if (this.state.text.length) {
      let newFList = this.state.friendsList;
      newFList.push(this.state.text);
      this.setState({
        friendsList: newFList
      });
      this._textInput.setNativeProps({text: ''})
      this.setState({text: ''});
    }
  }

  render() {
    return (
      <Card title="Invite Your Friends">
        <View style={{flex: 1, flexDirection: 'row', height: 40}}>
          <View style={{flex: .6}}>
            <TextInput
              ref={component => this._textInput = component}
              style={styles.input}
              placeholder="Friend's name"
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={this.addFriend} />
          </View>
          <View>
            <Button
              title="Add"
              onPress={this.addFriend}
              color="#777"/>
          </View>
        </View>
        <View>
          {_.map((f, i) => (
            <Text key={i} style={styles.listItem}>{'   • ' + f}</Text>),
            this.state.friendsList
          )}
        </View>
      </Card>
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

  render() {
    return (
      <View>
        <Card title="Set a Date">
          <View>
            <TouchableHighlight
              onPress={this.datePress}>
              <Text>{this.state.date}</Text>
            </TouchableHighlight>
          </View>
        </Card>
        <FriendPicker />
        <View style={{marginTop: 30, marginHorizontal: 40}}>
          <Button title="Finish" onPress={()=>null} />
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
                { return (<Text style={styles.navText}>Back</Text>); },
               RightButton: (route, navigator, index, navState) =>
                 { return (<Text style={styles.navText}>Done</Text>); },
               Title: (route, navigator, index, navState) =>
                 { return (<Text style={styles.navText}>{route.title}</Text>); },
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
    fontSize: 16,
    fontWeight: '500',
  },
  cardContainer: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
    margin: 10,
    marginVertical: 5,
    overflow: 'hidden',
  },
  listItem: {
    fontWeight: '400',
    fontSize: 14
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
  },
  navView: {
    paddingTop: 80
  },
  navText: {
    margin: 8,
    marginTop: 15,
    fontSize: 16
  },
  navBar: {
    backgroundColor: 'gainsboro',
    padding: 20,
  },
  // completeButton: {
  //   // flexDirection: 'row-reverse',
  //   // justifyContent: 'space-between',
  //   // marginVertical: 10,
  //   // marginHorizontal: 10,
  //   backgroundColor: '#ff6347',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0
  // }
});

AppRegistry.registerComponent('SecretSanta', () => SecretSanta);
