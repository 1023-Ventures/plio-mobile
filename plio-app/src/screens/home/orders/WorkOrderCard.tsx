import React, { PropsWithChildren, useEffect } from 'react';
import { Image } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { Asset, AssetRedux, Image as SavedImage, ImageAsync, ServiceRequest } from '@1023-ventures/plio-api';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { Button, Card, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddAssetRedux } from '../../../store/AddAssetRedux';

type Props = {
    serviceRequest: ServiceRequest;
    onPress?: () => void;
};

export function WorkOrderCard(props: PropsWithChildren<Props>) {
    const { serviceRequest } = props;
    const dispatch = useTypedDispatch();
    const { activeImage, loadingImage } = useTypedSelector((state) => state.images);

    useEffect(() => {}, []);

    return (
        <Card key={serviceRequest.id} style={{ borderColor: 'silver', borderStyle: 'solid', borderWidth: 1, margin: 16 }}>
            <Card.Title
                //
                title="Service Order"
                // subtitle={boat.name}
                // left={() => <Image source={oemImage} style={{ width: 40, height: 40 }} />}
            />
            <Card.Content>
                {/* <Title></Title> */}
                <Paragraph>Content {serviceRequest.requestedDate}</Paragraph>
                {/* <Text>{photo?.imageData?.substring(0, 10)}</Text> */}
            </Card.Content>
            <Card.Actions>
                {/* <Image source={dealerImage} width={32} height={32} style={{ width: 32, height: 32 }} />
                <Button>Schedule Service</Button>
                <Button
                    onPress={async () => {
                        await pickImage();
                    }}
                >
                    Upgrade
                </Button> */}
            </Card.Actions>
        </Card>
    );
}
