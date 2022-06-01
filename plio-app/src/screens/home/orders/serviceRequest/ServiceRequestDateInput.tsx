import React, { useState } from 'react';
import { Button, Subheading, HelperText } from 'react-native-paper';
import { useFormikContext } from 'formik';
import { DatePickerModal } from 'react-native-paper-dates';
import { ServiceRequest, ServiceRequestModel } from '@1023-ventures/plio-api/plio/models/ServiceRequest';

type Props = {};

export function ServiceRequestDateInput(props: Props) {
    const formik = useFormikContext<ServiceRequest>();
    const [open, setOpen] = useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            formik.setFieldValue(ServiceRequestModel.requestedDate, params.date);
            setDate(params.date);
        },
        [setOpen, setDate]
    );

    const isValid = formik.values.requestedDate != null && isNaN(formik.values.requestedDate.valueOf()) === false;

    return (
        <>
            <Subheading>When do you need an appointment? </Subheading>
            <Button
                icon={formik.values.requestedDate ? '' : 'check'}
                mode="contained"
                style={{ marginLeft: 8, marginRight: 0 }}
                onPress={() => formik.setFieldValue(ServiceRequestModel.requestedDate, undefined)}
                uppercase={false} //
            >
                As soon as possible
            </Button>
            <Button
                icon={formik.values.requestedDate ? 'check' : ''}
                mode="contained"
                style={{ marginLeft: 8, marginRight: 0, marginTop: 8 }}
                onPress={() => setOpen(true)}
                uppercase={false} //
            >
                {isValid ? formik.values.requestedDate?.toDateString() : 'Select a date'}
            </Button>
            <HelperText type="info" visible={true} onPressIn={() => {}} onPressOut={() => {}}>
                Press the button to change the date &amp; time of your appointment
            </HelperText>
            <DatePickerModal locale="en" mode="single" visible={open} onDismiss={onDismissSingle} date={date} onConfirm={onConfirmSingle} />
        </>
    );
}
