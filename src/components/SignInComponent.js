import React,{useState} from "react"
import {SafeAreaView,
        ScrollView,
        View,
        Text,
        TextInput,
        TouchableOpacity,
        ActivityIndicator,
        StatusBar,
        StyleSheet,
        Modal,
        KeyboardAvoidingView} from "react-native";
import { useDispatch } from "react-redux";
import APPDATAURLS from "../constants/APPDATAURLS";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const SignInComponent = ({navigation})=>{
    const [isForgotPasswordModalOpen,setIsForgotPasswordModalOpen] = useState(false);
    const [userDetails,setUserDetails] = useState({
        email:"",
        password:"",
    });
    const [error,setError] = useState("");
    const [customerData,setCustomerData] = useState([]);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    const signIn = ()=>{

        if(userDetails.email.length<2){
            return false;
        }

        if(userDetails.password.length<2){
            return false;
        }

        setLoading(true);

        let formData = new FormData();
        formData.append("login","login");
        formData.append("email",userDetails.email);
        formData.append("password",userDetails.password);
        fetch(APPDATAURLS.apiURL,{
            method:"post",
            body:formData
        })
        .then(req=>req.json())
        .then(data=>{

            setLoading(false);

            if(data.error_state == true){
                setError(data.message);
            }else{

                setCustomerData(data);
                let info = {
                    loggedIn:true,
                    data:data
                }

                saveUserLoginData(info);

                dispatch({
                    type:"LOGIN",
                    payload:info
                })

                setUserDetails({
                    email:"",
                    password:""
                });
            }

        })
        .catch(err=>{
            setLoading(false);
        })
    }

    const saveUserLoginData = async (data)=>{
        try{
            let userData = JSON.stringify(data);
            await AsyncStorageLib.setItem("userData",userData);
        }catch(e){
            console.log(e);
        }
    }

    return(
        <KeyboardAvoidingView 
        behavior={"padding"}
        enabled
        style={{
            width:"100%",
        }}>
            {/**Forgot password modal */}
            <Modal
                visible={isForgotPasswordModalOpen}
                transparent
                animationType="slide"
                onRequestClose = {()=>setIsForgotPasswordModalOpen(false)}
            >
                <View style={{
                    width:"100%",
                    height:"100%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    backgroundColor:"#ffffff",
                    marginTop:5
                }}>
                    <Text style={{width:"70%",marginBottom:4,color:"#000000"}}>Email*</Text>
                    <TextInput style={{...styles.input,
                                        width:"70%"}}/>
                    <TouchableOpacity style={{...styles.btn,
                                            width:"70%",
                                            }}>
                        <Text style={{color:"white"}}>Request password reset</Text>
                    </TouchableOpacity>
                </View>
                
            </Modal>

            <Text style={{
                margin:10,
                textAlign:"center",
                color:"red"
            }}>{error}</Text>
            <Text
            style={{
                color:"#000000"
            }}
            >Email*</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(text)=>{
                    setUserDetails({...userDetails,
                                    email:text})
                }}
                underlineColorAndroid = "transparent"
                />
            <Text
            style={{
                color:"#000000"
            }}
            >Password*</Text>
            <TextInput 
                    secureTextEntry = {true}
                    style={styles.input}
                    onChangeText={(text)=>{
                        setUserDetails({...userDetails,
                                        password:text})
                    }}
                    underlineColorAndroid = "transparent"
                    />

            <TouchableOpacity 
                onPress={()=>setIsForgotPasswordModalOpen(true)}
            >
                <Text style={{color:"green"}}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}
                onPress={signIn}
            >
                {loading?
                <ActivityIndicator size={30} color={"#ffffff"}/>:
                <Text style={{color:"white",fontSize:18}}>Sign in</Text>    
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
        width:"100%",
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
        marginTop:5
    }
})

export default SignInComponent;