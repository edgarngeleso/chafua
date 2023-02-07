import React,{useState} from "react"
import {View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet,
        KeyboardAvoidingView,
        ActivityIndicator} from "react-native";
import APPDATAURLS from "../constants/APPDATAURLS";


const SignUpComponent = ({navigation})=>{
    const [userDetails,setUserDetails] = useState({
        firstName:"",
        lastName:"",
        phoneNumber:"",
        email:"",
        password:"",
    });
    
    const [error,setError] = useState({error:false,message:""});
    const [loading,setLoading] = useState(false);

    let signup = ()=>{
        let formData = new FormData();
        if(userDetails.firstName.length<1){
            setError({error:true,message:"First name is required."});
            return false;
        }

        if(userDetails.lastName.length<1){
            setError({error:true,message:"Last name is required."});
            return false;
        }

        if(userDetails.email.length<1){
            setError({error:true,message:"Email is required."});
            return false;
        }

        if(userDetails.phoneNumber.length<1){
            setError({error:true,message:"Phone number is required."});
            return false;
        }

        if(userDetails.password.length<1){
            setError({error:true,message:"Password is required."});
            return false;
        }
        setLoading(true);
        formData.append("register","register");
        formData.append("firstName",userDetails.firstName);
        formData.append("lastName",userDetails.lastName);
        formData.append("phoneNumber",userDetails.phoneNumber);
        formData.append("email",userDetails.email);
        formData.append("password",userDetails.password);
        fetch(APPDATAURLS.apiURL,{
            method:"post",
            body:formData
        })
        .then(req=>req.json())
        .then(data=>{
            setError(data);
            setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
            setError({error:true,message:"An error occurred, try again later."})
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
            <Text style={{color:error.error?"red":"green",
                            textAlign:"center"}}>{error.message}</Text>
            <Text
            style={{
                color:"#000000"
            }}
            >First Name*</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(text)=>{
                    setError({error:false,message:""});
                    setUserDetails({...userDetails,firstName:text})
                }}/>
            <Text
            style={{
                color:"#000000"
            }}
            >Last name*</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(text)=>{
                    setError({error:false,message:""});
                    setUserDetails({...userDetails,lastName:text})
                }}/>
            <Text
            style={{
                color:"#000000"
            }}
            >Email*</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(text)=>{
                    setError({error:false,message:""});
                    setUserDetails({...userDetails,email:text})
                }}/>
            <Text
            style={{
                color:"#000000"
            }}
            >Phone number*</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(text)=>{
                    setError({error:false,message:""});
                    setUserDetails({...userDetails,phoneNumber:text})
                }}/>
            <Text
            style={{
                color:"#000000"
            }}
            >Password*</Text>
            <TextInput 
                secureTextEntry = {true}
                style={styles.input}
                onChangeText={(text)=>{
                    setError({error:false,message:""});
                    setUserDetails({...userDetails,password:text})
                }}/>
            <TouchableOpacity style={styles.btn}
                onPress = {signup}
            >
                {loading?
                <ActivityIndicator size={30} color={"#ffffff"}/>:
                <Text style={{color:"white",fontSize:18}}>Sign up</Text>    
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
        color:"#000000"
    },
    btn:{
        width:"100%",
        height:40,
        borderRadius:5,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"orange",
        marginTop:3
    }
})

export default SignUpComponent;