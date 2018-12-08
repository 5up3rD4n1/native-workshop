import React from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';

import NoteList from '../../components/NoteList';

import styles from './HomeScreen.styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Home',
  };

  constructor(props) {
    super(props);

    this.handleItemPress = this.handleItemPress.bind(this);
    this.handleAddNoteButtonPress = this.handleAddNoteButtonPress.bind(this);
  }

  handleAddNoteButtonPress() {
    this.props.navigation.push('NewNote');
  }

  handleItemPress(note) {
    this.props.navigation.push('Note', {noteId: note.id, title: note.title});
  }

  render() {
    return (
      <View style={styles.container}>
        <NoteList
          data={this.props.screenProps.notes}
          onItemPress={this.handleItemPress}
        />
        <View style={{position: 'absolute', right: 0, bottom: 0}}>
          <Button
            title="Add Note"
            onPress={this.handleAddNoteButtonPress}
          />
        </View>
      </View>
    );
  }

}















/**
 * An example on how to load images from the assets
 *             <Image
               source={
                      __DEV__
                        ? require('../../../assets/images/robot-dev.png')
                        : require('../../../assets/images/robot-prod.png')
                }
               style={styles.welcomeImage}
 />
 */


/**
 * How to open links
 *import { WebBrowser } from 'expo';
 *   _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

 _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
 */
