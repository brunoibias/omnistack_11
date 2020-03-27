import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Details from './pages/Details';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ header: false }}>
                <AppStack.Screen name="Incidents" components={Incidents} />
                <AppStack.Screen name="Details" components={Details} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}