import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Linking
} from "react-native";
import LottieView from "lottie-react-native";

const ErrorComponent = ({error,children})=>{
    
    return(
        <View style={{justifyContent:"center",
                      alignItems:"center",
                      height:"100%",
                      width:"100%",
                      }}
            collapsable={false}  
                    >
           
           <View>
               
               <View>
               <LottieView
                        source={require("../assets/animations/no-internet1.json")}
                        style={{
                            height:"70%",
                            width:"100%"
                        }}
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
                        loop
                    />
                    <View style={{
                        marginTop:"-30%"
                    }}>

                        <Text style={{fontSize:20,color:"#000000"}}>
                        An error occurred</Text>
                        {/*<TouchableOpacity 
                            onPress={()=>{
                                //Linking.openURL("app-settings:{3}");
                            }}
                        >
                            <Text style={{fontSize:20,
                                            marginTop:10,
                                            }}>
                            Check your Internet Settings.</Text>
                        </TouchableOpacity>*/}
                    
                    </View>
                    {children}
                   </View>
            </View>
        </View>
    )
}

export default ErrorComponent;