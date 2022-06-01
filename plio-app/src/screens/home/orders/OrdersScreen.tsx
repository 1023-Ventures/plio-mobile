import React, { useEffect, useState } from 'react';
import { ScrollView, View, RefreshControl, Text } from 'react-native';
import { ServiceRequestRedux } from '@1023-ventures/plio-api';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { NavigationProp } from '@react-navigation/native';
import { homeRoutes } from '../homeRoutes';
import { ServiceCard } from '../marketPlace/ServiceCard';
import { WorkOrderCard } from './WorkOrderCard';
import { ServiceRequestDialog } from './serviceRequest/ServiceRequestDialog';
import { Button } from 'react-native-paper';

type Props = {
    navigation: NavigationProp<homeRoutes, 'Orders'>;
};

export function OrdersScreen(props: Props) {
    const [dlgShown, setDlgShown] = useState(false);
    const dispatch = useTypedDispatch();
    const { servicerequests, loadingServiceRequest } = useTypedSelector((state) => state.serviceRequests);

    function refresh() {
        dispatch(ServiceRequestRedux.loadServiceRequests());
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <>
            <View style={{ flex: 1 }}>
                <ScrollView refreshControl={<RefreshControl refreshing={loadingServiceRequest} onRefresh={refresh} />}>
                    <Button mode="contained" onPress={() => setDlgShown(true)}>
                        Schedule Service
                    </Button>
                    <ServiceRequestDialog visible={dlgShown} closeDialog={() => setDlgShown(false)} />
                    <Text>Orders</Text>
                    {servicerequests.map((serviceReq) => {
                        return <WorkOrderCard serviceRequest={serviceReq} key={serviceReq.id} />;
                    })}
                </ScrollView>
            </View>
        </>
    );
}
