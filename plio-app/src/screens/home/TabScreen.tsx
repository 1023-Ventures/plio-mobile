// import { DefaultNavigatorOptions, ParamListBase, TabNavigationState, TabRouterOptions } from '@react-navigation/native';
// import type { BottomTabNavigationEventMap, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
// import { BottomTabNavigationConfig } from '@react-navigation/bottom-tabs/lib/typescript/src/types';

// declare type NavProps = DefaultNavigatorOptions<
//     ParamListBase,
//     TabNavigationState<ParamListBase>,
//     BottomTabNavigationOptions,
//     BottomTabNavigationEventMap
// > &
//     TabRouterOptions &
//     BottomTabNavigationConfig;

// declare function BottomTabNavigator({
//     initialRouteName,
//     backBehavior,
//     children,
//     screenListeners,
//     screenOptions,
//     sceneContainerStyle,
//     ...restWithDeprecated
// }: NavProps): JSX.Element;

// type TabbedNavigator<ParamList extends ParamListBase> = import('@react-navigation/native').TypedNavigator<
//     ParamList,
//     TabNavigationState<ParamListBase>,
//     BottomTabNavigationOptions,
//     BottomTabNavigationEventMap,
//     typeof BottomTabNavigator
// >;

// type Props<Routes extends ParamListBase> = {
//     tabNavigator: TabbedNavigator<Routes>;
// };

// export function TabScreen<Routes extends ParamListBase>(props: Props<Routes>) {
//     return <div></div>;
// }
