import React,{useEffect,useState} from 'react';
import {Text} from "react-native";
import AppScreens from './src/index';

import { NavigationContainer } from '@react-navigation/native';
import {Provider as ReduxProvider} from "react-redux";
import configureStore from "./src/redux/store";
import AppSplashScreen from './src/components/AppSplashScreen';

const store = configureStore();

const App = () => {
  const [splashScreenOpen,setSplashScreenOpen] = useState(false);
  const a = ()=>{
    /*return(
      <NavigationContainer>
        <Drawers/>
    </NavigationContainer> 
    )*/
  }

useEffect(()=>{
  setSplashScreenOpen(true);
  setTimeout(()=>{
    setSplashScreenOpen(false);
  },500);
},[])
  return (
    <ReduxProvider store={store} >
        {
        splashScreenOpen?
        <AppSplashScreen/>:
        <NavigationContainer>
          <AppScreens/>
        </NavigationContainer>
        }
    </ReduxProvider> 
  );
};
export default App;
