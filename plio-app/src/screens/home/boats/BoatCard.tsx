import React, { PropsWithChildren, useEffect } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { Asset, AssetRedux, Image as SavedImage, ImageAsync } from '@1023-ventures/plio-api';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { Button, Card, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddAssetRedux } from '../../../store/AddAssetRedux';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
    boat?: Asset;
    onPress?: () => void;
};

export function BoatCard(props: PropsWithChildren<Props>) {
    const boat = props.boat ?? {};
    const { authData } = useAuth();
    const dispatch = useTypedDispatch();
    const { activeImage, loadingImage } = useTypedSelector((state) => state.images);
    const [photo, setPhoto] = React.useState<SavedImage>();

    useEffect(() => {
        if (boat.primaryImageId) {
            console.log('loading image', boat.primaryImageId);
            ImageAsync.read(boat.primaryImageId).then((r) => setPhoto(r));
        }
    }, [boat.primaryImageId]);

    const axisImg = require('../../../../assets/axis.png');
    const malibuImg = require('../../../../assets/malibu.png');
    const oemImage = boat.serialNumber?.startsWith('MB') ? malibuImg : axisImg;
    const dealerImage = require('../../../../assets/boat-icon-png-10.png');
    const speedBoatImage = require('../../../../assets/icons8-speed-boat-50.png');
    const axisBoatImage = require('../../../../assets/AWRB4392J122-84104.jpg');
    const malibuBoatImage = require('../../../../assets/MB2S3963I122-80437.jpg');
    const boatImage = boat.serialNumber?.startsWith('MB') ? malibuBoatImage : axisBoatImage;

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            if (boat.primaryImageId == undefined) {
                const newImage = { imageData: result.base64 } as SavedImage;
                setPhoto(newImage);
                ImageAsync.create(newImage, true).then((r) => {
                    dispatch(AssetRedux.updateAsset({ asset: { ...boat, primaryImageId: r.id }, reload: true }));
                });
            } else {
                const updatedImage = { ...photo, imageData: result.base64 };
                setPhoto(updatedImage);
                photo && ImageAsync.update(updatedImage, false);
            }
        }
    };

    const subtitle = `${boat.modelYear ?? ''} ${boat.manufacturerOther} ${boat.modelOther}`;
    const boatSubtitle = boat.name ? subtitle : undefined;
    const boatTitle = boat.name ?? boatSubtitle;

    return (
        <Card
            key={boat.id}
            style={{
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: 1,
                marginTop: 8,
                marginBottom: 8,
                borderRadius: 8,
                margin: 2
            }}
            theme={{}}
        >
            {/* <Card.Content> */}
            {/* <Title></Title> */}
            {/* <Paragraph>{boat.serialNumber}</Paragraph> */}
            {/* <Text>{photo?.imageData?.substring(0, 10)}</Text> */}
            {/* </Card.Content> */}
            <TouchableOpacity
                key={boat.id}
                // onPress={() => {
                //     dispatch(AssetRedux.Actions.setActiveAsset(boat));
                //     dispatch(AddAssetRedux.Actions.setDialogVisibile(true));
                //     props.onPress && props.onPress();
                // }}
            >
                <Card.Cover
                    // source={boatImage}
                    style={{ borderTopRightRadius: 8, borderTopLeftRadius: 8, marginLeft: -1, marginRight: -2 }}
                    source={
                        photo
                            ? {
                                  uri: `data:image/png;base64,${photo?.imageData}`
                              }
                            : boatImage
                    }
                ></Card.Cover>
                <View
                    style={{
                        position: 'absolute',
                        marginLeft: -2,
                        marginTop: 16,
                        height: 28,
                        backgroundColor: '#093D6B',
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24
                    }}
                >
                    <Text
                        style={{
                            fontSize: Platform.OS === 'ios' ? 12 : 14,
                            paddingTop: Platform.OS === 'ios' ? 4 : 4,
                            paddingLeft: 16,
                            paddingRight: 16,
                            color: 'white'
                        }}
                    >
                        {boat.serialNumber}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
                <Image source={dealerImage} width={32} height={32} style={{ marginLeft: 8, marginRight: 8, width: 32, height: 32 }} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600' }}>{boatTitle}</Text>
                    <Text style={{ fontSize: 12 }}>{boatSubtitle}</Text>
                </View>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                        backgroundColor: '#fff',
                        borderRadius: 50,
                        marginRight: 8
                    }}
                    onPress={() => {
                        dispatch(AssetRedux.Actions.setActiveAsset(boat));
                        dispatch(AddAssetRedux.Actions.setDialogVisibile(true));
                        props.onPress && props.onPress();
                    }}
                >
                    <MaterialCommunityIcons name="dots-horizontal" size={16} />
                    {/* <Icon name={"chevron-right"}  size={30} color="#01a699" /> */}
                </TouchableOpacity>
            </View>
            {/* <Card.Title
                //
                title={boatTitle}
                subtitle={boatSubtitle}
                // left={() => <Image source={oemImage} style={{ width: 40, height: 40 }} />}
                titleStyle={{
                    fontSize: 12,
                    borderColor: 'red',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    // backgroundColor: 'red',
                    // height: 16,
                    // alignItems: 'center',
                    // alignContent: 'center',
                    // alignSelf: 'center',
                    // textAlignVertical: 'center',
                    // paddingBottom: 10,
                    // paddingTop: -10,
                    height: 12,
                    marginTop: -24
                    // marginBottom: 0
                }}
                subtitleStyle={{
                    fontSize: 12,
                    borderColor: 'red',
                    borderStyle: 'solid',
                    borderWidth: 1
                    // backgroundColor: 'gray'
                }}
                style={{ backgroundColor: 'yellow' }}
            /> */}
            <Card.Actions
                style={{
                    backgroundColor: '#00A4DC',
                    justifyContent: 'center',
                    borderBottomRightRadius: 8,
                    borderBottomLeftRadius: 8,
                    height: 40,
                    marginLeft: -2,
                    marginRight: -2,
                    marginBottom: -2
                }}
            >
                {/* <Image source={dealerImage} width={32} height={32} style={{ width: 32, height: 32 }} /> */}
                <Text
                    style={{
                        flex: 1,
                        backgroundColor: '#00A4DC',
                        fontSize: 12,
                        color: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                >
                    Schedule Service
                </Text>
                {/* <Button labelStyle={{ fontSize: 12, backgroundColor: 'blue', color: 'white' }}>Schedule Service</Button> */}
                {/* <Button
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
