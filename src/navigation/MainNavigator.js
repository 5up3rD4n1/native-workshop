import React from 'react';

import omit from 'lodash/omit';
import keys from 'lodash/keys';
import remove from 'lodash/remove';

import { AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Home from '../screens/HomeScreen';
import Note from '../screens/NoteScreen';
import NewNote from '../screens/NewNoteScreen';

const StackNavigator = createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Home: Home,
  Note: Note,
  NewNote: NewNote
}, {
  initialRoute: 'Home'
});

export default class MainNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
    this.noteList = this.noteList.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

    this.state = {
      notes: {},
      order: []
    }
  }

  dispatch(action) {
    const {state} = this;

    let newState;

    switch (action.type) {
      case 'ADD':
        newState = {
          notes: {
            ...state.notes,
            [action.note.id]: action.note
          },
          order: [
            ...state.order,
            action.note.id
          ]
        };
        break;
      case 'DELETE':
        const notes = omit(action.id);
        const order = remove(keys(notes), id => id === action.id);
        newState = {
          notes,
          order
        };
        break;
      default:
        break;
    }

    if (newState) {
      this.setState(newState);
    }
  }

  addNote(note) {
    this.dispatch({
      type: 'ADD',
      note
    });
  }

  deleteNote(id) {
    this.dispatch({
      type: 'DELETE',
      id
    });
  }

  componentDidMount() {
    this._retrieveData();
  }

  componentDidUpdate() {
    // console.log(this.state);
    this._storeData();
  }

  _storeData = async () => {
    try {
      const {notes, order} = this.state;

      const data = {
        notes,
        order
      };

      //console.log("Saving data into local storage");
      await AsyncStorage.setItem('@NativeWorkshop:notes', JSON.stringify(data));
    } catch (error) {
      // Error saving data
      console.log("Error trying to save data to the local storage");
      console.log(error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@NativeWorkshop:notes');
      if (value !== null) {
        // We have data!!
        //console.log('Loading data to the app', value);
        const data = JSON.parse(value);
        this.setState(data);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error trying to load data from the local storage");
      console.log(error);
    }
  };

  noteList() {
    const {notes, order} = this.state;
    return order.map(id => notes[id]);
  }

  componentWillUnmount() {
    this._storeData();
  }

  render() {
    const props = {
      notes: this.noteList(),
      addNote: this.addNote,
      deleteNote: this.deleteNote
    };

    return (
      <StackNavigator
        screenProps={props}
      />
    )
  }
}