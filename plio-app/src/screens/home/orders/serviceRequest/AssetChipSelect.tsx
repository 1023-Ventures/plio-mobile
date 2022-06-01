import { View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { CheckChip } from '@1023-ventures/serra-common';

export interface ISelectableItem {
    id: any;
    assetId: string;
    name: string;
    selected: boolean;
}

type Props = {
    list?: ISelectableItem[];
    onSelectChanged: (list: ISelectableItem[] | undefined) => void;
};

export function AssetChipSelect(props: Props) {
    return (
        <View style={{ marginTop: 16 }}>
            <View style={{ flexDirection: 'row' }}>
                <Subheading>What needs service?</Subheading>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 8, marginLeft: 8 }}>
                {props.list?.map((item) => {
                    return (
                        <CheckChip
                            key={item.assetId}
                            label={item.name}
                            checked={item.selected}
                            checkChanged={(v) => {
                                item.selected = v;
                                props.onSelectChanged && props.onSelectChanged(props.list);
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
}
