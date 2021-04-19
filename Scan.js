import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Scanner} from '../assets/Scanner.jpg';

export default class Scan extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermission : null,
            scanned : false,
            scannedData : '',
            buttonState : 'normal',
        }
    }
    getCameraPermission = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        //status === "granted" is true, when user has granted permission
        this.setState({hasCameraPermission : status==="granted", buttonState : 'clicked', scanned : false});
        //status === "granted" is false, when user has not granted permission
     }
     handleBarCode = async({type,data}) => {
         this.setState({
             scanned : true,
             scannedData : data,
             buttonState : 'normal',
         })
     }
    render(){
        const hasCameraPermission = this.state.hasCameraPermission;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState === 'clicked' && hasCameraPermission){
            return(
                <BarCodeScanner 
                onBarCodeScanned = {scanned?undefined : this.handleBarCode} 
                style = {StyleSheet.absoluteFillObject}/>
            )
        } 
        if(buttonState === 'normal'){
        return(
            <View style = {styles.container}>
            <Text style = {styles.displayText}> {hasCameraPermission === true?this.state.scannedData:"REQUEST CAMERA PERMISSION"} </Text>
            <Image
          style={styles.imageIcon}
          source={{
              uri : Scanner
          }}
        />
        <Text>
            BAR CODE SCANNER
        </Text>
            <TouchableOpacity 
            style = {styles.button} 
            onPress = {this.getCameraPermission}>
                <Text style = {styles.buttonText}>
                    SCAN QR CODE
                </Text>
            </TouchableOpacity>
            </View>
        )
      }
    }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button : {
        backgroundColor : 'blue',
        padding : 10,
        margin : 10,
    },
    buttonText : {
        fontSize : 20,
        fontWeight : 'bold',
    },
    displayText : {
        fontSize : 15,
        color : 'black',
    },
    text : {
        fontSize : 20,
        color : 'black',
    }
  })