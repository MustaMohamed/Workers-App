import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Container, Button, Form, Item, Input, Label, Icon, Spinner, Toast } from 'native-base';
import { connect } from 'react-redux'

// redux
import { userLogin } from '../../redux-store/actions';

// services
import { validationService } from '../../services/';

// constants
import { validationConstants } from '../../constants';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: {
                value: '',
                validationTypes: [
                    validationConstants.NOT_EMPTY,
                    validationConstants.VALID_EMAIL,
                    validationConstants.CONTAINS_SPECIAL_CHARACTERS
                ]
            },
            password: {
                value: '',
                validationTypes: [
                    validationConstants.NOT_EMPTY,
                ]
            },
            userNameHasError: false,
            passwordHasError: false,
            formError: false,
            requestTime: 0
        };
        this.initState = Object.assign({}, this.state, {});
    }

    componentWillReceiveProps(nextProps : Readonly<P>, nextContext : any) : void {
        // console.log(nextProps);
        if (nextProps.user && !nextProps.blockUiSpinner) {
            this.props.navigation.navigate('Home');
        } else {
            if (( new Date ).getTime() - this.state.requestTime > 5000) {
                this.setState(Object.assign({}, this.initState));
                Toast.show({ text: 'Please check internet connection !', type: 'danger' });
            }
        }
    }


    onUsernameChange = (text) => {
        const { userName } = this.state;
        this.setState({ userName: Object.assign({}, userName, { value: text }) });
    };

    onPasswordChange = (text) => {
        const { password } = this.state;
        this.setState({ password: Object.assign({}, password, { value: text }) });
    };

    handleUserLogin = () => {
        const { userName, password } = this.state;
        let user = {
            userName: userName.value,
            password: password.value,
            loginDate: ( new Date() ).toLocaleString()
        };
        if (this._formValidation()) {
            this.setState({ requestTime: ( new Date ).getTime() });
            this.props.userLogin(user);
        }
    };

    _formValidation = () => {
        let itemsToValidateKeys = ['userName', 'password'], validForm = true;
        for (let i = 0; i < itemsToValidateKeys.length; i++) {
            let key = itemsToValidateKeys[i], validKey = true;
            validKey = validationService.validateInput(this.state[key].validationTypes, this.state[key].value);
            this.setState({ [key + 'HasError']: !validKey });
            if (!validKey)
                validForm = false;
        }
        this.setState({ formError: !validForm });
        return validForm;
    };


    render() {
        return (
            <Container style={ styles.container }>

                { this.props.blockUiSpinner && <Spinner/> }

                { !this.props.blockUiSpinner &&
                <View>
                    <Form style={ styles.form }>
                        <Item floatingLabel style={ styles.formItem }
                              error={ this.state.formError && this.state.userNameHasError }>
                            <Icon active type="FontAwesome" name="user"/>
                            <Label
                                style={ [styles.inputText, ( this.state.formError && this.state.userNameHasError ) ? styles.itemError : {}] }>Username</Label>
                            <Input onChangeText={ this.onUsernameChange }/>
                        </Item>
                        <Item floatingLabel
                              style={ [styles.formItem, ( this.state.formError && this.state.passwordHasError ) ? styles.itemError : {}] }
                              error={ this.state.formError && this.state.passwordHasError }>
                            <Icon active type="FontAwesome" name="unlock-alt"/>

                            <Label
                                style={ [styles.inputText, ( this.state.formError && this.state.passwordHasError ) ? styles.itemError : {}] }>Password</Label>

                            <Input secureTextEntry={ true } onChangeText={ this.onPasswordChange }/>
                        </Item>
                    </Form>

                    <Button full rounded large style={ styles.button } onPress={ this.handleUserLogin }>
                        <Text style={ styles.buttonText }>Login</Text>
                    </Button>
                </View>
                }
            </Container>
        );

    }
}

const mapStateToProps = (state) => {
    const { user, app } = state;
    // console.log('redux state', state, app);
    return { user, ...app };
};

export default connect(mapStateToProps, { userLogin })(LoginScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1',
        flex: 1,
        justifyContent: 'center'
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