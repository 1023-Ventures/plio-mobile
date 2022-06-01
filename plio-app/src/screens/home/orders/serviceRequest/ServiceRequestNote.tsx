import { Subheading, TextInput } from 'react-native-paper';
import { FlexView } from '@1023-ventures/serra-common';
import { useFormikContext } from 'formik';
import { ServiceRequest, ServiceRequestModel } from '@1023-ventures/plio-api';

type Props = {};

export function ServiceRequestNote(props: Props) {
    const formik = useFormikContext<ServiceRequest>();

    return (
        <FlexView style={{ marginTop: 16 }}>
            <Subheading>Tell us what you need done?</Subheading>
            <TextInput
                style={{ marginLeft: 8, marginRight: 0, flex: 1, height: 8 * 20 }}
                multiline
                label=" "
                value={formik.values.note}
                onChangeText={(val) => formik.setFieldValue(ServiceRequestModel.note, val)}
                autoComplete={false}
                numberOfLines={7}
            />
        </FlexView>
    );
}
