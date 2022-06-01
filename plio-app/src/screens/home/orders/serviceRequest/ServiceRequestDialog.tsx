import React, { useEffect, useState } from 'react';
import { Text, View, Modal, ScrollView } from 'react-native';
import { ServiceRequestAsset, ServiceRequestRedux } from '@1023-ventures/plio-api';
import { useTypedDispatch, useTypedSelector } from '../../../../store';
import { Headline } from 'react-native-paper';
import { Formik } from 'formik';
import { ServiceRequestNote } from './ServiceRequestNote';
import { ServiceRequest } from '@1023-ventures/plio-api/plio/models/ServiceRequest';
import { ISelectableItem, AssetChipSelect } from './AssetChipSelect';
import { DialogButtons, FlexView } from '@1023-ventures/serra-common';
import { ServiceRequestDateInput } from './ServiceRequestDateInput';

type Props = {
    // navigation: NavigationProp<HomeTabRoutes, 'Assets'>;
    closeDialog: () => void;
    visible: boolean;
};

export function ServiceRequestDialog(props: Props) {
    const dispatch = useTypedDispatch();
    const { activeServiceRequest } = useTypedSelector((state) => state.serviceRequests);
    const { assets } = useTypedSelector((state) => state.assets);
    const [newServiceRequest, setNewServiceRequest] = useState<ServiceRequest>({});
    const [selectableAssets, setSelectableAssets] = useState<ISelectableItem[]>([]);
    const formData = newServiceRequest;

    function onSubmit(serviceRequest: ServiceRequest) {
        serviceRequest.serviceRequestAssets = selectableAssets.filter((a) => a.selected).map((a) => a as ServiceRequestAsset);
        serviceRequest.event = { startsOn: serviceRequest.requestedDate, name: 'Service requested' };
        dispatch(ServiceRequestRedux.insertServiceRequest(serviceRequest));
        props.closeDialog();
    }

    useEffect(() => {
        setNewServiceRequest({});
        setSelectableAssets(
            assets.map((asset) => {
                return { assetId: asset.id, name: asset.name, selected: false } as ISelectableItem;
            })
        );
    }, [props.visible]);

    return (
        <Modal visible={props.visible} onRequestClose={() => props.closeDialog()} animationType="slide">
            <View style={{ flex: 1, marginBottom: 32, marginTop: 48, marginLeft: 24, marginRight: 24 }}>
                <Formik
                    enableReinitialize
                    initialValues={formData || {}}
                    onSubmit={async (values, helpers) => {
                        onSubmit(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, submitForm, values }) => (
                        <FlexView>
                            <Headline>Schedule Service...</Headline>
                            <ScrollView>
                                <FlexView style={{ marginBottom: 16 }}>
                                    <AssetChipSelect
                                        list={selectableAssets}
                                        onSelectChanged={(list) => {
                                            setSelectableAssets(list ?? []);
                                        }}
                                    />
                                    <Text></Text>
                                    <ServiceRequestDateInput />
                                    <ServiceRequestNote />
                                </FlexView>
                            </ScrollView>

                            <DialogButtons okLabel="Submit Request" closeDialog={props.closeDialog} />
                        </FlexView>
                    )}
                </Formik>
            </View>
        </Modal>
    );
}
