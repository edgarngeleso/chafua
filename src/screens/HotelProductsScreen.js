import React, { useEffect, useState } from "react"

import {Text,
    View,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    StyleSheet} from "react-native";
import CustomBar from "../components/CustomBar";
import HeaderComponent from "../components/HeaderComponent";
import SearchComponent from "../components/SearchComponent";
import APPDATAURLS from "../constants/APPDATAURLS";

const HotelProductsScreen = ({navigation,route})=>{
    const {hotelID,hotelName} = route.params;
    const [hotelProductsData,setHotelProductsData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [pageCount,setPageCount] = useState(1);

    const hotelProducts = (page=1)=>{
        fetch(`${APPDATAURLS.hotelProductsURL}${hotelID}&page=${page}`).
        then(req=>req.json()).
        then(data=>{
            setLoading(false);
            setHotelProductsData(data);
        }).
        catch(e=>{
            setLoading(false);
        });
    }
    const loadMore = ()=>{
        setPageCount(pageCount+1);
        hotelProducts(pageCount);
    }
    useEffect(()=>hotelProducts(),[]);
    return(
        <SafeAreaView
            
        >
            <HeaderComponent navigation={navigation}>
                <Text style={{fontSize:25,
                                fontWeight:"bold",
                                marginLeft:2}}>
                        {hotelName.length>20?`${hotelName.substring(0,20)}...`:hotelName}
                    </Text>
            </HeaderComponent>
            <SearchComponent navigation={navigation}/>
            
            <ScrollView
                contentContainerStyl={{
                    marginBottom:50
                }}
            >
                <CustomBar name={`${hotelName} items`}/>
                    {loading?
                    <ActivityIndicator size={40}/>:
                    hotelProductsData.length>0?
                    <View>
                        {hotelProductsData.map((hotelProduct,index)=>{
                            return(
                                <TouchableOpacity
                                    disabled={hotelProduct.isAvailable=1?false:true}
                                    onPress={()=>navigation.navigate("details",hotelProduct)}
                                    key={index}
                                    style={{
                                        width:"100%",
                                        height:120,
                                        display:"flex",
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        marginBottom:3,
                                        marginTop:index==0?2:0,
                                        backgroundColor:"white",
                                        borderRadius:5
                                    }}>
                                        <Image style={{
                                            width:"48%",
                                            height:"100%",
                                            borderRadius:5,
                                        }}
                                        source={{uri:`${APPDATAURLS.mainURL}/${hotelProduct.productImage}`}}
                                        />

                                        <View style={{
                                            width:"40%",
                                            height:"100%",
                                            justifyContent:"space-between",
                                            padding:3
                                        }}>
                                            <Text
                                            style={{
                                                color:"#000000"
                                            }}
                                            >{hotelProduct.productName}</Text>
                                            <Text style={{
                                                fontWeight:"bold",
                                                color:"#000000"
                                            }}>Ksh.{hotelProduct.productPrice}</Text>
                                            <Text
                                            style={{
                                                color:"#000000"
                                            }}
                                            >Hotel:{hotelProduct.hotelName}</Text>
                                            <Text
                                            style={{
                                                color:"#000000"
                                            }}
                                            >Category:{hotelProduct.categoryName}</Text>

                                        </View>

                                    </TouchableOpacity>
                            )
                        })}
                    </View>:
                    <View
                    style={{
                        width:"100%",
                        height:"100%",
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                    >
                        <Text
                        style={{
                            color:"#000000"
                        }}
                        >No products found</Text>
                    </View>}

                    {
                    hotelProductsData.length>0?
                        <TouchableOpacity style={styles.btn}
                            onPress={loadMore}
                        >
                            {loading?
                            <ActivityIndicator size={30} color={"#ffffff"}/>:
                            <Text style={{color:"#ffffff",fontSize:18}}>Load more</Text>    
                            }
                        </TouchableOpacity>:
                        <></>
                    }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
});
export default HotelProductsScreen;