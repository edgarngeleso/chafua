import React,{useState} from "react";
import {Text,
        View,
        ScrollView,
        TouchableOpacity,
        Modal,
        SafeAreaView,
        Image} from "react-native";
import { useSelector } from "react-redux";
import AddressesComponent from "../components/AddressesComponent";
import HeaderComponent from "../components/HeaderComponent";
import OrdersComponent from "../components/OrdersComponent";
import SigninSignupScreen from "./SigninSignupScreen";
import EditProfileComponent from "../components/EditProfileComponent";
const ProfileScreen = ({navigation})=>{
    const [addressesOpen,setAddressesShown] = useState(true);
    const [editProfileModalOpen,setEditProfileModalOpen] = useState(false);
    
    const [editProfileCredentials,setEditProfileCredentials] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phoneNumber:""
    });
    const loginInfo = useSelector((state)=>state.Reducer.loginInfo);

    return (
        <SafeAreaView
            style={{
                width:"100%",
            }}
        >
            
            {loginInfo.loggedIn?
            <ScrollView
                contentContainerStyle={{
                    width:"100%"
                }}
            >
                <HeaderComponent navigation={navigation}>
                    <Text style={{fontSize:25,
                                    fontWeight:"bold",
                                    marginLeft:2}}>
                            Profile
                    </Text>
                </HeaderComponent>
                <View
                    style={{
                        width:"98%",
                        margin:"1%",
                        flexDirection:"column",
                        marginTop:10,
                        marginBottom:10
                    }}>
                    <Text
                    style={{
                        color:"#000000"
                    }}
                    >Name:{loginInfo.data.customerData.firstName} {loginInfo.data.customerData.lastName}</Text>
                    <Text
                    style={{
                        color:"#000000"
                    }}
                    >Email:{loginInfo.data.customerData.email}</Text>
                    <Text
                    style={{
                        color:"#000000"
                    }}
                    >Phone:{loginInfo.data.customerData.phoneNumber}</Text>
                   
                    <Modal
                        visible={editProfileModalOpen}
                        onRequest
                    >
                        <View
                            style={{
                                    width:"100%"
                                }}>
                            <TouchableOpacity
                                onPress={()=>setEditProfileModalOpen(false)}
                                >
                                <Image
                                    source={require("../assets/icons/go.png")}
                                    style={{
                                            marginTop:10,
                                            marginLeft:5,
                                            height:20,
                                            width:20,
                                            tintColor:"orange"
                                        }}
                                    />
                            </TouchableOpacity>
                            <EditProfileComponent
                                firstName={loginInfo.data.customerData.firstName}
                                lastName={loginInfo.data.customerData.lastName}
                                email={loginInfo.data.customerData.email}
                                phoneNumber={loginInfo.data.customerData.phoneNumber}
                                customerID={loginInfo.data.customerData.customerID}
                            />
                        </View>
                            
                    </Modal>

                    <View
                        style={{
                            width:"100%",
                            margin:"1%",
                            flexDirection:"row",
                            marginBottom:10,
                            justifyContent:"space-between"
                        }}
                    >

                        <View></View>
                        <TouchableOpacity
                            onPress={()=>setEditProfileModalOpen(true)}
                            style={{
                                width:"40%",
                                height:40,
                                padding:5,
                                borderRadius:5,
                                backgroundColor:"orange",
                                alignItems:"center",
                                justifyContent:"center",
                            }}
                        >
                            <Text
                                style={{
                                    color:"#ffffff",
                                }}
                            >
                                Edit profile
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View
                    style={{
                        width:"98%",
                        height:40,
                        flexDirection:"row",
                        marginTop:10,
                        marginBottom:10,
                        margin:"1%"
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>{
                            setAddressesShown(true);
                        }}
                        style={{
                            height:40,
                            padding:5,
                            borderRadius:5,
                            backgroundColor:addressesOpen?"orange":"whitesmoke",
                            alignItems:"center",
                            justifyContent:"center",

                        }}
                    >
                        <Text
                            style={{
                                color:addressesOpen?"#ffffff":"#000000",
                            }}
                        >
                            Addresses
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{
                            setAddressesShown(false);
                        }}
                        style={{
                            height:40,
                            padding:5,
                            borderRadius:5,
                            backgroundColor:addressesOpen?"whitesmoke":"orange",
                            alignItems:"center",
                            justifyContent:"center",
                            marginLeft:10
                        }}
                    >
                        <Text
                            style={{
                                color:addressesOpen?"#000000":"#ffffff",
                            }}
                        >
                            Orders
                        </Text>
                    </TouchableOpacity>
                </View>
                {addressesOpen?
                <AddressesComponent/>:
                <OrdersComponent/>
                }
            </ScrollView>:
            <SigninSignupScreen navigation={navigation} />
            }

        </SafeAreaView>
    )
}

export default ProfileScreen;