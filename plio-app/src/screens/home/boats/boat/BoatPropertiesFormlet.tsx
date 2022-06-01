import { Asset, AssetModel, ImageAsync } from '@1023-ventures/plio-api';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { Image as SavedImage } from '@1023-ventures/plio-api';

type Props = {
    onDone: () => void;
};

export function BoatPropertiesFormlet(props: Props) {
    const formik = useFormikContext<Asset>();
    const boat = formik.values;
    const [photo, setPhoto] = React.useState<SavedImage>();

    useEffect(() => {
        if (boat.primaryImageId) {
            console.log('loading image', boat.primaryImageId);
            ImageAsync.read(boat.primaryImageId).then((r) => setPhoto(r));
        }
    }, [boat.primaryImageId]);

    return (
        <View style={{ display: 'flex', flex: 1, backgroundColor: 'transparent' }}>
            <TextInput
                label={'Name'}
                autoComplete={false}
                value={formik.values.name ?? ''}
                onChangeText={formik.handleChange(AssetModel.name)}
                onSubmitEditing={() => console.log('testing 123')}
                // onChange={}
                style={{ marginBottom: 8 }}
            />
            <TextInput
                label={'Brand'}
                autoComplete={false}
                value={formik.values.manufacturerOther ?? ''}
                onChangeText={formik.handleChange(AssetModel.manufacturerOther)}
                // onChange={}
                style={{ marginBottom: 8 }}
            />
            <TextInput
                label={'Model'}
                autoComplete={false}
                value={formik.values.modelOther ?? ''}
                onChangeText={formik.handleChange(AssetModel.modelOther)}
                // onChange={}
                style={{ marginBottom: 8 }}
            />
            <TextInput
                label={'Model Year'}
                autoComplete={false}
                value={formik.values.modelYear ?? ''}
                onChangeText={formik.handleChange(AssetModel.modelYear)}
                // onChange={}
                style={{ marginBottom: 8 }}
            />
            <TextInput
                label={'Serial Number'}
                autoComplete={false}
                value={formik.values.serialNumber ?? ''}
                onChangeText={formik.handleChange(AssetModel.serialNumber)}
                style={{ marginBottom: 8 }}
            />
            {/* <View style={{ flex: 1, backgroundColor: 'orange' }}>
                <Text>test</Text>
            </View> */}

            {/* <Button
                onPress={() => {
                    formik.submitForm().then(() => {
                        props.onDone && props.onDone();
                    });
                }}
            >
                Save
            </Button> */}
            <Text>Upload a Photo</Text>
            <Card style={{ borderColor: 'silver', borderStyle: 'solid', borderWidth: 1 }}>
                <Card.Cover
                    // source={boatImage}

                    source={{
                        uri: `data:image/png;base64,${photo?.imageData}`
                    }}
                />
            </Card>
        </View>
    );
}
