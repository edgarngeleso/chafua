import React,{useEffect} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import DashboardScreen from "./screens/DashboardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MenuScreen from "./screens/MenuScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import SigninSignupScreen from "./screens/SigninSignupScreen";
import CategoryProductsScreen from "./screens/CategoryProductsScreen";
import HotelProductsScreen from "./screens/HotelProductsScreen";
import SearchScreen from "./screens/SearchScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductsScreen from "./screens/ProductsScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import HotelsScreen from "./screens/HotelsScreen";

//const AppDrawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const AppScreens = ({navigation})=>{
    const dispatch = useDispatch();
    const getUserDetails = async ()=>{
        try{
            let userData = await AsyncStorageLib.getItem("userData");
            if(userData !== null){
                console.log("here");
                dispatch({
                    type:"LOGIN",
                    payload:JSON.parse(userData)
                });
            }else{
                console.log("no data");
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        getUserDetails();
    },[]);
    const isLoggedIn = true;

    return(
        <>
        {isLoggedIn==false?
            <Stack.Navigator>
                <Stack.Screen
                    name="login"
                    component = {SigninSignupScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />
            </Stack.Navigator>:
            <Stack.Navigator>
                <Stack.Screen
                    name="home"
                    component = {DashboardScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />

                <Stack.Screen
                    name="profile"
                    component = {ProfileScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />

                <Stack.Screen
                    name="menu"
                    component = {MenuScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />

                <Stack.Screen
                    name="checkout"
                    component = {CheckoutScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />

                <Stack.Screen
                    name="hotels"
                    component = {HotelsScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />

                <Stack.Screen
                    name="products"
                    component = {ProductsScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />

                <Stack.Screen
                    name="details"
                    component = {ProductDetailsScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />

                <Stack.Screen
                    name="category_products"
                    component = {CategoryProductsScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />

                <Stack.Screen
                    name="hotel_products"
                    component = {HotelProductsScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />

                <Stack.Screen
                    name="search"
                    component = {SearchScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />

                <Stack.Screen
                    name="notifications"
                    component = {NotificationsScreen}
                    
                    options={{
                        headerShown:false,
                    }}
                />
            </Stack.Navigator>
            }
        </>
    )
}

export default AppScreens;