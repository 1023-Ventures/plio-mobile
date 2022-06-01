import { PropsWithChildren } from 'react';
import { useTypedDispatch } from '../../../store';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {};

export function ShopAcessories(props: PropsWithChildren<Props>) {
    const dispatch = useTypedDispatch();

    return (
        <Card style={{ borderColor: 'silver', borderStyle: 'solid', borderWidth: 1, margin: 16 }}>
            <Card.Title
                title="Shop Accessories"
                subtitle="boards, tubes, clothes, etc."
                left={() => <MaterialCommunityIcons name="cash" size={36} />}
            />
            {/* <Card.Content>
                <Title>the title</Title>
                <Paragraph>blah, blah, blah</Paragraph>
            </Card.Content> */}
            <Card.Actions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button mode="contained" disabled={true}>
                    Shop
                </Button>
            </Card.Actions>
        </Card>
    );
}
