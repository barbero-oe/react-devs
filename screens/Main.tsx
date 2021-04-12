import React, {useCallback, useState} from "react";
import {Button, TextInput, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const margin = {margin: 10}

export const Main: React.FC = () => {
    const navigation = useNavigation() as any
    const reactContributors = () => navigation.navigate('Contributors', {name: 'facebook/react'})
    const [text, setText] = useState('')
    const searchRepositories = useCallback(
        () => navigation.navigate('Repositories', {search: text}),
        [text])
    return (
        <View>
            <View style={margin}>
                <TextInput value={text} onChangeText={setText} placeholder="Repo name to search"/>
            </View>
            <View style={margin}>
                <Button title={'Search Repositories'} onPress={searchRepositories}/>
            </View>
            <View style={margin}>
                <Button title={'React Contributors'} onPress={reactContributors}/>
            </View>
        </View>
    )
}