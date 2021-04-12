import {AxiosInstance, AxiosResponse} from "axios";
import {ServiceContributor} from "../domain/ServiceContributor";

export async function fetchContributors(axios: AxiosInstance, owner: string, name: string): Promise<ServiceContributor[]> {
    const response = await axios.get<ServiceContributor[], AxiosResponse<ServiceContributor[]>>(`/repos/${owner}/${name}/contributors`)
    return response.data
}
