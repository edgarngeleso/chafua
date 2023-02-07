import React from "react";
import {View,
        TextInput,
        StyleSheet,
        TouchableOpacity} from "react-native";

const SearchComponent = ({navigation})=>{

    return(
        <View style={styles.searchBar}>
            <TextInput
                disabled
                style={styles.input}
                placeholder="Search...."
                onFocus = {()=>navigation.navigate("search")}
            />
            
        </View>

    )
}

const styles = StyleSheet.create({
    searchBar:{
        height:40,
        width:"99%",
        margin:2,
    },
    input:{
        borderWidth:1,
        borderRadius:5,
        paddingLeft:10,
        paddingTop:5,
        fontSize:18,
        color:"#000000"
    }

})

export default SearchComponent;