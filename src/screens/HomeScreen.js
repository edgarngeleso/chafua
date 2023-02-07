import React, { useEffect,useState } from "react";
import {SafeAreaView,
        ScrollView,
        View,
        Text,
        StyleSheet,
        ActivityIndicator,
        StatusBar,
        TouchableOpacity} from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchComponent from "../components/SearchComponent";
import AdvertComponent from "../components/AdvertComponent";
import CategoriesComponent from "../components/CategoriesComponent";
import CustomBar from "../components/CustomBar";
import HotelsComponent from "../components/HotelsComponent";
import ErrorComponent from "../components/ErrorComponent";
//Sign in and sign up screens
import APPDATAURLS from "../constants/APPDATAURLS";

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation})=>{
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(true);
    const checkError = ()=>{
        fetch(`${APPDATAURLS.activeAdvertsURL}`,{
            method:"get"
        }).
        then(req=>req.text()).
        then(data=>{
            console.log(data)
            setError(false);
            setLoading(false);
        }).catch(e=>{
            console.log(e)
            setError(true);
        })
    }

    const reload = ()=>{
        setError(false);
        setLoading(true);
        checkError();
    }

    useEffect(()=>{
        checkError();
    },[]);
    return(
        <SafeAreaView style={styles.home}>
            <StatusBar backgroundColor="orange"/>
            <HeaderComponent navigation={navigation}>
                    <Text style={{fontSize:25,
                                fontWeight:"bold",
                                marginLeft:2,
                                color:"#000000"}}>
                        CHAFUA
                    </Text>
            </HeaderComponent>
            <SearchComponent navigation={navigation}/>
            
            {error?
                <ErrorComponent
                error={error}
                >
                    <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress = {reload}
                            style={{width:"100%",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    backgroundColor:"orange",
                                    marginTop:10,
                                    borderRadius:5,
                                    height:28
                                }}
                        >
                            <Text style={{fontSize:20,
                                            color:"#ffffff"}}>
                                Try again...
                            </Text>
                        </TouchableOpacity>
                </ErrorComponent>
                :loading?
                <View
                    style={{
                        width:"100%",
                        height:"100%",
                        alignItems:"center",
                        justifyContent:"center"
                        }}
                >
                    <ActivityIndicator size={40} />

                </View>:
                <ScrollView contentContainerStyle={{
                        width:"100%",
                    }}>
                    <Text
                        style={{
                            margin:"1%",
                            fontWeight:"bold",
                            fontSize:18,
                            color:"#000000"
                        }}
                    >Categories</Text>
                    <CategoriesComponent navigation={navigation}/>
                    <Text
                        style={{
                            margin:"1%",
                            fontWeight:"bold",
                            fontSize:18,
                            color:"#000000"
                        }}
                    >Ads</Text>
                    <AdvertComponent/>
                    <CustomBar name={"Hotels"}/>
                    <HotelsComponent navigation={navigation}/>
                </ScrollView>}
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    home:{
        height:"100%",
        width:"100%",
        backgroundColor:"#ffffff"
    }
})

export default HomeScreen;