import React,{useState} from "react";
import {SafeAreaView,
        ScrollView,
        View,
        Text,
        TouchableOpacity,
        StatusBar,
        StyleSheet,
        Image} from "react-native";
import SignInComponent from "../components/SignInComponent";
import SignUpComponent from "../components/SignUpComponent";

const SigninSignupScreen = ({navigation})=>{
    const [isSigninOpen,setIsSigninOpen] = useState(true);
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="orange"/>
            <ScrollView 
                contentContainerStyle={{width:"100%",
                                    height:"100%",
                                    }}
                style={{
                    flexGrow:1,
                }}
                >
                <View style={styles.logo}>
                    <TouchableOpacity
                        onPress={()=>navigation.goBack()}
                    >
                        <Image
                            source={require("../assets/icons/go.png")}
                            style={{
                                width:20,
                                height:20,
                                tintColor:"orange"
                            }}
                        />
                    </TouchableOpacity>
                    <></>
                </View>

                <View style={styles.holder}>
                    <TouchableOpacity
                        style={{...styles.text_holder,
                                backgroundColor:isSigninOpen?"white":"transparent"}}
                        onPress={()=>{setIsSigninOpen(true)}}
                    >
                        <Text 
                            style={{
                                fontSize:isSigninOpen?20:14,
                                fontWeight:isSigninOpen?"bold":null,
                                color:isSigninOpen?"orange":"#000000",
                                textDecorationLine:isSigninOpen?"underline":null 
                             }}
                        >Sign in</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={{...styles.text_holder,
                            backgroundColor:isSigninOpen?"transparent":"white"}}
                        onPress={()=>setIsSigninOpen(false)}
                    >
                        <Text
                            style={{
                               fontSize:isSigninOpen?14:20,
                               fontWeight:isSigninOpen?null:"bold",
                               color:isSigninOpen?"#000000":"orange",
                               textDecorationLine:isSigninOpen?null:"underline" 
                            }}
                        >Sign up</Text>
                    </TouchableOpacity>

                </View>
                <View style={{width:"90%",
                            marginLeft:"5%",
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",}}>
                    <Text style={{fontSize:18,
                                textDecorationLine:"underline",
                                textAlign:"center"}}>
                        {isSigninOpen==true?"Sign In":"Sign Up"}
                    </Text>
                    {isSigninOpen==true?
                        <SignInComponent navigation={navigation}/>:
                        <SignUpComponent navigation={navigation}/>}
                    <View style={{width:"100%",}}>
                            {isSigninOpen==true?
                            <TouchableOpacity
                                onPress={()=>{setIsSigninOpen(false)}}
                                style={{
                                    display:"flex",
                                    flexDirection:"row",
                                }}
                            >
                                <Text
                                    style={{
                                        color:"#000000"
                                    }}
                                >
                                    Don't have an account?
                                </Text>
                                <Text style={{color:"green",
                                            marginLeft:3}}>
                                                Sign Up
                                </Text>
                            </TouchableOpacity>:
                            <TouchableOpacity
                                onPress={()=>setIsSigninOpen(true)}
                                style={{
                                    display:"flex",
                                    flexDirection:"row",
                                }}
                            >
                                <Text
                                    style={{
                                        color:"#000000"
                                    }}
                                >
                                    Have an account?
                                </Text>
                                <Text style={{color:"green",
                                            marginLeft:3}}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>}

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
    },
    logo:{
        margin:5,
        height:60,
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    holder:{
        width:"90%",
        marginLeft:"5%",
        height:50,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    text_holder:{
       padding:5 ,
       borderRadius:5
    }
})

export default SigninSignupScreen;
