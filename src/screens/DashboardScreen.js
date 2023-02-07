import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardTabs from "../navigation/DashboardTabs";

const Stack = createNativeStackNavigator();

const DashboardScreen = ({navigation})=>{
    const isLoggedIn = false;
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="dashboard"
                component={DashboardTabs}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    )
}

export default DashboardScreen;