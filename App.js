import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonCartes from './components/PokemonCartes';
import PokemonHeader from './components/PokemonHeader';
import PokemonHome from './components/PokemonHome';
const Stack = createStackNavigator();
export default function App() {
  return (
  <>
  
    <PokemonHeader/>
    <NavigationContainer >
    <Stack.Navigator initialRouteName="PokemonHome">
      <Stack.Screen name="PokemonHome" component={PokemonHome}  options={{ headerShown: false }}/>
      <Stack.Screen name="PokemonList" component={PokemonCartes} />
    </Stack.Navigator>
  </NavigationContainer>
  </>
  );
}

