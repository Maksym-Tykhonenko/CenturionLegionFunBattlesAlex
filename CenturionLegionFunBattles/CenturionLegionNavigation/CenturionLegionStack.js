import { createStackNavigator } from '@react-navigation/stack';
import CenturionLegionHome from '../CenturionLegionScreens/CenturionLegionHome';
import CenturionLegionOnboard from '../CenturionLegionScreens/CenturionLegionOnboard';
import CenturionLegionRules from '../CenturionLegionScreens/CenturionLegionRules';
import CenturionLegionAbout from '../CenturionLegionScreens/CenturionLegionAbout';
import CenturionLegionGame from '../CenturionLegionScreens/CenturionLegionGame';

const Stack = createStackNavigator();

const CenturionLegionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CenturionLegionOnboard"
        component={CenturionLegionOnboard}
      />
      <Stack.Screen
        name="CenturionLegionHome"
        component={CenturionLegionHome}
      />
      <Stack.Screen
        name="CenturionLegionRules"
        component={CenturionLegionRules}
      />
      <Stack.Screen
        name="CenturionLegionAbout"
        component={CenturionLegionAbout}
      />
      <Stack.Screen
        name="CenturionLegionGame"
        component={CenturionLegionGame}
      />
    </Stack.Navigator>
  );
};

export default CenturionLegionStack;
