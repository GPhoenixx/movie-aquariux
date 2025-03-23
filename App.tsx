import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MovieDetailScreen } from '@screens/detail/movie-detail.screen';
import { HomeTab } from '@screens/tab';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeTab} />
                <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
