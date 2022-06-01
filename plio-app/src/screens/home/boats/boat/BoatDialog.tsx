import React, { useEffect } from 'react';
import { ScrollView, View, Modal } from 'react-native';
import { Asset, AssetRedux } from '@1023-ventures/plio-api';
import { useTypedDispatch, useTypedSelector } from '../../../../store';
import { Headline } from 'react-native-paper';
import { Formik } from 'formik';
import GestureDetector from 'react-native-swipe-detect';
import { BoatPropertiesFormlet } from './BoatPropertiesFormlet';
import { DialogButtons, FlexView } from '@1023-ventures/serra-common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
    // navigation: NavigationProp<HomeTabRoutes, 'Assets'>;
    closeDialog: () => void;
    visible: boolean;
};

export function BoatDialog(props: Props) {
    const dispatch = useTypedDispatch();
    const { activeAsset, loadingAsset } = useTypedSelector((state) => state.assets);

    useEffect(() => {
        // dispatch(BoatRedux.Actions.setActiveBoat({}));
        // dispatch(BoatRedux.loadBoats());
    }, []);

    return (
        <Modal visible={props.visible} onRequestClose={() => props.closeDialog()} animationType="slide">
            <View style={{ flex: 1, marginBottom: 32, marginTop: 48, marginLeft: 24, marginRight: 24 }}>
                <Formik
                    enableReinitialize
                    initialValues={activeAsset || {}}
                    onSubmit={async (values, helpers) => {
                        const boat = { ...activeAsset, ...values } as Asset;
                        if (boat.id) {
                            dispatch(AssetRedux.Actions.setActiveAsset(boat));
                            dispatch(AssetRedux.updateAsset({ asset: boat, reload: true }));
                        } else {
                            dispatch(AssetRedux.insertAsset(boat));
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, submitForm, values }) => (
                        <FlexView>
                            <FlexView>
                                <GestureDetector
                                    onSwipeRight={() => {
                                        console.log('swipe right');
                                    }}
                                    style={{ flex: 1 }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                        <TouchableOpacity
                                            style={{
                                                borderWidth: 1,
                                                borderColor: 'rgba(0,0,0,0.2)',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 32,
                                                height: 32,
                                                backgroundColor: '#fff',
                                                borderRadius: 50,
                                                marginRight: 8
                                            }}
                                            onPress={() => props.closeDialog()}
                                        >
                                            <MaterialCommunityIcons name="arrow-left" size={16} />
                                            {/* <Icon name={"chevron-right"}  size={30} color="#01a699" /> */}
                                        </TouchableOpacity>
                                        <Headline style={{ color: '#093D6B', fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>
                                            Update your boat...
                                        </Headline>
                                    </View>
                                    <ScrollView keyboardShouldPersistTaps="handled">
                                        <BoatPropertiesFormlet onDone={() => {}} />
                                    </ScrollView>
                                </GestureDetector>
                            </FlexView>
                            <DialogButtons okLabel="Save" closeDialog={props.closeDialog} />
                        </FlexView>
                    )}
                </Formik>
            </View>
        </Modal>
    );
}
