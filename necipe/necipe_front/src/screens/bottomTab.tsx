import React from "react";
import st from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import { Home } from "./home/home";
import Icons from "react-native-vector-icons/Entypo";
import SearchIcons from "react-native-vector-icons/Ionicons";
import PlusIcons from "react-native-vector-icons/Feather";
import UserIcons from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "~/Utils/color/color";
import { CreateMain } from "./createRecipe/createMain";
import { CreateSub } from "./createRecipe/createSub";
import { Alert, TouchableOpacity } from "react-native";
import { Recipe } from "./recipe";
import { User } from "./user";
import { CommonActions } from "@react-navigation/native";
import { AlertView } from "./alert";
import { Profile } from "./Profile";
import { Explore } from "./explore";

const IconCircleOuter = st.View``;

const Tab = createBottomTabNavigator();

interface Props{
  navigation: StackNavigationProp<StackNavigationTypes, "Tab">;
};

const RootStack = createStackNavigator();

// 스택 초기화해서 메인화면으로 이동하기
const tabBarMeThod = (navigation : any) => {
  // navigation.reset({
  //   routes: [{ name: "Home" }]
  // });

  navigation.dispatch(CommonActions.navigate("Home"))
}


// create stack 으로 나눈다.
const CreateStack = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="CreateMain" component={CreateMain} />
      <RootStack.Screen name="CreateSub" component={CreateSub} />
    </RootStack.Navigator>
  );
};

// home stack 
const HomeStack = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Main" component={Home} />
      <RootStack.Screen name="Recipe" component={Recipe} />
      <RootStack.Screen name="User" component={User}/>
      <RootStack.Screen name="Alert" component={AlertView}/>
    </RootStack.Navigator>
  )
}

export const Bottom = ({ navigation }: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 70,
          borderRadius: 30,
          margin: 5,
          borderColor: `${COLOR.BOTTOMTAB_OUTER_COLOR}`,
          elevation : 2,
        }
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconCircleOuter
              style={{
                padding: 5,
                borderRadius: 30,
                backgroundColor: focused ? `${COLOR.BOTTOMTAB_FOCUSED_COLOR}` : `${COLOR.BOTTOMTAB_NOT_FOCUSED_COLOR}`
              }}>
              <Icons name="home" size={30} color="black" />
            </IconCircleOuter>
          ),
        }}/>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconCircleOuter
              style={{
                padding: 5,
                borderRadius: 30,
                backgroundColor: focused ? `${COLOR.BOTTOMTAB_FOCUSED_COLOR}` : `${COLOR.BOTTOMTAB_NOT_FOCUSED_COLOR}`
              }}>
              <SearchIcons name="search" size={30} color="black" />
            </IconCircleOuter>
          )
        }} />
      <Tab.Screen
        name="Create"
        component={CreateStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconCircleOuter
              style={{
                padding: 5,
                borderRadius: 30,
                backgroundColor: focused ? `${COLOR.BOTTOMTAB_FOCUSED_COLOR}` : `${COLOR.BOTTOMTAB_NOT_FOCUSED_COLOR}`
              }}>
              <PlusIcons name="plus" size={30} color="black" />
            </IconCircleOuter>
          )
        }} />
      <Tab.Screen
        name="User"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconCircleOuter
              style={{
                padding: 5,
                borderRadius: 30,
                backgroundColor: focused ? `${COLOR.BOTTOMTAB_FOCUSED_COLOR}` : `${COLOR.BOTTOMTAB_NOT_FOCUSED_COLOR}`
              }}>
              <UserIcons name="user" size={30} color="black" />
            </IconCircleOuter>
          )
        }}/>
      </Tab.Navigator>
  )
}