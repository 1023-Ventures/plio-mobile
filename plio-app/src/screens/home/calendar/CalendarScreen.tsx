import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ServiceRequestRedux } from '@1023-ventures/plio-api';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { NavigationProp } from '@react-navigation/native';
import { homeRoutes } from '../homeRoutes';
import { Event } from '@1023-ventures/plio-api/plio/models/Event';
import { AgendaCalendar, AgendaCalendarEvent } from './AgendaCalendar';

type Props = {
    navigation: NavigationProp<homeRoutes, 'Home'>;
};

export function CalendarScreen(props: Props) {
    const dispatch = useTypedDispatch();
    const { assets, loadingAsset } = useTypedSelector((state) => state.assets);
    const { servicerequests, loadingServiceRequest } = useTypedSelector((state) => state.serviceRequests);
    const { dialogVisible: boatDialogVisible } = useTypedSelector((state) => state.addAsset);
    const [calItems, setCalItems] = useState<any>({});
    const events = [{} as Event, {}, {}];

    function refresh() {
        // dispatch(AssetRedux.loadAssets());
    }

    useEffect(() => {
        refresh();
        dispatch(ServiceRequestRedux.loadServiceRequests());
    }, []);

    const eventList = servicerequests
        .filter((r) => r.event)
        .map((r) => {
            const dt = new Date(r.event?.startsOn!);
            return { id: r.id, eventOn: dt, label: 'Service Request' } as AgendaCalendarEvent;
        });

    return (
        <View style={{ flex: 1 }}>
            <AgendaCalendar
                eventList={
                    eventList || [
                        { eventOn: new Date('2022-04-10'), label: 'Summerization' },
                        { eventOn: new Date('2022-04-11'), label: 'Wax and touch up' },
                        { eventOn: new Date('2022-04-26'), label: 'Engine tune-up' }
                    ]
                }
                refresh={() => {
                    console.log('refresh');
                }}
            />
        </View>
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
