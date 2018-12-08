import React from 'react';
import { Text, View, SectionList, TouchableOpacity } from 'react-native';

const ListItem = ({item, index, section, onItemPress}) => {
  return (
    <TouchableOpacity key={index} onPress={() => onItemPress(item)}>
      <Text>
        {item.title}
      </Text>
    </TouchableOpacity>
  )
};

export default (props) => {
  const {data} = props;

  return (
    <SectionList
      renderItem={(itemProps) => <ListItem {...itemProps} {...props}/>}
      renderSectionHeader={({section: {title}}) => (
        <View style={{fontWeight: 'bold', flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{title}</Text></View>
      )}
      sections={[
        {title: 'Notes', data}
      ]}
      keyExtractor={(item, index) => item + index}
    />
  );
}

