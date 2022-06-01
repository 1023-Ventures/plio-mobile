import React, { PropsWithChildren, useState } from 'react';
import { Button, Card } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ServiceRequestDialog } from '../orders/serviceRequest/ServiceRequestDialog';
import { ServiceRequest } from '@1023-ventures/plio-api';
import { Text } from 'react-native';
import { ServiceRequestsDialog } from '../orders/serviceRequest/ServiceRequestsDialog';

type Props = {
    data: Array<ServiceRequest>;
};

export function ServiceCard(props: PropsWithChildren<Props>) {
    const [dlgShown, setDlgShown] = useState(false);
    const listDialog = useDialogController();
    const pendingServiceRequests = props.data;

    return (
        <>
            <ServiceRequestDialog visible={dlgShown} closeDialog={() => setDlgShown(false)} />
            <ServiceRequestsDialog controller={listDialog} />

            <Card style={{ borderColor: 'silver', borderStyle: 'solid', borderWidth: 1, margin: 16 }}>
                <Card.Title
                    title="Schedule a Service Visit"
                    subtitle="for a boat"
                    left={() => <MaterialCommunityIcons name="wrench" size={36} />}
                />
                {/* 
                <Card.Content>
                    <Title>the title</Title>
                    <Paragraph>blah, blah, blah</Paragraph>
                    </Card.Content> 
                */}
                <Card.Actions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Text
                        onPress={() => {
                            console.log('pressed');
                            listDialog.setDialogOpen(true);
                        }}
                        style={{
                            textDecorationLine: 'underline',
                            color: 'blue'
                        }}
                    >{`${pendingServiceRequests.length} pending`}</Text>
                    <Text style={{ flex: 1 }}></Text>
                    <Button mode="contained" onPress={() => setDlgShown(true)}>
                        Schedule Service
                    </Button>
                </Card.Actions>
            </Card>
        </>
    );
}

export type DialogController = {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useDialogController() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    return { dialogOpen, setDialogOpen } as DialogController;
}
