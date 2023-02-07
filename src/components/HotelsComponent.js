import React, { useEffect, useState } from "react";
import {View,
        Text,
        Image,
        StyleSheet,
        TouchableOpacity,
        ActivityIndicator} from "react-native";
import { CHAFUADUMMYDATA } from "../constants/CHAFUADUMMYDATA";
import APPDATAURLS from "../constants/APPDATAURLS";
import ErrorComponent from "./ErrorComponent";

const HotelsComponent = ({navigation})=>{
    const [hotelsData,setHotelsData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const hotels = ()=>{
        fetch(APPDATAURLS.hotelsURL).
        then(req=>req.json()).
        then(data=>{
            setHotelsData(data);
            setLoading(false);
            setError(false);
        }).
        catch(e=>{
            setError(true);
            setLoading(false);
        })
    }

    const reload = ()=>{
        setError(false);
        setLoading(true);
        hotels();
    }

    useEffect(()=>hotels(),[]);
    return(
        <View style={{
            width:"99%",
            margin:2,
            display:"flex",

        }}>
            {error?
                <ErrorComponent
                error={error}
                >
                    <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress = {reload}
                            style={{width:"100%",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    backgroundColor:"orange",
                                    marginTop:10,
                                    borderRadius:5,
                                    height:28
                                }}
                        >
                            <Text style={{fontSize:20,
                                            color:"#ffffff"}}>
                                Try again...
                            </Text>
                        </TouchableOpacity>
                </ErrorComponent>:
                loading?
            <ActivityIndicator size={40}/>:
            hotelsData.map((hotel,index)=>{
                return(
                    <TouchableOpacity
                    disabled={hotel.status==1?false:true}
                    onPress={()=>hotel.status==1?navigation.navigate("hotel_products",hotel):""}
                    key={index}
                    style={{
                        width:"100%",
                        height:120,
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        marginBottom:3,
                        marginTop:index==0?5:0,
                        backgroundColor:"white",
                        borderRadius:5
                    }}>
                        <Image style={{
                            width:"48%",
                            height:"100%",
                            borderRadius:5,
                        }}
                        source={{uri:`${APPDATAURLS.mainURL}/${hotel.hotelImage}`}}
                        />

                        <View style={{
                            width:"40%",
                            height:"100%",
                            justifyContent:"space-between",
                            padding:5
                        }}>
                            <Text
                                style={{
                                    fontSize:17,
                                    color:"#000000"
                                }}
                            >{hotel.hotelName}</Text>
                            <Text
                                style={{
                                    fontWeight:"bold",
                                    fontSize:17,
                                    color:"#000000"
                                }}
                            >{hotel.status==1?"opened":"closed"}</Text>
                            <Text
                            style={{
                                color:"#000000"
                            }}
                            >{hotel.hotelEstimatedTime?hotel.hotelEstimatedTime:"Est:20-30minutes"}</Text>
                            <View
                                style={{
                                    alignItems:"center",
                                    flexDirection:"row",
                                }}
                            >
                                <Text
                                style={{
                                    color:"#0000ff"
                                }}
                                >{hotel.hotelStars?hotel.hotelStars:"4.9"}</Text>
                                <Image
                                    source={require("../assets/icons/star.png")}
                                    style={{
                                        width:12,
                                        height:12,
                                        tintColor:"orange",
                                        marginLeft:5,
                                    }}
                                />
                            </View>

                        </View>

                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default HotelsComponent;