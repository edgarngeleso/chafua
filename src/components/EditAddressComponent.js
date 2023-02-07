import React,{useEffect,useState} from "react";
import {View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet,
        ActivityIndicator} from "react-native";
import APPDATAURLS from "../constants/APPDATAURLS";

const EditAddressComponent = ({addressBlock,addressRoom,addressID})=>{
    const [address,setAddress] = useState({
        error:false,
        message:"",
        loading:false
    });
    const [addressCredentials,setAddressCredentials] = useState({
        addressBlock:"",
        addressRoom:"",
    });

    const editAddress = ()=>{
        setAddress({...address,loading:true});

        let formData = new FormData();
        formData.append("editAddressByID",addressID);
        formData.append("addressBlock",addressCredentials.addressBlock.length<1?addressBlock:addressCredentials.addressBlock);
        formData.append("addressRoom",addressCredentials.addressRoom.length<1?addressRoom:addressCredentials.addressRoom);
        fetch(`${APPDATAURLS.apiURL}`,{
            method:"post",
            body:formData
        }).
        then(req=>req.json()).
        then(data=>{
            setAddress({
                loading:false,
                message:data.message,
                error:data.error
            })
        }).catch(e=>{
            setAddress({
                loading:false,
                message:"",
                error:false
            })
            console.log(e);
        })
    }
    return(
        <View 
            style={{
                    width:"100%"
            }}
        >
            <Text
                style={{
                    textAlign:"center",
                    fontSize:18,
                    fontWeight:"bold",
                    textDecorationLine:"underline",
                    color:"#000000"
                }}
                >Edit address</Text>
    
                <Text
                    style={{
                        textAlign:"center",
                        margin:5,
                        color:address.error?"red":"green"
                    }}
                >{address.message}</Text>
                
                <Text
                style={{
                    color:"#000000"
                }}
                >
                    Block name*
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>{
                        setAddressCredentials({...addressCredentials,
                                            addressBlock:text})
                    }}

                    placeholder={`${addressBlock}`}
                />
                <Text
                style={{
                    color:"#000000"
                }}
                >
                    Room number*
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>{
                        setAddressCredentials({...addressCredentials,
                                            addressRoom:text})
                    }}

                    placeholder={`${addressRoom}`}
                />
                <TouchableOpacity
                    onPress={()=>{
                        editAddress();
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
    
                    {address.loading?
                    <ActivityIndicator
                        size={30}
                        color={"#ffffff"}
                    />:
                    <Text
                        style={{
                            color:"#ffffff",
                            fontSize:17
                        }}
                    >Edit address</Text>}
                </TouchableOpacity>
            </View>
        )
    }
    
    const styles = StyleSheet.create({
        input:{
            borderWidth:1,
            borderRadius:5,
            height:40,
            marginBottom:5,
            width:"100%",
            color:"#000000"
        }
    });

    export default EditAddressComponent;