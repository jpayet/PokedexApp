import {NavigationContainer} from "@react-navigation/native";
import TabsNavigation from './navigation/Navigation';

export default function App() {
  return (
      <NavigationContainer>
        <TabsNavigation />
      </NavigationContainer>
  );
}