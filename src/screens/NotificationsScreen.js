import React from "react";
import {Text,View} from "react-native";
import HeaderComponent from "../components/HeaderComponent";
const NotificationsScreen = ({navigation})=>{
    return (
        <View>
            <HeaderComponent navigation={navigation}>
                <Text style={{fontSize:25,
                                fontWeight:"bold",
                                marginLeft:2,
                                color:"#000000"}}>
                        Notifications
                </Text>
            </HeaderComponent>
            <View style={{
                width:"100%",
                height:"100%",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <Text
                style={{
                    color:"#000000"
                }}
                >There are no notifications yet.</Text>
            </View>

        </View>
    )
}

export default NotificationsScreen;