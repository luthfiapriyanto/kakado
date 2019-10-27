import { Image, Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import logo from './brand_logo.png';
import { Formik } from 'formik';
import { Button } from 'react-native-web';
import React, { Component } from 'react';
import firebase from 'firebase';


class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownValue: 'Birthday',
            messageId: ''
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

    _onButtonSubmitClick = (value) => {
        const occasion  = this.state.dropdownValue;
        const {
            senderName,
            senderPhone,
            senderEmail,
            budgetMin,
            budgetMax,
            message,
            recipientEmail
        } = value;

        firebase.database().ref('MessageList/').push({
            senderName,
            senderPhone,
            senderEmail,
            occasion,
            budgetMin,
            budgetMax,
            message,
            recipientEmail,
        }).then((data)=>{
            console.log('data ' , data)
            this.setState({ messageId: data.key });
            this._sendEmail(value, occasion, data.key);

        }).catch((error)=>{
            console.log('error ' , error)
        })

    };

    _sendEmail = (value, occasion, id) => {
        const {
            senderName,
            recipientEmail
        } = value;
        const user_id = 'user_n6HTP5Cb1hviBCnr7qva4';
        const recipientUrl = `http://localhost:3000/recipient?${id}`;

        const templateId = 'template_QG18UX4g';
        window.emailjs
            .send('default_service', templateId, {
                    recipient_email: recipientEmail,
                    recipient_url: recipientUrl,
                    sender_name: senderName,
                    occasion: this.state.occasion
                },
                user_id
            )
            .then(res => {
                console.log('XCX', res)
            })
            // Handle errors here however you like
            .catch(err => console.error('Failed to send feedback. Error: ', err));
    }


    render() {
        const data = [{
            value: 'Birthday',
        }, {
            value: 'Wedding',
        }, {
            value: 'Other',
        }];

        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo}/>
                <View style={styles.yellowRibbon}>
                    <Text style={styles.titleBar}></Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={{ fontSize: 34 }}>Your journey starts here</Text>
                    <Text style={{ fontSize: 20 }}>{`No more guessing, fill anything related to what you want to explain, and what\nyou want to get and to know from your mate`}
                    </Text>
                    <Formik initialValues={{
                        senderName: '',
                        senderPhone: '',
                        senderEmail: '',
                        occasion: '',
                        budgetMin: '',
                        budgetMax: '',
                        message: '',
                        recipientEmail: ''
                    }}
                            onSubmit={this._onButtonSubmitClick}>
                        {({ handleChange, handleSubmit, values }) => (
                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ width: '50%'}}>
                                    <Text style={{ fontSize: 20 }}>Your details</Text>
                                    <View style={{ marginTop: 40 }}>
                                        <Text style={{ fontSize: 20 }}>Input your name</Text>
                                        <View style={{ flexDirection: 'row', flex: 1, marginVertical: 16 }}>
                                            <TextInput onChangeText={handleChange('senderName')} style={{ paddingHorizontal: 16, paddingVertical: 16, height: 40, borderColor: '#000', borderWidth: 1,  }} placeholder={'Michael'}/>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 40 }}>
                                        <Text style={{ fontSize: 20 }}>Input your phone number</Text>
                                        <View style={{ flexDirection: 'row', flex: 1, marginVertical: 16 }}>
                                            <TextInput onChangeText={handleChange('senderPhone')} style={{ paddingHorizontal: 16, paddingVertical: 16, height: 40, borderColor: '#000', borderWidth: 1,  }} placeholder={'08001231231'}/>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 40 }}>
                                        <Text style={{ fontSize: 20 }}>Input your email</Text>
                                        <View style={{ flexDirection: 'row', flex: 1, marginVertical: 16 }}>
                                            <TextInput onChangeText={handleChange('senderEmail')} style={{ paddingHorizontal: 16, paddingVertical: 16, height: 40, borderColor: '#000', borderWidth: 1,  }} placeholder={'example@mail.com'}/>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '50%'}}>
                                    <Text style={{ fontSize: 20 }}>Your party pal</Text>

                                    <View style={{ marginTop: 40 }}>
                                        <Text style={{ fontSize: 20 }}>What is the occasion?</Text>
                                        <Picker
                                            style={{ marginVertical: 16 }}
                                            selectedValue={this.state.dropdownValue}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({ dropdownValue: itemValue })
                                            }>
                                            <Picker.Item label="Birthday" value="Birthday" />
                                            <Picker.Item label="Wedding" value="Wedding" />
                                            <Picker.Item label="Others" value="Others" />
                                        </Picker>
                                    </View>
                                    <View style={{ marginTop: 40 }}>
                                        <Text style={{ fontSize: 20 }}>What is you budget limit?</Text>
                                        <View style={{ flexDirection: 'row', flex: 1, marginVertical: 16 }}>
                                            <TextInput onChangeText={handleChange('budgetMin')} style={{ paddingHorizontal: 16, paddingVertical: 16, height: 40, borderColor: '#000', borderWidth: 1,  }} placeholder={'100000'}/>
                                            <View style={{ marginVertical: 16, marginHorizontal: 16, borderBottomColor: '#000', borderBottomWidth: 1, width: '5%', height: '50%' }} />
                                            <TextInput onChangeText={handleChange('budgetMax')} style={{ paddingHorizontal: 16, paddingVertical: 16, height: 40, borderColor: '#000', borderWidth: 1 }} placeholder={'1500000'}/>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 40 }}>
                                        <Text style={{ fontSize: 20 }}>Make it personal, write whatever you want to say!</Text>
                                        <TextInput
                                            onChangeText={handleChange('message')}
                                            multiline={true}
                                            style={{
                                                width: '100%',
                                                paddingHorizontal: 16,
                                                paddingVertical: 16,
                                                height: 200,
                                                borderColor: '#000',
                                                borderWidth: 1,
                                                marginVertical: 16
                                            }}
                                            placeholder={'Hi, mate. I know you have no clue about me, but I do know you for sure. And I will answer all of your wishes!'}/>

                                    </View>
                                    <View style={{ marginTop: 40 }}>
                                        <Text style={{ fontSize: 20 }}>Where will all of this be sent? Fill with your friend's email</Text>
                                        <TextInput onChangeText={handleChange('recipientEmail')} style={{ paddingHorizontal: 16, paddingVertical: 16, height: 40, borderColor: '#000', borderWidth: 1, marginVertical: 16 }} placeholder={'friends@examples.com'}/>
                                    </View>
                                    <View style={{ marginTop: 40, width: 250 }}>
                                        <Button color={'#000'}  onPress={handleSubmit} title={'SEND'}/>
                                    </View>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFEFA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        marginBottom: 100,
        flex: 1,
        backgroundColor: '#FFFEFA',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderColor: '#FDF5D8',
        borderWidth:1,
        overflow: 'hidden',
        shadowColor: '#FDF5D8',
        shadowRadius: 10,
        shadowOpacity: 1,
        paddingHorizontal: 100,
        paddingVertical: 70
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

export default Landing;
