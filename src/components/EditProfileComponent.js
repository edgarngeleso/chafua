import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import APPDATAURLS from "../constants/APPDATAURLS"

const EditProfileComponent = ({firstName,lastName,phoneNumber,email,customerID})=>{
    const [userDetails,setUserDetails] = useState({
        firstName:"",
        lastName:"",
        phoneNumber:"",
        email:"",
    });
    const [error,setError] = useState({error:false,message:""});
    const [loading,setLoading] = useState(false);


    let edit = ()=>{
        let formData = new FormData();
        setLoading(true);
        formData.append("editProfile","editProfile");
        formData.append("firstName",userDetails.firstName.length<1?firstName:userDetails.firstName);
        formData.append("lastName",userDetails.lastName.length<1?lastName:userDetails.lastName);
        formData.append("phoneNumber",userDetails.phoneNumber.length<1?phoneNumber:userDetails.phoneNumber);
        formData.append("email",userDetails.email.length<1?email:userDetails.email);
        formData.append("customerID",customerID);
        fetch(APPDATAURLS.apiURL,{
            method:"post",
            body:formData
        })
        .then(req=>req.text())
        .then(data=>{
            console.log(data);
            setError(data);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);
        })
    }

    return(
        <KeyboardAvoidingView 
        behavior={"padding"}
        enabled
        style={{
            width:"100%",
            flexGrow:1,
            
        }}>
            <Text 
                style={{textAlign:"center",
                        fontSize:18,
                        textDecorationLine:"underline",
                        margin:"1%",
                        }}>Edit Profile</Text>
            <Text style={{color:error.error?"red":"green",
                            textAlign:"center"}}>{error.message}</Text>
            <Text
            style={{
                color:"#000000"
            }}
            >First Name</Text>
            <TextInput 
                placeholder={firstName}
                style={styles.input}
                onChangeText={(text)=>{
                    setUserDetails({...userDetails,firstName:text})
                }}/>
            <Text
            style={{
                color:"#000000"
            }}
            >Last name</Text>
            <TextInput 
                placeholder={lastName}
                style={styles.input}
                onChangeText={(text)=>{
                    setUserDetails({...userDetails,lastName:text})
                }}/>
            <Text
            style={{
                color:"#000000"
            }}
            >Email</Text>
            <TextInput 
                placeholder={email}
                style={styles.input}
                onChangeText={(text)=>{
                    setUserDetails({...userDetails,email:text})
                }}/>
            <Text
            style={{
                color:"#000000"
            }}
            >Phone number</Text>
            <TextInput 
                placeholder={phoneNumber}
                style={styles.input}
                onChangeText={(text)=>{
                    setUserDetails({...userDetails,phoneNumber:text})
                }}/>
            <TouchableOpacity style={styles.btn}
                onPress = {edit}
            >
                {loading?
                    <ActivityIndicator size={30} color={"#ffffff"}/>:
                    <Text style={{color:"white",fontSize:18}}>Update</Text>
                }
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderRadius:5,
        height:40,
        marginBottom:5,
        color:"#000000",
    },
    btn:{
        width:"98%",
        margin:"1%",
        height:40,
        borderRadius:5,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"orange",
    }
})

export default EditProfileComponent;