import React,{useState,useEffect} from "react"

import {Text,
        View,
        ScrollView,
        SafeAreaView,
        TouchableOpacity,
        ActivityIndicator,
        Image,
        StyleSheet} from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import SearchComponent from "../components/SearchComponent";
import CustomBar from "../components/CustomBar";
import APPDATAURLS from "../constants/APPDATAURLS";

const CategoryProductsScreen = ({navigation,route})=>{
    const {categoryID,categoryName} = route.params;
    const [categoryProductsData,setCategoryProductsData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [pageCount,setPageCount] = useState(1);
    const categoryProducts = (page=1)=>{
        fetch(`${APPDATAURLS.categoryProductsURL}${categoryID}$page=${page}`).
        then(req=>req.json()).
        then(data=>{
            setLoading(false);
            setCategoryProductsData(data);
        }).
        catch(e=>{
            setLoading(false);
            console.log(e);
        });
    }

    const loadMore = ()=>{
        setPageCount(pageCount+1);
        categoryProducts(pageCount);
    }

    useEffect(()=>{
        categoryProducts()
    },[]);
    return(
        <SafeAreaView>
        <HeaderComponent navigation={navigation}>
            <Text style={{fontSize:25,
                            fontWeight:"bold",
                            marginLeft:2,
                            color:"#000000"}}>
                    {categoryName}
                </Text>
        </HeaderComponent>
        <SearchComponent navigation={navigation}/>
        
        <ScrollView
            contentContainerStyle={{
                marginBottom:50
            }}
        >
            <CustomBar name={`${categoryName} items`}/>
                {loading?
                <ActivityIndicator size={40} />:
                categoryProductsData.length>0?
                <View>
                    {categoryProductsData.map((categoryProduct,index)=>{
                        return(
                            <TouchableOpacity
                                disabled={categoryProduct.isAvailable=1?false:true}
                                onPress={()=>navigation.navigate("details",categoryProduct)}
                                key={index}
                                style={{
                                    width:"100%",
                                    height:110,
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
                                    source={{uri:`${APPDATAURLS.mainURL}/${categoryProduct.productImage}`}}
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
                                            >{categoryProduct.productName}</Text>
                                            <Text style={{
                                                fontWeight:"bold",
                                                color:"#000000"
                                            }}>Ksh.{categoryProduct.productPrice}</Text>
                                            <Text
                                                style={{
                                                    color:"#000000"
                                                }}
                                            >Hotel:{categoryProduct.hotelName}</Text>
                                            <Text
                                            style={{
                                                color:"#000000"
                                            }}
                                            >Category:{categoryProduct.categoryName}</Text>

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
                    categoryProductsData.length>0?
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

export default CategoryProductsScreen;