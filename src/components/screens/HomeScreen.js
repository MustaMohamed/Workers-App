import React from "react";
import { Text, StyleSheet } from "react-native";
import { Container, Button, Form, Item, Input, Title, Body, Header, Content } from 'native-base';
import { connect } from 'react-redux'

// redux
import { userLogin } from '../../redux-store/actions';

// services
import { validationService } from '../../services/';

// constants
import { validationConstants } from '../../constants';

// Expo
import { Contacts, Permissions, Constants } from 'expo';
import ContactsList from "../generic/ContactsList";


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() : void {
        Permissions.askAsync(Permissions.CONTACTS)
            .then(perm => {
                console.log(perm);
                Contacts.getContactsAsync({})
                    .then(res => {
                        console.log('Contacts => ', res);
                        this.setState({ contactsList: res.data })
                    })
                    .catch(err => console.log(err));
            });
    }

    render() {
        return (
            <Container style={ styles.container }>
                <Header>
                    <Body>
                        <Title>Contacts</Title>
                    </Body>
                </Header>
                <Content>
                    { this.state.contactsList && <ContactsList contactsList={ this.state.contactsList }/> }
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return user;
};

export default connect(mapStateToProps, {})(HomeScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'flex-start'
    },
    form: {},
    formItem: {
        marginVertical: 20,
        borderColor: '#2c3e50',
        direction: 'rtl'
    },
    itemError: {
        borderColor: '#e74c3c',
        color: '#e74c3c'
    },
    inputText: {
        color: '#34495e',
        paddingLeft: 5,
        paddingTop: 0
    },
    input: {},
    button: {
        marginTop: 50,
        backgroundColor: '#2c3e50',
    },
    buttonText: {
        color: '#ecf0f1',
        fontWeight: 'bold',
        fontSize: 22
    }
});