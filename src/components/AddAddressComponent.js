import React,{useEffect,useState} from "react";
import {View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet,
        ActivityIndicator} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import APPDATAURLS from "../constants/APPDATAURLS";
const AddAddressComponent = ()=>{
    const [address,setAddress] = useState({
        error:false,
        message:"",
        loading:false
    });

    const [addressCredentials,setAddressCredentials] = useState({
        addressBlock:"",
        addressRoom:"",
    });

    const loginInfo = useSelector((state)=>state.Reducer.loginInfo);
    const dispatch = useDispatch();

    const addAddress = ()=>{
        setAddress({
            ...address,
            loading:true
        });
        let formData = new FormData();
        formData.append("addressBlock",addressCredentials.addressBlock);
        formData.append("addressRoom",addressCredentials.addressRoom);
        formData.append("addAddressByCustomerID",loginInfo.data.customerData.customerID);

        fetch(`${APPDATAURLS.apiURL}`,
        {
            method:"post",
            body:formData,
        }).
        then(req=>req.json()).
        then(data=>{
            setAddress({
                loading:false,
                message:data.message,
                error:data.error
            });
            if(data.error == false){
                getAddresses();
                setAddressCredentials({
                    addressBlock:"",
                    addressRoom:""
                })
            }
        }).
        catch(err=>{
            setAddress({
                loading:false,
                message:"An error occurred. Try again later.",
                error:true
            });
        })
    }
    
    const getAddresses = ()=>{
        if(loginInfo.loggedIn){
            fetch(`${APPDATAURLS.customerAddresesURL}${loginInfo.data.customerData.customerID}`,{method:"get"}).
            then(req=>req.json()).
            then(data=>{
                
                dispatch({
                    type:"USER_ADDRESSES",
                    payload:data
                })
            }).catch(error=>{
                
                console.log(error);
            })
        }
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
            >Add address</Text>

            <Text
                style={{
                    textAlign:"center",
                    margin:5,
                    color:address.error?"red":"green"
                }}
            >{address.message}</Text>
            
            <Text>
                Block name*
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{
                    setAddressCredentials({...addressCredentials,
                                        addressBlock:text})
                }}
            />
            <Text>
                Room number*
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{
                    setAddressCredentials({...addressCredentials,
                                        addressRoom:text})
                }}
            />
            <TouchableOpacity
                onPress={()=>{
                    addAddress();
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
                >Add address</Text>}
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
export default AddAddressComponent;