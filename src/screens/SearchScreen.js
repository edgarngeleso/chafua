import React,{useState,useEffect} from "react";
import {Text,
        View,
        Image,
        TextInput,
        TouchableOpacity,
        SafeAreaView} from "react-native";
import APPDATAURLS from "../constants/APPDATAURLS";
const SearchScreen = ({navigation})=>{
    const[searches,setSearches] = useState([]);
    const [searchText,setSearchText] = useState("");
    const [error,setError] = useState(false);
    const search = ()=>{
        if(searchText.length>=2){
            let searchForm = new FormData();
            searchForm.append("search",searchText);
            fetch(`${APPDATAURLS.apiURL}`,{
                method:"post",
                body:searchForm
            })
            .then(req=>req.json())
            .then(data=>{
                console.log(data)
                setSearches(data);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }

    useEffect(()=>{
        search();
    },[searchText]);

    return (
        <SafeAreaView
        style={{
            height:"100%",
            width:"100%",
        }}
        >
            <View
            style={{
                width:"98%",
                height:40,
                flexDirection:"row",
                marginTop:20,
                marginLeft:"1%",
                alignItems:"center"
            }}
            >
                <TouchableOpacity
                style={{
                    width:"10%",
                    height:40,
                }}
                    onPress={()=>navigation.goBack()}
                >
                    <Image
                        style={{
                            width:20,
                            height:20,
                            tintColor:"orange"
                        }}
                        source={require("../assets/icons/go.png")}
                    />
                </TouchableOpacity>
                
                <View
                    style={{
                        width:"90%",
                        height:40
                    }}
                >
                    <TextInput
                        style={{
                            width:"100%",
                            borderBottomWidth:1,
                            padding:1,
                            fontSize:18,
                            textDecorationLine:null,
                            color:"#000000"
                        }}
                        placeholder={"Search items..."}
                        autoFocus
                        onChangeText={(text)=>{
                            setSearchText(text);
                        }}
                    />

                </View>
                
            </View>

            <View style={{
                width:"98%",
                marginTop:20,
                marginLeft:"1%",
            }}>
                {searches.length>0?
                    searches.map((product,index)=>{
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
                                    backgroundColor:"white",
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
                                        <Text
                                        style={{
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
                    }):
                    <Text></Text>
                }
            </View>
        </SafeAreaView>
    )
}

export default SearchScreen;