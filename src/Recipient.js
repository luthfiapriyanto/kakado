import { Image, Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import image from './recipient_gift.jpg';
import logo from './brand_logo.png';
import { Formik } from 'formik';
import { Button } from 'react-native-web';
import React, { Component } from 'react';
import firebase from 'firebase';
import headerImage from './landing_header.jpg';
import LoadingOverlay from 'react-loading-overlay';


class Recipient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageValue: '',
            messageId: props.location.search.split('?').pop(),
            min: undefined,
            max: '',
            isLoading: true
        };

        const config = {
            apiKey: "AIzaSyAB8TiSYqmJGJaDJ2xHUjhW3j9UMdNwV-Q",
            authDomain: "gradire-83417.firebaseapp.com",
            databaseURL: "https://gradire-83417.firebaseio.com",
            projectId: "gradire-83417",
            storageBucket: "gradire-83417.appspot.com",
            messagingSenderId: "992342878515",
            appId: "1:992342878515:web:f04a70c41b72dc56f37646",
            measurementId: "G-FQPG4LXVYL"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

    }

    componentDidMount() {
        firebase.database().ref(`MessageList/${this.state.messageId}`).once('value',  (snapshot) => {
            this.setState({
                messageValue: snapshot.val().message,
                senderEmail: snapshot.val().senderEmail,
                recipientEmail: snapshot.val().recipientEmail,
                min: snapshot.val().budgetMin,
                max: snapshot.val().budgetMax,
                isLoading: false
            });
        });
    }

    _onButtonSubmitClick = (value) => {
        this.setState({ isLoading: true });
        const {
            recipientMessage,
        } = value;

        firebase.database().ref('WishesList/').push({
            recipientMessage,
        }).then((data)=>{
            this._sendEmail(recipientMessage);

        }).catch((error)=>{
            this.setState({ isLoading: false });

            console.log('error ' , error)
        })

    };

    _sendEmail = (value) => {

        const user_id = 'user_n6HTP5Cb1hviBCnr7qva4';

        const templateId = 'template_QG18UX4g_clone';
        window.emailjs
            .send('default_service', templateId, {
                    recipient_email: this.state.recipientEmail,
                    sender_email: this.state.senderEmail,
                    recipient_message: value
                },
                user_id
            )
            .then(res => {
                this.setState({ isLoading: false });

                console.log('XCX', res)
            })
            // Handle errors here however you like

            .catch(err => {
                this.setState({ isLoading: false });

                console.error('Failed to send feedback. Error: ', err)
            });
    }


    render() {

        return (
            <LoadingOverlay
                active={this.state.isLoading}
                spinner
            >
                <View style={styles.container}>
                    <Image source={logo} style={styles.logo}/>
                    <View style={{ marginVertical: 16, marginHorizontal: 16, borderBottomColor: '#FDF5D8', borderBottomWidth: 50, width: '100%', height: 50 }}/>
                    <Image source={headerImage} style={styles.headerImg}/>

                    <View style={styles.formContainer}>
                        <Image source={image} style={styles.imageAsset}/>
                        <Text style={{ fontSize: 34, marginTop: 30 }}>Your Occasion is About to Coming</Text>
                        <View style={{ alignItems: 'flex-start',
                            justifyContent: 'flex-start', width: '100%' }}>
                            <Text style={{ fontSize: 20, marginTop: 50 }}>{this.state.messageValue}</Text>
                            <Text style={{ fontSize: 18, marginTop: 20 }}>{`Your budget is limited to Rp${this.state.min} - Rp${this.state.max}`}</Text>

                        </View>

                        <Formik initialValues={{
                            recipientMessage: ''
                        }}
                                onSubmit={this._onButtonSubmitClick}>
                            {({ handleChange, handleSubmit, isValid }) => (
                                <View style={{ flex: 1, width: '100%' }}>
                                    <View style={{ flex: 1, marginTop: 40, width: '100%' }}>
                                        <Text style={{ fontSize: 18 }}>Please explain what you really want!</Text>
                                        <TextInput
                                            onChangeText={handleChange('recipientMessage')}
                                            multiline={true}
                                            style={{
                                                width: '100%',
                                                paddingHorizontal: 16,
                                                paddingVertical: 16,
                                                height: 200,
                                                borderColor: '#000',
                                                borderWidth: 1,
                                                marginVertical: 16,
                                                backgroundColor: '#fff'
                                            }}
                                            placeholder={'I’m very happy now. Just cannot think clearly! But if you really want to know about my wish, it is a brand new Wallet.'}/>
                                    </View>
                                    <View style={{ marginTop: 40, width: 250 }}>
                                        <Button disabled={!isValid} color={'#000'}  onPress={handleSubmit} title={'SEND'}/>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </LoadingOverlay>
        );
    }
}

const styles = StyleSheet.create({

    imageAsset: {
        marginVertical: 20,
        paddingHorizontal: 30,
        width: 400,
        height: 200,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFEFA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        marginBottom: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
        // paddingVertical: 70
    },
    yellowRibbon: {
        paddingTop: 50,
        color: '#FDF5D8',
        height: 78,
        width: '100%'
    },
    logo: {
        marginVertical: 20,
        paddingHorizontal: 30,
        width: 200,
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    titleBar: {
        fontSize: 38
    },
    button: {
        borderRadius: 3,
        padding: 20,
        marginVertical: 10,
        marginTop: 10,
        backgroundColor: '#1B95E0',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Recipient;
