import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native'
import Contact from "./Contact";

class ContactsList extends Component {
    render() {
        let list = [];
        for (let i = 0; i < 15; i++)
            this.props.contactsList.map(item => list.push(item));
        return (
            <FlatList data={ list }
                      keyExtractor={ (item, idx) => item.id + '_' + idx }
                      renderItem={ ({ item }) => (
                          <TouchableOpacity
                              onPress={ () => console.log(item) }
                          >
                              <Contact key={ item.id } { ...item } />
                          </TouchableOpacity> ) }>

            </FlatList>
        );
    }
}

ContactsList.propTypes = {
    contactsList: PropTypes.array
};

export default ContactsList;

