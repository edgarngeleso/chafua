import React, { useEffect,useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image, 
    ScrollView,
    ActivityIndicator
} from "react-native";
import {useSelector,useDispatch} from "react-redux";
import APPDATAURLS from "../constants/APPDATAURLS";
import AddAddressComponent from "./AddAddressComponent";
import EditAddressComponent from "./EditAddressComponent";

const AddressesComponent = ()=>{
    const [addAddressModalOpen,setaddAddressModalOpen] = useState(false);
    const [editAddressModalOpen,setEditAddressModalOpen] = useState(false);
    const [selectedAddress,setSelectedAddress] = useState(0);
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();

    const loginInfo = useSelector((state)=>state.Reducer.loginInfo);
    const getAddresses = ()=>{
        if(loginInfo.loggedIn){
            fetch(`${APPDATAURLS.customerAddresesURL}${loginInfo.data.customerData.customerID}`,{method:"get"}).
            then(req=>req.json()).
            then(data=>{
                
                dispatch({
                    type:"USER_ADDRESSES",
                    payload:data
                })
                setLoading(false);
            }).catch(error=>{
                setLoading(false);
                console.log(error);
            })
        }
    }

    useEffect(()=>{
        getAddresses();
    },[]);
    const addresses = useSelector((state)=>state.Reducer.userAddresses);

    const deleteAddress = (deleteAddressID)=>{
        let formData = new FormData();
        formData.append("deleteAddressID",deleteAddressID);
        fetch(APPDATAURLS.apiURL,{
            method:"post",
            body:formData
        }).
        then(req=>req.text()).
        then(data=>{
            console.log(data)
        }).catch(e=>{
            console.log(e)
        })
    }
    return(
        <ScrollView
            style={{
                width:"98%",
                flexGrow:1
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
                Addresses
            </Text>
            {
            loading?
            <ActivityIndicator size={40}/>
            :
            addresses.length>0?
                addresses.map((address,index)=>{
                    return(
                        <View
                            key={index}
                            style={{
                                width:"100%",
                                flexDirection:"row",
                                height:50,
                                justifyContent:"space-between",
                                alignItems:"center"
                            }}
                        >
                            <Text
                            style={{
                                color:"#000000"
                            }}
                            >Building:{address.addressBlock}</Text>
                            <Text
                            style={{
                                color:"#000000"
                            }}
                            >Room:{address.addressRoom}</Text>
                            <View
                                style={{
                                    width:"30%",
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={()=>{
                                        setSelectedAddress(index);
                                        setEditAddressModalOpen(true);
                                    }}
                                    style={{
                                        width:"45%",
                                        margin:"1%",
                                        height:30,
                                        borderRadius:5,
                                        backgroundColor:"orange",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        paddingLeft:5,
                                        paddingRight:5,
                                        paddingTop:1,
                                        paddingBottom:1
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:"#ffffff"
                                        }}
                                    >Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>{
                                        deleteAddress(address.addressID)
                                    }}
                                    style={{
                                        width:"45%",
                                        margin:"1%",
                                        height:30,
                                        borderRadius:5,
                                        backgroundColor:"red",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        paddingLeft:5,
                                        paddingRight:5,
                                        paddingTop:1,
                                        paddingBottom:1
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:"#ffffff"
                                        }}
                                    >Delete</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    )
                }):
                <Text
                style={{
                    color:"#000000"
                }}
                >No addresses found.</Text>
            }

            <Modal
                visible={addAddressModalOpen}
                onRequestClose={()=>setaddAddressModalOpen(false)}
                >
                <View
                    style={{
                            width:"100%"
                        }}>
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


            {
               addresses.length>0?
               
               <Modal
                    visible={editAddressModalOpen}
                    onRequestClose={()=>setEditAddressModalOpen(false)}
                >
                <View
                    style={{
                            width:"100%"
                        }}>
                    <TouchableOpacity
                        onPress={()=>setEditAddressModalOpen(false)}
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
                    <EditAddressComponent
                        addressBlock={addresses[selectedAddress].addressBlock}
                        addressRoom={addresses[selectedAddress].addressRoom}
                        addressID = {addresses[selectedAddress].addressID}
                    />
                </View>
               </Modal>:
               <></>
            }

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
        </ScrollView>
    )
}

export default AddressesComponent;