import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { ServiceRequestRedux } from '@1023-ventures/plio-api';
import { useTypedDispatch, useTypedSelector } from '../../../../store';
import { NavigationProp } from '@react-navigation/native';
import { homeRoutes } from '../../homeRoutes';
import { DialogController, useDialogController } from '../../marketPlace/ServiceCard';
import { Headline } from 'react-native-paper';

type Props = {
    controller: DialogController;
};

export function ServiceRequestsDialog(props: Props) {
    const dispatch = useTypedDispatch();
    const serviceRequestsState = useTypedSelector((state) => state.serviceRequests);
    const dialogState = props.controller;

    function refresh() {
        dispatch(ServiceRequestRedux.loadServiceRequests());
    }

    useEffect(() => {
        refresh();
    }, []);

    // const eventList = servicerequests
    //     .filter((r) => r.event)
    //     .map((r) => {
    //         const dt = new Date(r.event?.startsOn!);
    //         return { id: r.id, eventOn: dt, label: 'Service Request' } as AgendaCalendarEvent;
    //     });

    return (
        <Modal visible={dialogState.dialogOpen} onRequestClose={() => dialogState.setDialogOpen(false)} animationType="slide">
            <View style={{ flex: 1 }}>
                <Headline>Service Requests...</Headline>
                {serviceRequestsState.servicerequests.map((dt) => {
                    return <Text>Service Request</Text>;
                })}
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});
