import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, Text, TouchableHighlight, View} from "react-native";
import {IoCContext} from "../App";
import {useNavigation, useRoute} from "@react-navigation/native";

function renderRepository(onPress?: (name: string) => void): ListRenderItem<Repository> {
    return ({item}) =>
        <TouchableHighlight onPress={() => onPress && onPress(item.name)}>
            <View style={{margin: 10}}>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
            </View>
        </TouchableHighlight>
}

export const Repositories: React.FC<RepositoriesProps> =
    ({repositories, onPress}) => {
        return (
            <FlatList data={repositories}
                      keyExtractor={(repository: Repository) => repository.id.toString()}
                      renderItem={renderRepository(onPress)}
            />
        )
    }

export interface RepositoriesProps {
    repositories: Repository[]
    onPress?: (name: string) => void
}

export interface Repository {
    id: number
    name: string
    description: string
}

export const RepositoriesScreen: React.FC = () => {
    const provider = useContext(IoCContext)
    const [repositories, setRepositories] = useState<Repository[]>([])
    const {search} = useRoute().params;
    useEffect(() => provider.showRepositories(search, setRepositories), [search])
    const navigation = useNavigation() as any
    const searchContributors = useCallback(
        (name: string) => navigation.navigate('Contributors', {name}),
        [navigation])
    return <Repositories repositories={repositories} onPress={searchContributors}/>
}

