import { FlexView } from '@1023-ventures/serra-common';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { dateToLocal, getBegOfMonth, getEndOfMonth } from './dateUtils';

export type AgendaCalendarEvent = {
    id: string;
    eventOn: Date;
    label: string;
};

type Props = {
    eventList: Array<AgendaCalendarEvent>;
    refresh?: () => void;
};

function getDates(beginDate: Date, endDate: Date) {
    const dates: Array<Date> = [];
    for (var d = new Date(beginDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
    }
    return dates;
}

export function AgendaCalendar(props: Props) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [beginDate, setBeginDate] = useState<Date>(getBegOfMonth());
    const endDate = new Date(getEndOfMonth(beginDate));

    function refresh() {
        props.refresh && props.refresh();
    }

    return (
        <FlexView style={{}}>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    onPress={() => {
                        const dt = new Date();
                        setSelectedDate(dt);
                        setBeginDate(getBegOfMonth(dt));
                    }}
                >
                    Today
                </Button>
                <Button
                    onPress={() => {
                        const dt = new Date(selectedDate);
                        dt.setMonth(dt.getMonth() - 1);
                        setSelectedDate(dt);
                        setBeginDate(getBegOfMonth(dt));
                    }}
                >
                    Prev
                </Button>
                <Text>{dateToLocal(selectedDate)}</Text>
                <Button
                    onPress={() => {
                        const dt = new Date(selectedDate);
                        dt.setMonth(dt.getMonth() + 1);
                        setSelectedDate(dt);
                        setBeginDate(getBegOfMonth(dt));
                    }}
                >
                    Next
                </Button>
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}>
                {getDates(beginDate, endDate).map((dt) => {
                    return (
                        <React.Fragment key={dt.valueOf()}>
                            <Text>{dt.toLocaleDateString()}</Text>
                            {props.eventList
                                .filter((e) => {
                                    try {
                                        return e.eventOn.toLocaleDateString() == dt.toLocaleDateString();
                                    } catch {
                                        console.log('ERROR', e.eventOn, dt);
                                        return false;
                                    }
                                })
                                .map((ev) => {
                                    return (
                                        <Text key={ev.id} style={{ paddingLeft: 24 }}>
                                            {ev.label}
                                        </Text>
                                    );
                                })}
                        </React.Fragment>
                    );
                })}
            </ScrollView>
        </FlexView>
    );
}
