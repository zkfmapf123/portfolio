import AsyncStorage from "@react-native-community/async-storage";
import { createDrawerNavigator} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import MainLoading from "./Components/LoadingView/MainLoading";
import Community from "./Screens/Community/Community";
import DrawerContent from "./Screens/Drawer/DrawerContent";
import RealDrawerContent from "./Screens/Drawer/RealDrawerContent";
import History from "./Screens/History/History";
import Home from "./Screens/Home/Home";
import Profile from "./Screens/Profile/Profile";
import Join from "./Screens/Session/Join";
import Login from "./Screens/Session/Login";
import Statistic from "./Screens/Statistic/Statistic";
import TimeCheck from "./Screens/TimeCheck/TimeCheck";
import Timer from "./Screens/Timer/Timer";
import useStore from "./userStore";

const Drawer = createDrawerNavigator();

const App = () =>{
    const [user, setUser] = useState<boolean>(false);
    const [loading ,setLoading] = useState<boolean>(true);

    useEffect(()=>{
        setTimeout(async()=>{
            const userId = await AsyncStorage.getItem("userId");
            if(userId !== null) setUser(true);
            setLoading(false);
        },4000);
    },[]);

    if(loading){
        return(
            <MainLoading/>
        )
    }else if(!loading && !user){
        return(
            <NavigationContainer>
                <Drawer.Navigator drawerContent={DrawerContent}>
                    <Drawer.Screen name="Login" component={Login}/>
                    <Drawer.Screen name="Join" component={Join}/>
                    <Drawer.Screen name="Home" component={Home}/>
                    <Drawer.Screen name="Profile" component={Profile}/>
                    <Drawer.Screen name="TimeCheck" component={TimeCheck}/>
                    <Drawer.Screen name="Timer" component={Timer}/>
                    <Drawer.Screen name="History" component={History}/>
                    <Drawer.Screen name="Statistic" component={Statistic}/>
                    <Drawer.Screen name="Community" component={Community}/>
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }else{
        return(
            <NavigationContainer>
                <Drawer.Navigator drawerContent={RealDrawerContent}>
                    <Drawer.Screen name="Home" component={Home}/>
                    <Drawer.Screen name="Profile" component={Profile}/>
                    <Drawer.Screen name="TimeCheck" component={TimeCheck}/>
                    <Drawer.Screen name="Timer" component={Timer}/>
                    <Drawer.Screen name="History" component={History}/>
                    <Drawer.Screen name="Statistic" component={Statistic}/>
                    <Drawer.Screen name="Community" component={Community}/>
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
};

export default App;