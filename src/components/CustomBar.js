import React,{useState} from "react"
import {View,Text,Image,TouchableOpacity} from "react-native";

const CustomBar = ({name})=>{
    const [isList,setIsList] = useState(true);
    return(
        <View style={{
            height:40,
            width:"99%",
            margin:2,
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            backgroundColor:"whitesmoke"

        }}>
            <Text style={{fontSize:17,color:"#000000"}}>{name}</Text>
            <TouchableOpacity
                onPress = {()=>isList?setIsList(false):setIsList(true)}
            >

                <Image
                    source={isList?
                            require("../assets/icons/list.png"):
                            require("../assets/icons/grid.png")}
                    resizeMode={"cover"}
                    style={{
                        width:28,
                        height:28,
                    }}
                />
            </TouchableOpacity>
            

        </View>
    )
}

export default CustomBar;