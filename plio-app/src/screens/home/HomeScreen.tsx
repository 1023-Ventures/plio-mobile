import { useTypedDispatch } from '../../store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationProp } from '@react-navigation/native';
import { HomeTabRedux } from '../../store/HomeTabRedux';
import { MessagesScreen } from './messages/MessagesScreen';
import { homeRoutes } from './homeRoutes';
import { MarketplaceScreen } from './marketPlace/MarketplaceScreen';
import { CalendarScreen } from './calendar/CalendarScreen';
import { OrdersScreen } from './orders/OrdersScreen';
import { BoatsScreen } from './boats/BoatsScreen';

const Tab = createBottomTabNavigator<homeRoutes>();

type Props = {
    navigation: NavigationProp<homeRoutes>;
};

export function HomeScreen(props: Props) {
    const dispatch = useTypedDispatch();

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    headerShadowVisible: false,
                    headerStyle: {
                        elevation: 0
                    }
                }}
            >
                <Tab.Screen
                    name="Boats"
                    component={BoatsScreen}
                    options={{
                        title: 'My Boats',
                        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-outline" color={color} size={size + 4} />
                    }}
                    listeners={{
                        tabPress: (e) => {
                            dispatch(HomeTabRedux.Actions.setCurrentTab('My Boats'));
                            dispatch(HomeTabRedux.Actions.setCurrentTabTitle('My Boats'));
                        }
                    }}
                />
                {/* <Tab.Screen
                    name="Orders"
                    component={OrdersScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="text-box-multiple-outline" color={color} size={size} />
                        )
                    }}
                /> */}
                <Tab.Screen
                    name="Messages"
                    component={MessagesScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="message-text-outline" color={color} size={size} />
                    }}
                />
                {/* <Tab.Screen
                    name="Marketplace"
                    component={MarketplaceScreen}
                    options={{
                        title: 'Marketplace',
                        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="store-outline" color={color} size={size} />
                    }}
                    listeners={{
                        tabPress: (e) => {
                            dispatch(HomeTabRedux.Actions.setCurrentTab('Purchase'));
                            dispatch(HomeTabRedux.Actions.setCurrentTabTitle('Purchase'));
                        }
                    }}
                />
                <Tab.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="calendar-month" color={color} size={size} />
                    }}
                    listeners={{
                        tabPress: (e) => {
                            dispatch(HomeTabRedux.Actions.setCurrentTab('Calendar'));
                            dispatch(HomeTabRedux.Actions.setCurrentTabTitle('Calendar'));
                        }
                    }}
                /> */}
                {/* <Tab.Screen
                name="Add"
                component={AddScreen}
                options={{
                    title: 'Add',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="plus" color={color} size={size} />
                }}
                listeners={{
                    tabPress: (e) => {
                        console.log(currentTab);
                        if (currentTab != 'Add') {
                            e.preventDefault();
                            dispatch(BoatRedux.Actions.setActiveBoat({}));
                            dispatch(AddAssetRedux.Actions.setDialogVisibile(true));
                        }
                    }
                }}
            /> */}
                {/* <Tab.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                    options={{
                        tabBarShowLabel: false,
                        title: 'Notifications',
                        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="bell" color={color} size={size} />
                    }}
                    listeners={{
                        tabPress: (e) => {
                            dispatch(HomeTabRedux.Actions.setCurrentTab('Shop'));
                        }
                    }}
                /> */}
            </Tab.Navigator>
        </>
    );
}
