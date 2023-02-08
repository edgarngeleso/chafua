import React,{useState,useEffect,useContext} from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import HotelsScreen from "../screens/HotelsScreen";
import ProductsScreen from "../screens/ProductsScreen";
import {useSelector} from "react-redux";
const Tab = createBottomTabNavigator();

const DashboardTabs = ({navigation})=>{

    return(
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown:false,
                    tabBarLabel:()=>null,
                    tabBarIcon:({focused})=>{
                        return (
                            <View style={{alignItems:"center",justifyContent:"center",}}>
                                <Image 
                                source={require("../assets/icons/home.png")}
                                resizeMode = "contain"
                                style={{
                                    width:25,
                                    height:25,
                                    tintColor:focused?"orange":"#000000",
                                }}/>
                            </View>
                        )},
                }}
            />
            <Tab.Screen
                name="hotels"
                component={HotelsScreen}
                options={{
                    headerShown:false,
                    tabBarLabel:()=>null,
                    tabBarIcon:({focused})=>{
                        return (
                            <View style={{alignItems:"center",justifyContent:"center",}}>
                                <Image 
                                source={require("../assets/icons/products.png")}
                                resizeMode = "contain"
                                style={{
                                    width:25,
                                    height:25,
                                    tintColor:focused?"orange":"#000000",
                                }}/>
                            </View>
                        )},
                }}
            />
            
            <Tab.Screen
                name="products"
                component={ProductsScreen}
                options={{
                    headerShown:false,
                    tabBarLabel:()=>null,
                    tabBarIcon:({focused})=>{
                        return (
                            <View style={{alignItems:"center",justifyContent:"center",}}>
                                <Image 
                                source={require("../assets/icons/hot.png")}
                                resizeMode = "contain"
                                style={{
                                    width:25,
                                    height:25,
                                    tintColor:focused?"orange":"#000000",
                                }}/>
                            </View>
                        )},
                }}
            />

            <Tab.Screen
                name="notifications"
                component={NotificationsScreen}
                options={{
                    headerShown:false,
                    tabBarLabel:()=>null,
                    tabBarBadge:0,
                    tabBarIcon:({focused})=>{
                        return (
                            <View style={{alignItems:"center",justifyContent:"center",}}>
                                <Image 
                                source={require("../assets/icons/notification.png")}
                                resizeMode = "contain"
                                style={{
                                    width:25,
                                    height:25,
                                    tintColor:focused?"orange":"#000000",
                                }}/>
                            </View>
                        )},
                }}
            />

            <Tab.Screen
                name="cart"
                component={CartScreen}
                options={{
                    headerShown:false,
                    tabBarLabel:()=>null,
                    tabBarIcon:({focused})=>{
                        
                        const items = useSelector((state)=>state.Reducer.selectedItems);
                        let total = 0;
                        if(items.items !== ""){
                            total = items.items.map(item=>Number(item.quantity)).reduce((prev,curr)=>prev+curr,0);
                        }
                        return (
                            <View style={{alignItems:"center",
                                        justifyContent:"center",
                                        top:-25,
                                        shadowColor:"grey",
                                        shadowOffset:{
                                            width:0,
                                            height:10,
                                        },
                                        shadowOpacity:1,
                                        shadowRadius:3,
                                        elevation:5,
                                        width:70,
                                        height:70,
                                        borderRadius:35,}}>
                                <Image 
                                source={require("../assets/icons/cart.png")}
                                resizeMode = "contain"
                                style={{
                                    width:30,
                                    height:30,
                                    tintColor:focused?"orange":"#000000",
                                }}/>

                                <View 
                                    style={{
                                        position:"absolute",
                                        height:20,
                                        width:15,
                                        borderRadius:7.5,
                                        backgroundColor:"red",
                                        alignItems:"center",
                                        justifyContent:"center",
                                    }}>
                                        
                                    <Text style={{color:"white",
                                                fontSize:15,
                                                }}>
                                       {total}
                                    </Text>
                                    
                                </View>
                            </View>
                        )},
                }}
            />
        </Tab.Navigator>
    )
}

export default DashboardTabs;