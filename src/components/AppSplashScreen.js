import React from "react";
import {View,
       Image,
        Text} from "react-native";

const AppSplashScreen = ()=>{
    return(
        <View
            style={{
                width:"100%",
                height:"100%",
                alignItems:"center",
                justifyContent:"center"
            }}
        >
            <Image
                source={require("../assets/images/logo.png")}
                style={{
                    width:60,
                    height:60,
                    borderRadius:5
                }}
            />
            <Text
                style={{
                    marginTop:10,
                    color:"#000000"
                }}
            >CHAFUA</Text>
        </View>
    )
}

export default AppSplashScreen;