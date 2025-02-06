import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoardingScreen from './src/screens/OnBoardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import MicrobesScreen from './src/screens/MicrobesScreen';
import MicrobeDetailsScreen from './src/screens/MicrobeDetailsScreen';
import LevelsScreen from './src/screens/LevelsScreen';
import ShopScreen from './src/screens/ShopScreen';
import DailyScreen from './src/screens/DailyScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
            <Stack.Navigator initialRouteName={"OnBoardingScreen" }>
                  <Stack.Screen 
                        name="OnBoardingScreen" 
                        component={OnBoardingScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="HomeScreen" 
                        component={HomeScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="MicrobesScreen" 
                        component={MicrobesScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="MicrobeDetailsScreen" 
                        component={MicrobeDetailsScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="LevelsScreen" 
                        component={LevelsScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="ShopScreen" 
                        component={ShopScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="DailyScreen" 
                        component={DailyScreen} 
                        options={{ headerShown: false }} 
                  />
            </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
