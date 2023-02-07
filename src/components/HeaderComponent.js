import React,{useState} from "react";
import {Text,
        View,
        StatusBar,
        StyleSheet,
        TouchableOpacity,
        Image,
        Modal,
        Dimensions,
        Share,
        Linking,
        Alert,
        ToastAndroid
        } from "react-native";
import { useDispatch,useSelector } from "react-redux";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const HeaderComponent = ({navigation,children})=>{
    const [menuOpen,setMenuOpen] = useState(false);
    const user = useSelector(state=>state.Reducer.loginInfo);
    const items = useSelector(state=>state.Reducer.selectedItems);
    let total = items.items.map((item)=>Number(item.quantity))
                                .reduce((prev,curr)=>prev+curr,0)
    const dispatch = useDispatch();
    const openLink = async (url)=>{
        const supported = await Linking.canOpenURL(url);
        if(supported){
            await Linking.openURL(url);
        }else{
          //Alert.alert("Error",`No app can open this url`);
          ToastAndroid.show(`No app can open this url.`,ToastAndroid.LONG);
        }
      }

    const deleteStorageData = async ()=>{
        try {
             await AsyncStorageLib.clear();                   
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View style={styles.bar}>
            {/*<View style={{
                position:"absolute",
                width:"80%",
                height:Dimensions.get("window").height,
                backgroundColor:"red",
                zIndex:100
            }}>
                <Text>Side bar</Text>
            </View>*/}
            <View style={styles.inner_bar}>
                {children}
            </View>
            
            <></>

            <View style={styles.inner_bar}>
                <TouchableOpacity
                    style={{...styles.touchable,marginRight:10}}
                    onPress={()=>navigation.navigate("profile")}
                >
                    <Image
                        source={require("../assets/icons/profile.png")}
                        style={{width:25,height:25}}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{...styles.touchable,
                        marginRight:2
                    }}

                    onPress={()=>menuOpen?setMenuOpen(false):setMenuOpen(true)}
                >
                    <Image
                        source={require("../assets/icons/menu.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                
            </View>
            {/**Menu items modal*/}
            <Modal
                visible={menuOpen}
                animationType="slide"
                transparent
                onRequestClose={()=>setMenuOpen(false)}
            >
                <View style={{
                    height:"100%",
                    width:"100%",
                    flexDirection:"column",
                    backgroundColor:"#ffffff"
                }}>
                    
                    <TouchableOpacity
                        onPress={()=>setMenuOpen(false)}
                        style={{
                            flexDirection:"row",
                            alignItems:"center",
                            marginTop:10,
                        }}
                    >
                        <Image
                            source={require("../assets/icons/go.png")}
                            style={{
                                marginLeft:5,
                                height:20,
                                width:20,
                                tintColor:"orange"
                            }}
                        />

                        <Text style={{fontSize:25,
                                fontWeight:"bold",
                                marginLeft:20,
                                color:"#000000"}}>
                            Menu
                        </Text>
                    </TouchableOpacity>


                    <View style={{
                        width:"100%",
                        marginTop:15,
                    }}>

                    <TouchableOpacity
                            onPress={()=>{
                                setMenuOpen(false);
                                navigation.navigate("profile")}}
                            style={{...styles.menuItems,
                                    height:user.loggedIn?null:50}}
                        >
                            <Image
                                source={require("../assets/icons/profile.png")}
                                style={styles.menuImages}
                            />
                            {user.loggedIn?
                                <View
                                    style={{
                                        padding:4,
                                        
                                    }}
                                >
                                    <Text
                                        style={styles.menuText}
                                    >
                                        {`${user.data.customerData.firstName} ${user.data.customerData.lastName}`}
                                    </Text>

                                    <Text
                                        style={styles.menuText}
                                    >
                                        {`${user.data.customerData.email}`}
                                    </Text>
                                </View>:
                                <Text
                                    style={styles.menuText}
                                >
                                    Login
                                </Text>
                            }
                            
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={()=>{
                                setMenuOpen(false);
                                navigation.navigate("home")}}
                            style={styles.menuItems}
                        >
                            <Image
                                source={require("../assets/icons/home.png")}
                                style={styles.menuImages}
                            />

                            <Text
                                style={styles.menuText}
                            >
                                Home
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                setMenuOpen(false);
                                navigation.navigate("hotels")}}
                            style={styles.menuItems}
                        >
                            <Image
                                source={require("../assets/icons/products.png")}
                                style={styles.menuImages}
                            />

                            <Text
                                style={styles.menuText}
                            >
                                Hotels
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                setMenuOpen(false);
                                navigation.navigate("products")}}
                            style={styles.menuItems}
                        >
                            <Image
                                source={require("../assets/icons/hot.png")}
                                style={styles.menuImages}
                            />

                            <Text
                                style={styles.menuText}
                            >
                                foods
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                setMenuOpen(false);
                                navigation.navigate("notifications")}}
                            style={styles.menuItems}
                        >
                            <Image
                                source={require("../assets/icons/notification.png")}
                                style={styles.menuImages}
                            />

                            <Text
                                style={styles.menuText}
                            >
                                Notifications
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                setMenuOpen(false);
                                navigation.navigate("cart")}}
                            style={styles.menuItems}
                        >
                            <Image
                                source={require("../assets/icons/cart.png")}
                                style={styles.menuImages}
                            />

                            <Text
                                style={styles.menuText}
                            >
                                Cart ({total})
                            </Text>
                        </TouchableOpacity>

                        {user.loggedIn?
                        <TouchableOpacity
                        onPress={()=>{
                            setMenuOpen(false);
                            deleteStorageData();
                            dispatch({
                                type:"LOGOUT"
                            });
                            navigation.navigate("Home")
                        }}
                            style={styles.menuItems}
                        >
                        <Image
                            source={require("../assets/icons/logout.png")}
                            style={styles.menuImages}
                        />

                        <Text
                            style={styles.menuText}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>:
                    <></>}

                        <View
                        style={{
                            zIndex:2,
                            position:"absolute",
                            borderTopWidth:1,
                            width:"100%",
                            marginTop:Dimensions.get("screen").height-185,
                        }}
                    >
                        <Text
                            style={{
                                textAlign:"center",
                                textDecorationLine:"underline",
                                fontSize:20
                            }}
                        >Contact us</Text>
                        <View
                            style={{
                                width:"98%",
                                margin:"1%",
                                flexDirection:"row",
                                justifyContent:"space-between"
                            }}
                        >
                            <TouchableOpacity
                                onPress={()=>{
                                    let phoneNumber_url = "tel://0742092433";
                                    openLink(phoneNumber_url);
                                  }}
                                  style={{justifyContent:"center",
                                            alignItems:"center",
                                            flexDirection:"row",
                                            padding:5,}}>
                                <Image
                                    source={require("../assets/icons/contact.png")}
                                    style={{
                                        height:20,
                                        width:20,
                                        borderRadius:5
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize:16,
                                        marginLeft:10,
                                        color:"#000000"
                                    }}
                                >Call</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={()=>{
                                    let sms_url = `sms:0742092433?body="Hello,thank you for contacting us.How can we help you?"`;
                                    openLink(sms_url);
                                  }}

                                  style={{justifyContent:"center",
                                            alignItems:"center",
                                            flexDirection:"row",
                                            padding:5,}}
                            >
                                <Image
                                    source={require("../assets/icons/comment.png")}
                                    style={{
                                      height:20,
                                      width:20,
                                      borderRadius:5
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize:16,
                                        marginLeft:10,
                                        color:"#000000"
                                    }}
                                >sms</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={()=>{
                                    let email_url = "mailto:jamesmakaumusyoki@gmail.com";
                                    openLink(email_url);
                                }}

                                style={{justifyContent:"center",
                                            alignItems:"center",
                                            flexDirection:"row",
                                            padding:5,}}
                            >
                                <Image
                                    source={require("../assets/icons/gmail.png")}
                                    style={{
                                      height:20,
                                      width:20,
                                      borderRadius:5
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize:16,
                                        marginLeft:5,
                                        color:"#000000"
                                    }}
                                >Email</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                        
                    </View>
                </View>
            </Modal>
            {/***end */}

            
        </View>
    )
}

const styles = StyleSheet.create({
    bar:{
        height:50,
        width:"100%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"#ffffff"
    },
    inner_bar:{
        alignItems:"center",
        display:"flex",
        flexDirection:"row"
    },
    touchable:{
        width:35,
        height:35,
        borderRadius:20,
        backgroundColor:"whitesmoke",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    icon:{
        height:30,
        width:30,
    },
    menuItems:{
        width:"98%",
        margin:"1%",
        height:40,
        borderRadius:5,
        backgroundColor:"orange",
        flexDirection:"row",
        alignItems:"center"
    },
    menuImages:{
        marginLeft:5,
        height:20,
        width:20,
        tintColor:"#ffffff"
    },
    menuText:{
        color:"#ffffff",
        fontSize:17,
        marginLeft:10,
    }
})

export default HeaderComponent;