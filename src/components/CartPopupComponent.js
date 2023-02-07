import React from "react";
import {
    Text,
    View,
    TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";

const CartPopupComponent = ({navigation})=>{
    const allItems = useSelector((state)=>state.Reducer.selectedItems);
    let totalItemsCount = allItems.items.length>0?allItems.items.map(item=>item.quantity).reduce((prev,curr)=>prev+curr,0):0;
    let totalCashCount = allItems.items.length>0?allItems.items.map(item=>item.quantity*item.productPrice).reduce((prev,curr)=>prev+curr,0):0;
    return(
        <View
            style={{
                height:"100%",
                width:"100%"
            }}
            
        >
            <Text
                style={{
                    textAlign:"center",
                    textDecorationLine:"underline",
                    fontWeight:"bold",
                    fontSize:17,
                    color:"#000000"
                }}
            >Cart items</Text>
            <Text
            style={{
                color:"#000000"
            }}
            >Quantity: {totalItemsCount}</Text>
            <Text
            style={{
                color:"#000000"
            }}
            >Total: Ksh.{totalCashCount}</Text>


            <View
                style={{
                    width:"100%",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between"
                }}
                >

                <TouchableOpacity
                    onPress={()=>{
                            navigation.navigate("products")
                        }}
                    style={{backgroundColor:"orange",
                            height:38,
                            width:"45%",
                            borderRadius:5,
                            alignItems:"center",
                            justifyContent:"center"}}>
                    <Text
                        style={{
                            color:"#ffffff",
                            fontSize:18
                        }}>
                            Continue shopping
                        </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{
                            navigation.navigate("cart")
                            }}
                    style={{backgroundColor:"orange",
                            height:38,
                            width:"45%",
                            borderRadius:5,
                            alignItems:"center",
                            justifyContent:"center"}}>
                    <Text
                        style={{
                            color:"#ffffff",
                            fontSize:18
                            }}
                            >
                                Proceed to cart
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default CartPopupComponent;