import React, { useState,useEffect } from "react";
import {Text,
        View,
        ScrollView,
        Image,
        TouchableOpacity,
        Dimensions,
        ToastAndroid} from "react-native";
import APPDATAURLS from "../constants/APPDATAURLS";
import { useDispatch,useSelector } from "react-redux";
import CartPopupComponent from "../components/CartPopupComponent";
const ProductDetailsScreen = ({navigation,route})=>{
    const {productID,
            productName,
            productPrice,
            productImage,
            hotelName,
            categoryName} = route.params;
    const [quantity,setQuantity] = useState(0);
    const [product,setProduct] = useState({
        productID:productID,
        productName:productName,
        productPrice:productPrice,
        productImage:productImage,
        hotelName:hotelName,
        categoryName:categoryName,
        quantity:0
    });

    const [isAdded,setIsAdded] = useState(false);

    const dispatch = useDispatch();

    const add_quantity = ()=>{
        setProduct({...product,quantity:product.quantity+1});
        setQuantity(quantity+1);
    }

    const reduce_quantity = ()=>{
        setProduct({...product,quantity:product.quantity>1?product.quantity-1:0});
        setQuantity(quantity-1);
    }

    let allItems = useSelector(state=>state.Reducer.selectedItems);
    
    useEffect(()=>{
        //setIsAdded(false);
        //setProduct({...product,quantity:1});
        allItems.items.map(item=>{
            if(item.productID == productID){
                setQuantity(item.quantity);
                setIsAdded(true);
                setProduct(item);
                return false;
            }
        })

        if(product.quantity<1){
            setIsAdded(false);
        }
    },[allItems,product.quantity])

    const add = (item)=>{
        dispatch({
            type:"UPDATE_CART",
            payload:item
        }) 
    }

    let windowHeight = Dimensions.get("window").height;
    let deviceHeight = Dimensions.get("screen").height;
    let subtractHeight = 10;
    if((deviceHeight-windowHeight)>0){
        subtractHeight = 120;
    }

    const reduce = (item)=>{

        if(item.quantity < 1){
            
            dispatch({
                type:"DELETE_PRODUCT",
                payload:product
            })
        }

        if(item.quantity>=1){   
            dispatch({
                type:"UPDATE_CART",
                payload:item
            })
        }
        
        if(item.quantity<1){
            setIsAdded(false);
            
        }
        
    }

    const addProduct = ()=>{
        setQuantity(1);
        setProduct({...product,
            quantity:1
        });  

        ToastAndroid.show(`Added ${productName} to cart.`,ToastAndroid.LONG);
        dispatch({
                type:"ADD_TO_CART",
                payload:{
                    productID:productID,
                    productName:productName,
                    productPrice:productPrice,
                    productImage:productImage,
                    hotelName:hotelName,
                    categoryName:categoryName,
                    quantity:1
                }
                });

        setIsAdded(true);
    }


    return (
        <ScrollView 
            contentContainerStyle={{
                height:"100%",
                width:"100%",
            }}
        >
            <View style={{
                width:"100%",
            }}>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={{
                        position:"absolute",
                        zIndex:10,
                        margin:2,
                        backgroundColor:"white",
                        width:40,
                        height:40,
                        borderRadius:20,
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                >
                    <Image
                        source={require("../assets/icons/go.png")}
                        style={{
                            width:30,
                            height:30,
                            tintColor:"orange"
                        }}
                    />
                </TouchableOpacity>


                <Image
                    source={{uri:`${APPDATAURLS.mainURL}/${productImage}`}}
                    style={{
                        width:"100%",
                        height:350
                    }}
                />
            </View>

            <Text 
                style={{
                    fontSize:20,
                    fontWeight:"bold",
                    margin:2,
                    color:"#000000"
                }}
            >{productName}</Text>
            <Text
                style={{
                    fontSize:17,
                    margin:2,
                    color:"#000000"
                }}
            >Ksh.{productPrice}</Text>
            <Text
                style={{
                    fontSize:15,
                    margin:2,
                    marginTop:10,
                    color:"#000000"
                }}
            >Hotel: {hotelName}</Text>
            <Text
                style={{
                    fontSize:15,
                    margin:2,
                    color:"#000000"
                }}
            >Category: {categoryName}</Text>

<View style={{
                width:"100%",
                height:40,
                marginTop:10,
                /*marginTop:Dimensions.get("window").height-10,
                position:"absolute",*/
                alignItems:"center",
                justifyContent:"space-between"
            }}>

            {
                isAdded?
                <View style={{
                    width:"98%",
                    alignItems:"center",
                    justifyContent:"space-between",
                    flexDirection:"row"
                }}>
                    <TouchableOpacity
                        onPress={()=>{
                            reduce_quantity();
                            reduce({
                                productID:productID,
                                productName:productName,
                                productPrice:productPrice,
                                productImage:productImage,
                                hotelName:hotelName,
                                categoryName:categoryName,
                                quantity:quantity-1
                            });}}
                        style={{backgroundColor:"orange",
                                height:38,
                                width:38,
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
                        }}>{product.quantity}</Text>
                    <TouchableOpacity 
                        onPress={()=>{
                            add_quantity();
                            add({
                                productID:productID,
                                productName:productName,
                                productPrice:productPrice,
                                productImage:productImage,
                                hotelName:hotelName,
                                categoryName:categoryName,
                                quantity:quantity+1
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
                </View>:
                <TouchableOpacity
                    style={{
                        width:"98%",
                        height:38,
                        borderRadius:5,
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:"orange",
                        
                    }}

                    onPress={addProduct}
                >
                    <Text style={{
                        color:"#ffffff",
                        fontSize:18
                    }}>
                        Add to cart
                    </Text>
                </TouchableOpacity>
            }
            </View>

            {isAdded?<View 
                style={{
                    margin:2,
                    marginTop:10,
                    width:"98%",
                    padding:10,
                    margin:"1%",
                    shadowColor:"grey",
                    shadowOffset:{
                                width:0,
                                height:10,
                    },
                    shadowOpacity:0.8,
                    shadowRadius:3,
                    elevation:5,
                    backgroundColor:"#ffffff",
                    borderRadius:5,
                }}
            >
               
                <CartPopupComponent navigation={navigation}/>
            </View>:<></>}

        </ScrollView>
    )
}

export default ProductDetailsScreen;