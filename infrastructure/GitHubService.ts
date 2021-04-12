import {AxiosInstance, AxiosResponse} from "axios";
import {ServiceContributor} from "../domain/ServiceContributor";
import {ServiceRepositories} from "../domain/ServiceRepositories";

export const fetchContributors = async (axios: AxiosInstance, name: string): Promise<ServiceContributor[]> =>
    tryOrElse(() => getData<ServiceContributor[]>(axios, `/repos/${name}/contributors`), [])

export const searchRepositories = async (axios: AxiosInstance, search: string): Promise<ServiceRepositories[]> =>
    tryOrElse(async () => {
        const repositories = await getData<{ items: ServiceRepositories[] }>(axios, `search/repositories?q=${search} in:name`);
        return repositories.items
    }, [])

const tryOrElse = async <T>(func: () => Promise<T>, orElse: T) => {
    try {
        return await func()
    } catch (e) {
        return orElse
    }
}

const getData = async <T>(axios: AxiosInstance, url: string): Promise<T> => {
    const response = await axios.get<T, AxiosResponse<T>>(encodeURI(url));
    return response.data
};