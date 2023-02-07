import React, { useEffect, useState } from "react";
import {Text,
        View,
        StyleSheet,
        ActivityIndicator,
        TouchableOpacity,
        Image,
        ScrollView} from "react-native";
import APPDATAURLS from "../constants/APPDATAURLS";
import ErrorComponent from "./ErrorComponent";

const ProductsComponent = ({navigation})=>{
    const [productsData,setProductsData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [pageCount,setPageCount] = useState(1);

    const products = (page=1)=>{
        fetch(`${APPDATAURLS.productsURL}&page=${page}`,{method:"get"}).
        then(req=>req.json()).
        then(data=>{
            console.log(data)
            setLoading(false);
            setError(false);
            setProductsData(data);
        }).
        catch(e=>{
            setLoading(false);
            setError(true);
        })
    }

    const reload = ()=>{
        setError(false);
        setLoading(true);
        products();
    }

    const loadMore = ()=>{
        setPageCount(pageCount+1);
        products(pageCount);
    }

    useEffect(()=>{
        products();
    },[]);
    return(
        <ScrollView 
            contentContainerStyle={styles.container}
            style={styles.container} >
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
                loading?<ActivityIndicator size={40} />:
                productsData.length>0?
                <View>
                    {console.log("hey",productsData[0])}
                    {productsData.map((product,index)=>{
                        return(
                        <TouchableOpacity
                        disabled={product.isAvailable=1?false:true}
                        onPress={()=>navigation.navigate("details",product)}
                        key={index}
                        style={{
                            width:"100%",
                            height:120,
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between",
                            marginBottom:3,
                            marginTop:index==0?2:0,
                            backgroundColor:"#ffffff",
                            borderRadius:5
                        }}>
                            <Image style={{
                                width:"48%",
                                height:"100%",
                                borderRadius:5,
                            }}
                            source={{uri:`${APPDATAURLS.mainURL}/${product.productImage}`}}
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
                                >{product.productName}</Text>
                                <Text style={{
                                    fontWeight:"bold",
                                    color:"#000000"
                                }}>Ksh.{product.productPrice}</Text>
                                <Text
                                style={{
                                    color:"#000000"
                                }}
                                >Hotel:{product.hotelName}</Text>
                                <Text
                                style={{
                                    color:"#000000"
                                }}
                                >Category:{product.categoryName}</Text>

                            </View>

                        </TouchableOpacity>
                        )
                    })}
                </View>:
            <View>
                <Text
                style={{
                    color:"#000000"
                }}
                >No products found.</Text>
            </View>}

            {
                productsData.length>0?
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
    )
}

const styles = StyleSheet.create({
    container:{
        width:"99%",
        display:"flex",
        aligItems:"center"
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
});



export default ProductsComponent;