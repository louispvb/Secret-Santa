import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  DatePickerAndroid,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Card from './Card';
import FriendPicker from './FriendPicker';
import Styles from './Styles';

export default class SantaEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <View style={{paddingTop: 80}}>
        <Card title="Set a Date">
          <View>
            <TouchableOpacity
              onPress={this.datePress}>
              <Text>{this.state.date}</Text>
            </TouchableOpacity>
          </View>
        </Card>
        <FriendPicker />
        <Card title="Pick a theme">
          <TextInput
            style={Styles.input}
            placeholder="Humor & Candy"
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this.addFriend} />
        </Card>
        <View style={{marginTop: 30, marginHorizontal: 40}}>
          <Button title="Finish" onPress={()=>null} color='rgb(231, 59, 59)'/>
        </View>
      </View>
    );
  }
}
