import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {Provider} from "./infrastructure/Provider";
import axios, {AxiosInstance} from "axios";
import {fetchContributors} from "./infrastructure/GitHubService";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {'Accept': 'application/vnd.github.v3+json'}
})

const provider = new Provider([
    ['fetch-contributors', (owner, name) => fetchContributors(axiosInstance, owner, name)]])
export const IoCContext = React.createContext(provider)

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <IoCContext.Provider value={provider}>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme}/>
                    <StatusBar/>
                </SafeAreaProvider>
            </IoCContext.Provider>
        );
    }
}
