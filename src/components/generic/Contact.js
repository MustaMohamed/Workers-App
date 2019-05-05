import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';


class Contact extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (

            <ListItem avatar={ this.props.imageAvailable }>
                { this.props.imageAvailable && <Left>
                    <Thumbnail source={ { uri: this.props.image.uri } }/>
                </Left>
                }
                <Body>
                    <Text>{ this.props.name }</Text>
                    {this.props.phoneNumbers && <Text>{ this.props.phoneNumbers[0].number || '' }</Text>}
                </Body>
            </ListItem>

        );
    }
}

export default Contact;