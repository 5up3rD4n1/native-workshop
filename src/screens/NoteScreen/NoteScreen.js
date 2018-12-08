import React from 'react';
import {Button, Text} from 'react-native';

export default class NoteScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'A Nested Details Screen'),
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Edit"
          color="#000"
        />
      ),
    };
  };

  render() {
    return (
      <Text>This is some text hello hello</Text>
    )
  }
}