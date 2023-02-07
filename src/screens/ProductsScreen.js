import React from "react";
import {Text,View,ScrollView,SafeAreaView} from "react-native";
import { useSelector } from "react-redux";
import CustomBar from "../components/CustomBar";
import HeaderComponent from "../components/HeaderComponent";
import ProductsComponent from "../components/ProductsComponent";
import SearchComponent from "../components/SearchComponent";
const ProductsScreen = ({navigation})=>{
    let allItems = useSelector(state=>state.Reducer.selectedItems);
    return (
        <SafeAreaView>
            <HeaderComponent navigation={navigation}>
                <Text style={{fontSize:25,
                                fontWeight:"bold",
                                marginLeft:2,
                                color:"#000000"
                                }}>
                        Items
                </Text>
            </HeaderComponent>
            <SearchComponent navigation={navigation}/>
            <ScrollView
                contentContainerStyle={{
                    width:"100%",
                    marginBottom:50
                }}
            >
                <CustomBar name={"Products"}/>
                <ProductsComponent navigation={navigation}/>
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default ProductsScreen;