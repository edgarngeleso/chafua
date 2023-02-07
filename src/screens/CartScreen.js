import React,{useState,useEffect} from "react";
import {Text,
        View,
        Image,
        ScrollView,
        TouchableOpacity,
        ToastAndroid} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import HeaderComponent from "../components/HeaderComponent";
import SearchComponent from "../components/SearchComponent";
import APPDATAURLS from "../constants/APPDATAURLS";
const CartScreen = ({navigation})=>{
    const allItems = useSelector(state=>state.Reducer.selectedItems);
    const [data,setData] = useState([]);
    useEffect(()=>{
        setData(allItems);
        //console.log(allItems)
    },[allItems])
    
    const dispatch = useDispatch();
    const increase = (item) =>{
        dispatch({
            type:"UPDATE_CART",
            payload:item
        })
    }  

    const decrease = (item)=>{
        if(item.quantity < 1){
            dispatch({
                type:"DELETE_PRODUCT",
                payload:item
            })
            ToastAndroid.show(`${item.productName} removed from cart.`,ToastAndroid.LONG);
        }else{
            dispatch({
                type:"UPDATE_CART",
                payload:item
            })
        }
    }
    return (
        <ScrollView>
            <HeaderComponent navigation={navigation}>
                <Text style={{fontSize:25,
                                fontWeight:"bold",
                                marginLeft:2,
                                color:"#000000"}}>
                        Cart
                </Text>
            </HeaderComponent>
            <SearchComponent navigation={navigation}/>
            {allItems.items.length>0?
            <View
                contentContainerStyle={{
                    width:"100%",
                    flexGrow:1,
                    marginBottom:50, 
                }}
            >
            {
                allItems.items.map((item,index)=>{
                    return(
                        <TouchableOpacity
                            style={{
                                width:"98%",
                                height:150,
                                margin:10
                            }}
                            key={index}
                            onPress={()=>navigation.navigate("details",item)}
                        >
                            <TouchableOpacity
                                style={{
                                    zIndex:20,
                                    position:"absolute",
                                    height:50,
                                    width:"10%",
                                    marginLeft:"90%"
                                }}
                                onPress={()=>{
                                    ToastAndroid.show(`${item.productName} removed from cart..`,ToastAndroid.LONG);
                                    dispatch({
                                        type:"DELETE_PRODUCT",
                                        payload:item
                                    });
                                }}
                            >
                                <Image
                                source={require("../assets/icons/delete.png")}
                                style={{
                                    width:20,
                                    height:20,
                                    tintColor:"red"
                                }}
                                />
                            </TouchableOpacity>

                            <View
                            style={{
                                width:"100%",
                                height:"100%",
                                flexDirection:"row",
                                alignItems:"center",
                                justifyContent:"space-between"
                            }}
                            >
                                <Image
                                    source={{uri:`${APPDATAURLS.mainURL}/${item.productImage}`}}
                                    style={{
                                        width:"48%",
                                        height:"98%",
                                        borderRadius:5
                                    }}
                                />
                                <View
                                    style={{
                                        width:"48%",
                                        height:"98%",
                                        borderRadius:5
                                    }}
                                >
                                    <View
                                        style={{
                                            width:"100%",
                                            height:"75%"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize:17,
                                                color:"#000000"
                                            }}
                                        >{item.productName}</Text>
                                        <Text
                                        style={{
                                            color:"#000000"
                                        }}
                                        >Quantity:{item.quantity}</Text>
                                        <Text
                                            style={{
                                                color:"#000000"
                                            }}
                                        >
                                            Price:{item.productPrice}
                                        </Text>
                                        <Text
                                        style={{
                                            color:"#000000"
                                        }}
                                        >
                                        Total:Ksh.{item.productPrice*item.quantity}
                                        </Text>
                                    </View>

                                    <View style={{
                                            width:"96%",
                                            alignItems:"center",
                                            justifyContent:"space-between",
                                            flexDirection:"row"
                                        }}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    decrease({
                                                        ...item,quantity:item.quantity-1
                                                    });
                                                }}
                                                style={{backgroundColor:"orange",
                                                        height:35,
                                                        width:35,
                                                        borderRadius:5,
                                                        alignItems:"center",
                                                        justifyContent:"center"}}>
                                                <Image
                                                    source={require("../assets/icons/subtract.png")}
                                                    style={{
                                                        tintColor:"#ffffff",
                                                        width:20,
                                                        height:20
                                                    }}
                                                />
                                            </TouchableOpacity>
                                                <Text style={{
                                                    fontSize:20,
                                                    fontWeight:"bold",
                                                    color:"#000000"
                                                }}>{item.quantity}</Text>
                                            <TouchableOpacity 
                                                onPress={()=>{ 

                                                    increase({
                                                        ...item,quantity:item.quantity+1
                                                    });
                                                }}                       
                                                style={{backgroundColor:"orange",
                                                        height:38,
                                                        width:38,
                                                        borderRadius:5,
                                                        alignItems:"center",
                                                        justifyContent:"center"}}
                                            >
                                                <Image
                                                    source={require("../assets/icons/add.png")}
                                                    style={{
                                                        tintColor:"#ffffff",
                                                        width:20,
                                                        height:20
                                                    }}
                                                />
                                            </TouchableOpacity>
                                    </View>

                                </View>
                                
                            </View>
                            

                        </TouchableOpacity>
                    )
                })
            }

            <TouchableOpacity
                    onPress={()=>{
                        dispatch({
                            type:"CLEAN_CART"
                        })
                    }}
                    style={{
                        height:40,
                        width:"98%",
                        margin:"1%",
                        borderRadius:5,
                        backgroundColor:"red",
                        alignItems:"center",
                        justifyContent:"center",
                    }}
                >
                    <Text style={{color:"#ffffff"}}>Remove all.</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("checkout");
                    }}
                    style={{
                        height:40,
                        width:"98%",
                        margin:"1%",
                        borderRadius:5,
                        backgroundColor:"orange",
                        alignItems:"center",
                        justifyContent:"center",
                        marginTop:10,
                    }}
                >
                    <Text style={{color:"#ffffff",
                                fontSize:17}}>
                        Proceed Ksh.{allItems.items.
                                        map(item=>(Number(item.quantity))*Number(item.productPrice)).
                                        reduce((prev,curr)=>prev+curr,0)}
                        </Text>
                </TouchableOpacity>

            </View>:
            <View 
                style={{
                    height:"100%",
                    width:"100%",
                    alignItems:"center",
                    justifyContent:"center",
                    flexDirection:"column"
                }}
            >
                <Text
                    style={{
                        fontSize:18,
                        margin:10,
                        color:"#000000"
                    }}
                >There are no items in your cart.</Text>
                <TouchableOpacity
                    onPress={()=>navigation.navigate("products")}
                    style={{
                        height:40,
                        width:"98%",
                        borderRadius:5,
                        backgroundColor:"orange",
                        alignItems:"center",
                        justifyContent:"center",
                    }}
                >
                    <Text style={{color:"#ffffff"}}>Add items.</Text>
                </TouchableOpacity>
            </View>}
        </ScrollView>
    )
}

export default CartScreen;