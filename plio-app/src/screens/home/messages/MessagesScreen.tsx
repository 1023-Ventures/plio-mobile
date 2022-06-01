import { MessageRedux, TopicRedux } from '@1023-ventures/plio-api';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Button, RefreshControl, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppRoutes } from '../../../navigation/appRoutes';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { homeRoutes } from '../homeRoutes';

type Props = {
    navigation: NavigationProp<homeRoutes, 'Messages'>;
};

export function MessagesScreen(props: Props) {
    const dispatch = useTypedDispatch();
    const { messages, loadingMessage } = useTypedSelector((state) => state.messages);
    const { topics, loadingTopic } = useTypedSelector((state) => state.topics);

    function refresh() {
        dispatch(MessageRedux.loadMessages());
        dispatch(TopicRedux.loadTopics());
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView refreshControl={<RefreshControl refreshing={loadingMessage || loadingTopic} onRefresh={refresh} />}>
                <Text>Notifications Page</Text>
                <Button onPress={() => props.navigation.goBack()} title="Send Acme Boats Support a message"></Button>
                <Button onPress={() => props.navigation.goBack()} title="Go Back"></Button>
            </ScrollView>
        </View>
    );
}
