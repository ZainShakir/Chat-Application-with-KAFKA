import React from 'react';
import { StyleSheet, Text,Button, Alert,Image,View ,SafeAreaView} from 'react-native';
 
function VendorhomeScreen({navigation,props}) {
    return (
        <View style={styles.container}>
          <View style={styles.comb_circle}>
          <View style={styles.circle1}/>
          <View style={styles.circle2}/>
          </View>
          <Image style={styles.img_1}source={require("../assets/img_2.png")}/>
          <Text style={styles.exist_acc}>Already Have an Account!!</Text>
          <View style={styles.login}>
          <Button 
          color='#F86464'
            title="Login"
            onPress={() => navigation.navigate('Vendorlogin')}
          />
          </View>
          <Text style={styles.create_acc}>Create a New Account!!</Text>
          <View style={styles.signup}>
          <Button 
          color='#F86464'
            title="Sign up"
            onPress={() => navigation.navigate('Vendorsignup')}
          />
    
          </View>
      
    
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F4F4',
    },
    signup:{
      top:'19%',
      width:'80%',
      alignSelf:'center',
      borderRadius:'15%'
    },
    create_acc:{
      top:'17%',
      left:'10%',
      fontSize:15,
      fontWeight:'bold',
    },
  
    login:{
      top:'14%',
      width:'80%',
      alignSelf:'center',
      borderRadius:'15%'
    },
    exist_acc:{
      top:'13%',
      left:'10%',
      fontSize:15,
      fontWeight:'bold',
    },

    img_1:{
      height:"45%",
      width:"85%",
      top:"12%",
      resizeMode:'contain',
      alignSelf:'center'
    },
  

    comb_circle:{
      height:'100%',
      width:'100%',
      position:'absolute',
    },
  
  
    circle1:{
      width:'39%',
      height:'18%',
      borderRadius: 75,
      opacity:0.48,
      backgroundColor:"#FF6B6B",
      top:'-1%',
      left:'-23%',
      position:'absolute'
    },
    circle2:{
      width:'30%',
      height:'18%',
      borderRadius: 75,
      opacity:0.48,
      top:'-8%',
      left:'-4%',
      backgroundColor:"#FF6B6B"
    }
  });
  
  export default VendorhomeScreen;