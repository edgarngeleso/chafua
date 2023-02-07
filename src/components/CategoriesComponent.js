import React,{useState,useEffect} from "react";
import {View,Text,TouchableOpacity,Image} from 'react-native';
import APPDATAURLS from "../constants/APPDATAURLS";
import { CHAFUADUMMYDATA } from "../constants/CHAFUADUMMYDATA";
const CategoriesComponent = ({navigation})=>{
    const [categories,setCategories] = useState([]);
    const fetchCategories = ()=>{
        fetch(APPDATAURLS.categoriesURL).
        then(req=>req.json()).
        then(data=>{
            setCategories(data);
        }).
        catch(e=>{
            console.log(e);
        })
    }

    useEffect(()=>fetchCategories(),[]);
    return(
        <View style={{
            width:"99%",
            margin:2,
            display:"flex",
            flexWrap:"wrap",
            flexDirection:"row",
            alignItems:"center"
        }}>
            {categories.map((category,index)=>{
                return(
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("category_products",category)}
                    key={index}
                    style={{
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-between",
                        borderRadius:5,
                        backgroundColor:"orange",
                        margin:2,
                        padding:5
                    }}
                    >
                        <Image
                            source={{uri:`${APPDATAURLS.mainURL}/${category.categoryImage}`}}
                            style={{
                                width:34,
                                height:34,
                                borderRadius:17,
                            }}
                            resizeMode={"cover"}
                        />
                        <Text style={{color:"white",
                                    margin:2}}>
                            {category.categoryName}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default CategoriesComponent;