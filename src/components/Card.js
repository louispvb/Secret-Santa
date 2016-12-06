import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import Styles from './Styles'

export default class Card extends Component {
  render() {
    return (
      <View style={Styles.cardContainer}>
        <View style={Styles.cardTitle}>
          <Text style={Styles.cardTitleText}>{this.props.title}</Text>
        </View>
        <View style={Styles.children}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
