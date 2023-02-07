import React from "react";
import {Text,View,ScrollView} from "react-native";
import CustomBar from "../components/CustomBar";
import HeaderComponent from "../components/HeaderComponent";
import HotelsComponent from "../components/HotelsComponent";
import SearchComponent from "../components/SearchComponent";
const HotelsScreen = ({navigation})=>{

    return (
        <View>
            <HeaderComponent navigation={navigation}>
                    <Text style={{fontSize:25,
                                fontWeight:"bold",
                                marginLeft:2,
                                color:"#000000"}}>
                        Hotels
                    </Text>
            </HeaderComponent>

            <SearchComponent navigation={navigation}/>
            
            <ScrollView
            style={{
                marginBottom:50
            }}
            >
                <Text
                style={{
                    color:"#000000"
                }}
                >Hotels</Text>
                <CustomBar name={"Hotels"}/>
                <HotelsComponent navigation={navigation}/>
            </ScrollView>
        </View>
    )
}

export default HotelsScreen;