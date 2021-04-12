import React from "react";
import {Button, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

export const Main: React.FC = () => {
    const navigation = useNavigation() as any
    const reactContributors = () => navigation.navigate('Contributors', {owner: 'facebook', name: 'react'})
    return (
        <View>
            <Button title={'React Contributors'}
                    onPress={reactContributors}/>
        </View>
    )
}