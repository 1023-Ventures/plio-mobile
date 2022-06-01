import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View, RefreshControl, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AssetRedux } from '@1023-ventures/plio-api';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { Button, FAB } from 'react-native-paper';
import { BoatCard } from '../boats/BoatCard';
import { NavigationProp } from '@react-navigation/native';
import { BoatDialog } from '../boats/boat/BoatDialog';
import { AddAssetRedux } from '../../../store/AddAssetRedux';
import { homeRoutes } from '../homeRoutes';
import { Event } from '@1023-ventures/plio-api/plio/models/Event';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import testIDs from './testids';

type Props = {
    navigation: NavigationProp<homeRoutes, 'Home'>;
};

export function CalendarScreend(props: Props) {
    const dispatch = useTypedDispatch();
    const { assets, loadingAsset } = useTypedSelector((state) => state.assets);
    const { dialogVisible: boatDialogVisible } = useTypedSelector((state) => state.addAsset);
    const [calItems, setCalItems] = useState<any>({});
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const events = [{} as Event, {}, {}];

    function refresh() {
        // dispatch(AssetRedux.loadAssets());
    }

    // console.log(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        refresh();
    }, []);

    const loadItems = (day: DateData) => {
        const items = {} as any;

        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            day: strTime
                        });
                    }
                }
            }

            const newItems: AgendaSchedule = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setCalItems(newItems);
        }, 1000);
    };

    const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        return (
            <TouchableOpacity
                testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: reservation.height }]}
                onPress={() => Alert.alert(reservation.name)}
            >
                <Text style={{ fontSize, color }}>{reservation.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    };

    const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
    };

    function timeToString(time: number) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <ScrollView refreshControl={<RefreshControl refreshing={loadingAsset} onRefresh={refresh} />}> */}
            <Button
                onPress={() => {
                    setSelectedDate('2022-05-01');
                }}
            >
                test
            </Button>
            <Agenda
                // testID={testIDs.agenda.CONTAINER}
                items={calItems}
                loadItemsForMonth={loadItems}
                selected={selectedDate}
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
                rowHasChanged={rowHasChanged}
                showClosingKnob={true}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#43515c'},
                //    '2017-05-09': {textColor: '#43515c'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                // hideExtraDays={false}
                // showOnlySelectedDayItems
            />
            {/* {events.map((appt) => {
                return (
                    <View>
                        <Text>Appointment</Text>
                    </View>
                );
            })} */}
            {/* </ScrollView> */}
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
