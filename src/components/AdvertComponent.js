import React,{useState,useEffect} from "react";
import {ScrollView,
        View,
        Text,
        Image,
        ImageBackground,
        StyleSheet,
        ActivityIndicator,
        FlatList} from "react-native";
import APPDATAURLS from "../constants/APPDATAURLS";

const AdvertComponent = ()=>{
    const [adverts,setAdverts] = useState([]);
    const [loading,setLoading] = useState(true);    
    
    const fetchData = ()=>{
        fetch(APPDATAURLS.advertsURL).
        then(req=>req.json()).
        then(data=>{
            setAdverts(data);
            setLoading(false);
        }).
        catch(e=>{
            setLoading(false);
            console.log(e);
        })
    }

    const render_item = (advert,index)=>{
        return(
            <View collapsable={false} 
            style={{
                width:350,
                height:200,
                borderRadius:5,
                flexDirection:"column",
                margin:3,
                }}
            >
                
                <View 
                    style={{
                            width:"100%",
                            height:"100%",
                            borderRadius:5,
                            margin:3,
                            }}
                        
                        key={index}
                        >
                            <View style={{
                                borderRadius:5,
                                position:"absolute",
                                height:"100%",
                                width:"100%",
                                backgroundColor:"transparent",
                                display:"flex",
                                flexDirection:"column",
                                alignItems:"baseline",
                                justifyContent:"space-between",
                                zIndex:10
                            }}>

                            <View style={{
                                    backgroundColor:"orange",
                                    height:30,
                                    width:"50%",
                                    alignItems:"center",
                                    borderBottomRightRadius:15,
                                    
                                }}>
                            <Text
                                style={{
                                    color:"white",
                                    fontSize:20}}
                                >
                                {advert.item.advertTitle}
                            </Text>
                        </View>

                        <View style={{
                                    backgroundColor:"white",
                                    width:"100%",
                                    padding:2,
                                    borderTopLeftRadius:5,
                                    borderTopRightRadius:5
                            }}>
                            <Text
                                style={{
                                        color:"orange",
                                        fontSize:18}}
                            >
                                {advert.item.advertDescription}
                            </Text>
                        </View>
                                
                    </View>

                    <Image
                        source={{uri:`${APPDATAURLS.mainURL}/${advert.item.advertImage}`}}
                        resizeMode="cover"
                        style={{
                                width:"100%",
                                height:"100%",
                                borderRadius:5
                                }}
                    />
                </View>
            </View>
        )
    }

    const key_extractor = (item)=>{
        return item.advertID;
    }

    useEffect(()=>fetchData(),[]);

    /*const withScrollView = ()=>{
        return(
            <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator = {false}
        contentContainerStyle={styles.holder}>

            {loading?
            <ActivityIndicator size={40}/>:
            adverts.length>0?
            adverts.map((advert,index)=>{
                return(
                    <View style={{
                        width:"90%",
                        height:200,
                        borderRadius:5,
                        margin:3,
                        }}
                    
                    key={index}
                    >
                        <View style={{
                            borderRadius:5,
                            position:"absolute",
                            height:"100%",
                            width:"100%",
                            backgroundColor:"transparent",
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"baseline",
                            justifyContent:"space-between",
                            zIndex:10
                        }}>

                        <View style={{
                                backgroundColor:"orange",
                                height:30,
                                width:"50%",
                                alignItems:"center",
                                borderBottomRightRadius:15,
                                
                            }}>
                            <Text
                                style={{
                                    color:"white",
                                    fontSize:20}}
                                >
                                    {advert.advertTitle}
                            </Text>
                        </View>

                            <View style={{
                                backgroundColor:"white",
                                width:"100%",
                                padding:2,
                                borderTopLeftRadius:5,
                                borderTopRightRadius:5
                            }}>
                                <Text
                                    style={{
                                        color:"orange",
                                        fontSize:18}}
                                    >
                                        {advert.advertDescription}
                                </Text>
                            </View>
                            
                        </View>

                        <Image
                            source={{uri:`${APPDATAURLS.mainURL}/${advert.advertImage}`}}
                            resizeMode="cover"
                            style={{
                                width:"100%",
                                height:"100%",
                                borderRadius:5
                            }}
                        />
                    </View>
                )
            }):
            <View
                style={{
                    width:"90%",
                    height:200,
                    borderRadius:5,
                    margin:3,

                }}
            >
                <Image
                    source={require("../assets/images/food.jpg")}
                    resizeMode={"cover"}
                    style={{
                        width:"100%",
                        height:"100%",
                        borderRadius:5,
                    }}
                />
            </View>}
            
            
        </ScrollView>
        )
    }*/

    return(
        <View
        style={{
            height:200
        }}
        >
            {loading?
            <ActivityIndicator size={40}/>:
            adverts.length>0?
            <FlatList
                horizontal = {true}
                data = {adverts}
                renderItem = {render_item}
                keyExtractor = {key_extractor}
                showsHorizontalScrollIndicator = {false}

            />:
            <View
                style={{
                    width:"90%",
                    height:200,
                    borderRadius:5,
                    margin:3,

                }}
            >
                <Image
                    source={require("../assets/images/food.jpg")}
                    resizeMode={"cover"}
                    style={{
                        width:"100%",
                        height:"100%",
                        borderRadius:5,
                    }}
                />
            </View>}
        </View>
        
    )
}

const styles = StyleSheet.create({
    holder:{
        height:200,
        marginLeft:2,
        display:"flex",
        flexGrow:1,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"transparent"
    }
})

export default AdvertComponent;