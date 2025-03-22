import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './home.screen';
import { WatchListScreen } from './watchlist.screen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
    routeName: string;
    focused: boolean;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ routeName }) => {
    let source = require('../../assets/home.png');

    if (routeName === 'Home') {
        source = require('../../assets/home.png');
    } else if (routeName === 'Watchlist') {
        source = require('../../assets/watchlist.png');
    }

    return <Image source={source} />;
};

const Tabs: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#0a2740',
                        height: 60,
                    },
                    tabBarIcon: ({ focused }) => <TabBarIcon routeName={route.name} focused={focused} />,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Watchlist" component={WatchListScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Tabs;
