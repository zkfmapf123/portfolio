import React, { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationTypes } from "./Utils/types/navigation.type";
import { Login } from "./screens/login";
import { Join } from "./screens/join";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Bottom } from "./screens/bottomTab";
import { AlertView } from "./screens/alert";
import { store } from "./modules/store";
import { Provider, useDispatch }  from "react-redux";
import { CreateMain } from "./screens/createRecipe/createMain";
import { CreateSub } from "./screens/createRecipe/createSub";
import { Home } from "./screens/home/home";
import { Recipe } from "./screens/recipe";
import { User } from "./screens/user";
import { expiredInDate } from "./Utils/common/date";
import { getPrivateIdReducer } from "./modules/reducer/common.reducer";

const RootStack = createStackNavigator<StackNavigationTypes>();

// const rootReducer = combineReducers({
//   authReducer
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(255,255,255)"
  },
};

export const App = () => {
  const [isUser, setIsUser] = useState<boolean>(false);

  // expiredIn속성을 이용하여 세션 기간주기 
  useEffect(() => {

    (async () => {
      try {
        // await AsyncStorage.clear();
        const result = await AsyncStorage.getItem("userInfo")

        if (result === null) {
          setIsUser(false);
          return;
        }

        const resultToString = JSON.parse(result);

        // token 만료
        if (+resultToString > +expiredInDate()) {
          await AsyncStorage.clear();
          setIsUser(false);
        } else {
          setIsUser(true);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (!isUser) {
    return (
      // 로그인 안될 시 && 세션 만료
      <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Join" component={Join} />
          <RootStack.Screen name="Tab" component={Bottom} />
          <RootStack.Screen name="Alert" component={AlertView} />
          <RootStack.Screen name="CreateMain" component={CreateMain} />
          <RootStack.Screen name="CreateSub" component={CreateSub} />
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Recipe" component={Recipe} />
          <RootStack.Screen name="User" component={User}/>
        </RootStack.Navigator>
        </NavigationContainer>
        </Provider>
    )
  } else {
    return (
      <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen name="Tab" component={Bottom} />
          <RootStack.Screen name="Alert" component={AlertView} />
          <RootStack.Screen name="CreateMain" component={CreateMain} />
          <RootStack.Screen name="CreateSub" component={CreateSub} />
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Recipe" component={Recipe} />
          <RootStack.Screen name="User" component={User}/>
        </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}