import React,{useState,useEffect,useRef} from "react";
import {Text,
        View,
        ScrollView,
        TouchableOpacity,
        Modal,
        Image,
        ActivityIndicator} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {useSelector,useDispatch} from "react-redux";
import LottieView from "lottie-react-native";
import HeaderComponent from "../components/HeaderComponent";
import SigninSignupScreen from "./SigninSignupScreen";
import AddAddressComponent from "../components/AddAddressComponent";
import APPDATAURLS from "../constants/APPDATAURLS";

const CheckoutScreen = ({navigation})=>{
    const [addAddressModalOpen,setaddAddressModalOpen] = useState(false);
    const [orderModalOpen,setOrderModalOpen] = useState(false);
    const [selectedAddress,setSelectedAddress] = useState({
        address:null,
        index:0
    });
    const [orderPlacedDetails,setOrderPlacedDetails] = useState({
        error:false,
        message:"",
        loading:false,
    });

    const loginInfo = useSelector((state)=>state.Reducer.loginInfo);
    const orderItems = useSelector((state)=>state.Reducer.selectedItems);
    const userAddresses = useSelector((state)=>state.Reducer.userAddresses);
    const pickerRef = useRef();
    const dispatch = useDispatch();
    let totalCash = orderItems.items.
                     map(item=>Number(item.productPrice)*Number(item.quantity)).
                       reduce((prev,curr)=>prev+curr,0);
    //fetch addreses
    const fetchAddreses = ()=>{
        if(loginInfo.loggedIn){
            fetch(`${APPDATAURLS.customerAddresesURL}${loginInfo.data.customerData.customerID}`,{method:"get"}).
            then(req=>req.json()).
            then(data=>{
                
                dispatch({
                    type:"USER_ADDRESSES",
                    payload:data
                })
            }).catch(error=>{
                
                console.log(error,"Unable to get addresses");
            })
        }
    }

    useEffect(()=>{
        fetchAddreses();
    },[loginInfo.loggedIn]);

    const placeOrder = ()=>{
        setOrderPlacedDetails({
            ...orderPlacedDetails,
            loading:true,
        });
        let formData = new FormData();
        formData.append("orderItems",JSON.stringify(orderItems.items));
        formData.append("customerID",loginInfo.data.customerData.customerID);
        formData.append("customerAddressID",selectedAddress.address==null?userAddresses[0].addressID:selectedAddress.address);
        console.log(selectedAddress);

        fetch(`${APPDATAURLS.apiURL}`,
        {
            method:"POST",
            body:formData
        }).
        then(req=>req.json()).
        then(data=>{
            console.log(data);
            setOrderModalOpen(true);
            setOrderPlacedDetails({
                error:data.error,
                message:data.message,
                loading:false,
            })
            dispatch({
                type:"CLEAN_CART"
            });

        }).catch(err=>{
            setOrderPlacedDetails({
                error:true,
                message:"",
                loading:false,
            });
        })
    }

    return (
        <View>
            {loginInfo.loggedIn?
                <View>
                    <HeaderComponent navigation={navigation}>
                        <Text style={{fontSize:25,
                                        fontWeight:"bold",
                                        marginLeft:2,
                                        color:"#000000"}}>
                                Checkout
                        </Text>
                    </HeaderComponent>
                <ScrollView
                    contentContainerStyle={{
                        width:"100%",
                        alignItems:"center",
                    }}

                    style={{
                        flexGrow:1
                    }}
                >
                    <View
                        style={{
                            width:"98%"
                        }}
                    >
                    {userAddresses==""?
                        <Text
                            style={{
                                fontSize:17,
                                textAlign:"center",
                                margin:5,
                                color:"#000000"
                            }}
                        >
                            No addresses found. Add addresses.
                        </Text>:
                        <View
                            style={{
                                width:"100%",
                                
                            }}
                        >
                            <Text
                                style={{
                                    color:"#000000"
                                }}
                            >Select destination address.</Text>
                            
                            <Picker
                                style={{
                                    height:40,
                                    marginBottom:"4%"
                                }}
                                mode = {"dropdown"}
                                ref={pickerRef}
                                selectedValue={selectedAddress.addreses==null?1:selectedAddress.index+1}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setSelectedAddress({address:itemValue,index:itemIndex-1});
                                }}>
                                
                                <Picker.Item
                                    style={{
                                        color:"#000000"
                                    }}
                                    label="Select destination"
                                    value=""
                                />
                                
                                {userAddresses.map((address,index)=>{
                                    return(
                                        <Picker.Item 
                                            key={index}
                                            style={{
                                                color:"#000000"
                                            }}
                                            label={`${address.addressBlock} - ${address.addressRoom}`} 
                                            value={address.addressID} />
                                    )
                                })}

                            </Picker>
                        </View>
                    }
                        

                        {/**Add address modal*/}

                        <Modal
                            visible={addAddressModalOpen}
                        >
                            <View
                                style={{
                                    width:"100%"
                                }}
                            >
                                <TouchableOpacity
                                    onPress={()=>setaddAddressModalOpen(false)}
                                >
                                    <Image
                                        source={require("../assets/icons/go.png")}
                                        style={{
                                            marginTop:10,
                                            marginLeft:5,
                                            height:20,
                                            width:20,
                                            tintColor:"orange"
                                        }}
                                    />
                                </TouchableOpacity>
                                <AddAddressComponent/>
                            </View>
                        </Modal>

                        {/********************/}
                        <TouchableOpacity
                            onPress={()=>setaddAddressModalOpen(true)}
                            style={{
                                width:"98%",
                                margin:"1%",
                                height:40,
                                borderRadius:5,
                                backgroundColor:"orange",
                                alignItems:"center",
                                justifyContent:"center"
                            }}
                        >
                            <Text
                                style={{
                                    color:"#ffffff",
                                    fontSize:17
                                }}
                            >
                                Add new address
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View   
                        style={{
                            width:"98%",
                        }}
                    >
                        <Text
                            style={{
                                fontSize:20,
                                fontWeight:"bold",
                                textDecorationLine:"underline",
                                textAlign:"center",
                                margin:10,
                                color:"#000000"
                            }}
                        >Order</Text>
                        {orderItems.items.map((orderItem,index)=>{
                            return(
                                <Text
                                    key={index}
                                    style={{
                                        margin:5,
                                        color:"#000000"
                                    }}
                                >{orderItem.productName} x {orderItem.quantity} = Ksh.{orderItem.quantity*orderItem.productPrice} </Text>
                            )
                        })}

                        <Text
                            style={{
                                    marginLeft:5,
                                    color:"#000000"
                                }}
                        >Total ksh.{totalCash}</Text>

                        {userAddresses.length>0?
                        <Text
                            style={{
                                    margin:5,
                                    color:"#000000"
                                }}
                        >
                            Destination: {userAddresses[selectedAddress.index].addressBlock} 
                            -{userAddresses[selectedAddress.index].addressRoom}
                        </Text>:
                        <></>
                        }
                        
                    </View>


                    {/**Order placement status modal */}

                    <Modal
                        visible={orderModalOpen}
                        >
                        <View
                            style={{
                                width:"100%",
                            }}
                        >
                            <TouchableOpacity
                                onPress={()=>setOrderModalOpen(false)}
                                >
                                <Image
                                    source={require("../assets/icons/go.png")}
                                    style={{
                                            marginTop:10,
                                            marginLeft:5,
                                            height:20,
                                            width:20,
                                            tintColor:"orange"
                                        }}
                                        />
                            </TouchableOpacity>

                            <View
                                style={{
                                    width:"100%",
                                    alignItems:"center",
                                    justifyContent:"center"
                                }}
                            >
                                {orderPlacedDetails.error?
                                <View
                                    style={{
                                        width:"100%"
                                    }}
                                >
                                    <View
                                        style={{
                                            width:"100%",
                                            height:150
                                        }}
                                    >
                                        <LottieView
                                            source={require('../assets/animations/wrong1.json')}
                                            
                                            colorFilters={[
                                            {
                                                keypath: 'button',
                                                color: '#F00000',
                                            },
                                            {
                                                keypath: 'Sending Loader',
                                                color: '#F00000',
                                            },
                                            ]}
                                            autoPlay
                                            loop={false}
                                        />
                                    </View>

                                    <Text
                                        style={{
                                            width:"98%",
                                            margin:"1%",
                                            color:"#000000"
                                        }}
                                    >OOPS! Unable to place your order. Try again later.</Text>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            navigation.navigate("products");
                                        }}
            
                                        style={{
                                            width:"98%",
                                            margin:"1%",
                                            height:40,
                                            borderRadius:5,
                                            backgroundColor:"orange",
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:"#ffffff"
                                            }}
                                        >
                                            Home
                                        </Text>
                                    </TouchableOpacity>
                                </View>:
                                <View 
                                    style={{
                                        width:"100%"
                                    }}>
                                    <View
                                        style={{
                                            width:"100%",
                                            height:150,
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}
                                    >
                                        <LottieView
                                            source={require('../assets/animations/ok.json')}
                                            
                                            colorFilters={[
                                            {
                                                keypath: 'button',
                                                color: '#F00000',
                                            },
                                            {
                                                keypath: 'Sending Loader',
                                                color: '#F00000',
                                            },
                                            ]}
                                            autoPlay
                                            loop={false}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            width:"98%",
                                            margin:"1%",
                                            color:"#000000"
                                        }}
                                    >
                                        Order successfully placed. 
                                        Navigate to profile to view your orders.
                                    </Text>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            navigation.navigate("home");
                                        }}
            
                                        style={{
                                            width:"98%",
                                            margin:"1%",
                                            height:40,
                                            borderRadius:5,
                                            backgroundColor:"orange",
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:"#ffffff"
                                            }}
                                        >
                                            Home
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                }
                                
                            </View>

                        </View>
                    </Modal>

                    {/********************************/}

                    <TouchableOpacity
                            onPress={()=>{
                                placeOrder();
                            }}

                            disabled={userAddresses.length<1?true:false}
                            style={{
                                width:"98%",
                                margin:"1%",
                                height:40,
                                borderRadius:5,
                                backgroundColor:"orange",
                                alignItems:"center",
                                justifyContent:"center"
                            }}
                        >
                            {orderPlacedDetails.loading?
                            <ActivityIndicator 
                                size={30}
                                color={"#ffffff"}
                                />:
                            <Text
                                style={{
                                    color:"#ffffff",
                                    fontSize:17
                                }}
                            >
                                Place order
                            </Text>}
                        </TouchableOpacity>
                    </ScrollView>
                </View>:
                <SigninSignupScreen navigation={navigation}/>
                }
        </View>
    )
}

export default CheckoutScreen;