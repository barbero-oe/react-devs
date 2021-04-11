import React from "react";
import {FlatList, Image, ListRenderItem, Text, View} from "react-native";

const renderContributor: ListRenderItem<Contributor> = ({item}) =>
    <View>
        <Image source={item.avatar}/>
        <Text>{item.user}</Text>
    </View>

export const Contributors: React.FC<ContributorsProps> = ({contributors}) =>
    <FlatList data={contributors}
              keyExtractor={(contributor: Contributor) => contributor.id.toString()}
              renderItem={renderContributor}/>


export interface Contributor {
    id: number
    user: string
    avatar: string
}

export interface ContributorsProps {
    contributors: Contributor[]
}