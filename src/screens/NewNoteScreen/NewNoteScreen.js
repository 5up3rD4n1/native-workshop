import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import isEmpty from 'lodash/isEmpty';
import uuid from 'uuid';

export default class NewNoteScreen extends React.Component {

  constructor(props) {
    super(props);

    this.handleButtonPress = this.handleButtonPress.bind(this);

    this.state = {
      title: '',
      content: ''
    }
  }

  handleButtonPress() {
    const {navigation, screenProps: {addNote}} = this.props;
    const {title, content} = this.state;

    const noteId = navigation.getParam('noteId', uuid());
    navigation.setParams({noteId});

    addNote({
      id: noteId,
      title,
      content
    });

    navigation.goBack();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          flexDirection: 'column',
          backgroundColor: '#fff'
        }}
      >
        <View>
          <Text>
            Title
          </Text>
        </View>
        <TextInput
          style={{backgroundColor: '#eee'}}
          value={this.state.title}
          onChangeText={t => this.setState({title: t})}
        />
        <View>
          <Text>
            Content
          </Text>
        </View>
        <TextInput
          style={{backgroundColor: '#eee', maxHeight: 100}}
          value={this.state.content}
          multiline={true}
          onChangeText={t => this.setState({content: t})}
          numberOfLines={4}
        />
        <Button
          title="Save"
          disabled={isEmpty(this.state.title)}
          onPress={this.handleButtonPress}
        />
      </View>
    )
  }
}