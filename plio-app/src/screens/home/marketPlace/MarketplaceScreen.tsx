import React, { useEffect } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { ServiceRequestRedux } from '@1023-ventures/plio-api';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { NavigationProp } from '@react-navigation/native';
import { homeRoutes } from '../homeRoutes';
import { ServiceCard } from './ServiceCard';
import { RentABoat } from './RentABoatCard';
import { ShopAcessories } from './ShopAccessories';
import { BuyOrSellABoat } from './BuyOrSellABoat';

type Props = {
    navigation: NavigationProp<homeRoutes, 'Marketplace'>;
};

export function MarketplaceScreen(props: Props) {
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
                    <ServiceCard data={servicerequests} />
                    <RentABoat />
                    <ShopAcessories />
                    <BuyOrSellABoat />
                </ScrollView>
            </View>
        </>
    );
}
