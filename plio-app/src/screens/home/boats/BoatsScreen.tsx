import React, { useEffect } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { AssetRedux } from '@1023-ventures/plio-api';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { Button, FAB, TextInput } from 'react-native-paper';
import { styles } from '../../styles';
import { NavigationProp } from '@react-navigation/native';
import { BoatDialog } from './boat/BoatDialog';
import { AddAssetRedux } from '../../../store/AddAssetRedux';
import { homeRoutes } from '../homeRoutes';
import { useAuth } from '../../../contexts/AuthContext';
import { BoatCard } from './BoatCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
    navigation: NavigationProp<homeRoutes, 'Boats'>;
};

export function BoatsScreen(props: Props) {
    const { signOut } = useAuth();
    const dispatch = useTypedDispatch();
    const { assets, loadingAsset, error } = useTypedSelector((state) => state.assets);
    const { dialogVisible: boatDialogVisible } = useTypedSelector((state) => state.addAsset);

    function refresh() {
        console.log('loading assets');
        dispatch(AssetRedux.loadAssets());
    }

    useEffect(() => {
        // if (error != undefined) {
        //     signOut();
        // } else {
        refresh();
        // }
    }, []);

    return (
        <View style={{ flex: 1, paddingLeft: 24, paddingRight: 24, backgroundColor: 'white' }}>
            <BoatDialog visible={boatDialogVisible} closeDialog={() => dispatch(AddAssetRedux.Actions.setDialogVisibile(false))} />

            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                onPress={() => {
                    dispatch(AssetRedux.Actions.setActiveAsset({}));
                    dispatch(AddAssetRedux.Actions.setDialogVisibile(true));
                }}
            />

            <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                <TextInput
                    label="Search"
                    onChangeText={() => {}}
                    autoComplete={false}
                    // placeholder="Search"
                    // placeholderTextColor={'red'}
                    outlineColor="transparent"
                    dense={true}
                    style={{
                        flex: 1,
                        color: 'orange',
                        borderColor: 'orange',
                        marginBottom: 8
                        // height: 40
                    }}
                    theme={{
                        colors: {
                            // placeholder: 'transparent',

                            background: 'whitesmoke'
                            // text: 'blue'
                            // primary: 'transparent'
                        },
                        roundness: 10
                    }}
                    mode="outlined"
                    left={<TextInput.Icon name={() => <MaterialCommunityIcons name="magnify" size={24} />} />}
                />
                {/* <Button mode="outlined" style={{ height: 40, marginTop: 8, marginLeft: 16, width: 24, alignContent: 'center' }}>
                    <MaterialCommunityIcons name="plus" size={16} />
                </Button> */}
            </View>
            <ScrollView
                refreshControl={<RefreshControl refreshing={loadingAsset} onRefresh={refresh} />}
                style={{ marginTop: 0, paddingTop: 0 }}
            >
                {assets.map((asset) => {
                    return <BoatCard boat={asset} key={asset.id} />;
                })}
            </ScrollView>
        </View>
    );
}
