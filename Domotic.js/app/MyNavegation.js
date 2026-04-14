import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'


const Tab = createBottomTabNavigator();

import ScreenHome from "./screen/home/ScreenHome";
import ScreenSetting from "./screen/setting/ScreenSetting";
import ScreenReports from "./screen/reports/ScreenReports";
import Calculadora from "./screen/Calculadora/Calculadora";

export default function MyNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="menu" 
      component={ScreenHome}
      options={{
        title: 'Dashboard',
        tabBarIcon:({color,size})=>
<Ionicons name="home" size={size} color={color} />
      }} />
      <Tab.Screen 
      name="Calculadora" component={Calculadora}
      options={{
        title: 'Calculadora',
        tabBarIcon:({color,size})=>
        <Ionicons name="calculator" size={size} color={color} />
      }} />
      <Tab.Screen 
      name="Ajustes" component={ScreenSetting} 
      options={{
        tabBarIcon:({color,size})=>
<Ionicons name="settings"size={size} color={color} />
 }} />
    </Tab.Navigator>
  );
}