import {NavigationContainer} from "@react-navigation/native";
import PokemonListStack from './Navigation/Navigation';

export default function App() {
  return (
      <NavigationContainer>
        <PokemonListStack />
      </NavigationContainer>
  );
}