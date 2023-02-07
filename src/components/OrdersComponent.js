import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    ScrollView
} from "react-native";
import { useSelector } from "react-redux";
import APPDATAURLS from "../constants/APPDATAURLS";

const OrdersComponent = ()=>{
    const [orders,setOrders] = useState({
        error:false,
        loading:true,
        data:[]
    });
    const loginInfo = useSelector((state)=>state.Reducer.loginInfo);

    const getOrders = ()=>{
        if(loginInfo.loggedIn){
            fetch(`${APPDATAURLS.customerOrders}${loginInfo.data.customerData.customerID}`).
            then(req=>req.json()).
            then(data=>{
                console.log(data[0]);
                setOrders({
                    ...orders,
                    loading:false,
                    data:data
                });
            }).catch(err=>{
                setOrders({
                    error:true,
                    loading:false,
                    data:[]
                });
            })
        }
    }

    useEffect(()=>{
        getOrders();
    },[]);
    return(
        <ScrollView
            contentContainerStyle={{
                width:"100%",
                flexGrow:1,
                height:"100%"
            }}

            style={{
                flexGrow:1,
                height:"100%"
            }}
        >
            <Text
                style={{
                    textAlign:"center",
                    fontSize:18,
                    fontWeight:"bold",
                    textDecorationLine:"underline",
                    margin:5,
                    color:"#000000"
                }}
            >
                Orders
            </Text>

            {
            orders.loading?
            <ActivityIndicator
                size={40}
            />:
            orders.data.length>0?
            orders.data.map((order,index)=>{
                let totalItems = order.data.
                                        map((i)=>i.saleOrderQuantity).
                                        reduce((prev,curr)=>prev+curr,0);
                return(
                    <View
                        key={index}
                        style={{
                            borderRadius:5,
                            width:"98%",
                            margin:"1%",
                            backgroundColor:"#ffffff",
                            padding:5
                        }}
                    >
                        <Text
                        style={{
                            color:"#000000"
                        }}
                        >Order ID: {order.orderNumber}</Text>
                        <Text
                        style={{
                            color:"#000000"
                        }}
                        >Date: {order.orderDate}</Text>
                        <Text
                        style={{
                            color:"#000000"
                        }}
                        >No. of items: {totalItems}</Text>
                        <Text
                        style={{
                            color:"#000000"
                        }}
                        >Total: Ksh.{order.orderTotal}</Text>
                        <Text
                            style={{
                                fontSize:17,
                                fontWeight:"bold",
                                textDecorationLine:"underline",
                                textAlign:"center",
                                color:"#000000"
                            }}
                        >Items</Text>
                        {order.data.map((or,index)=>{
                            return(
                                <Text 
                                style={{
                                    color:"#000000"
                                }}
                                key={index}>
                                    {or.productName} x {or.saleOrderQuantity}  Ksh.{or.saleOrderTotal}
                                </Text>
                            )
                        })}
                    </View>
                )
            }):
            <Text
            style={{
                color:"#000000"
            }}
            >
                You haven't made any orders yet.    
            </Text>}
        </ScrollView>
    )
}

export default OrdersComponent;