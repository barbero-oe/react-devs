import React, {useContext, useEffect, useState} from "react";
import {FlatList, ListRenderItem, Text, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import {IoCContext} from "../App";

const renderContributor: ListRenderItem<Contributor> = ({item}) =>
    <View style={{margin: 10}}>
        <Text>{item.user}</Text>
    </View>

export const Contributors: React.FC<ContributorsProps> = ({contributors}) =>
    <FlatList data={contributors}
              keyExtractor={(contributor: Contributor) => contributor.id.toString()}
              renderItem={renderContributor}/>

export interface ContributorsProps {
    contributors: Contributor[]
}

export const ContributorsScreen: React.FC = () => {
    const provider = useContext(IoCContext)
    const [contributors, setContributors] = useState<Contributor[]>([])
    const {name} = useRoute().params;
    useEffect(() => provider.showContributors(`${name}`, setContributors), [name])
    return <Contributors contributors={contributors}/>
}

export interface Contributor {
    id: number
    user: string
    avatar: string
}
