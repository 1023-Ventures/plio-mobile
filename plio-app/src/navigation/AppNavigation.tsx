import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import { Text, View, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { AboutScreen } from '../screens/about/AboutScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MessagesScreen } from '../screens/home/messages/MessagesScreen';
import { AppRoutes } from './appRoutes';
import { Platform, StyleSheet } from 'react-native';
import { useTypedSelector } from '../store';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { SignUpScreen } from '../screens/signUp/SignUpScreen';
import { PreferencesScreen } from '../screens/preferences/PreferencesScreen';

const Drawer = createDrawerNavigator<AppRoutes>();

export function AppNavigation() {
    const { title } = useTypedSelector((state) => state.homeTab);

    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={CustomDrawerContent}
            screenOptions={{
                headerTitleStyle: { marginLeft: -16 },
                headerLeftContainerStyle: { paddingLeft: 8 },
                headerShadowVisible: false,
                // title: 'Test',
                // drawerLabel: 'test',
                // drawerContentStyle: {
                //     backgroundColor: 'red'
                // },
                // drawerContentContainerStyle: {
                //     borderWidth: 3,
                //     marginTop: -40,
                //     paddingTop: 40,
                //     borderColor: 'red'
                // },
                headerStyle: {
                    elevation: 0
                }
            }}
        >
            <Drawer.Screen name="Home" options={{ title: `Acme Boats` }} component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Preferences" component={PreferencesScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
            {/* // hidden...  set height to 0 */}
            <Drawer.Screen name="SignUp" options={{ title: 'Sign Up', drawerItemStyle: { height: 60 } }} component={SignUpScreen} />
        </Drawer.Navigator>
    );
}

export const styles = StyleSheet.create({
    drawerHeader: {
        // margin: 16,
        padding: 16,
        // paddingTop: 24,
        // marginTop: 36,
        // marginBottom: -40
        // backgroundColor: 'silver',
        // borderBottomColor: 'gray',
        // borderBottomWidth: 1,
        // alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? 60 : 42
        // height: 40
        // padding: 12
    },
    drawerContent: {
        // backgroundColor: 'yellow',
        paddingTop: 0,
        marginTop: 0
    },
    drawerFooter: {
        marginBottom: 30
    },
    appTitle: {
        paddingLeft: 16,
        // padding: 30,
        // height: 80,
        // marginTop: 40,
        margin: 'auto',
        textAlign: 'center',
        // backgroundColor: 'yellow',
        textAlignVertical: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        flex: 1
    }
});

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { signOut } = useAuth();
    // const { colors } = useTheme();

    return (
        <>
            <View style={styles.drawerHeader}>
                <Image source={require('../../assets/boat-icon-png-10.png')} width={32} height={32} style={{ width: 52, height: 52 }} />
                <Text style={styles.appTitle}>Acme Boats</Text>
            </View>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
                <Divider />
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.drawerFooter}>
                <Divider />
                <DrawerItem
                    label="Sign Out"
                    onPress={() => {
                        // alert('Link to help');
                        signOut();
                    }}
                />
            </View>
        </>
    );
}
