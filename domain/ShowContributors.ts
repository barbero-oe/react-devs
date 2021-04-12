import {ServiceContributor} from "./ServiceContributor";
import {Contributor} from "../screens/Contributors";

export const showContributors = async (fetchContributors: (owner: string, name: string) => Promise<ServiceContributor[]>,
                                       owner: string,
                                       name: string,
                                       show: (contributors: Contributor[]) => void) => {
    const serviceContributors = await fetchContributors(owner, name)
    const contributors = serviceContributors.map(({id, login, avatar_url}) =>
        ({id, user: login, avatar: avatar_url}))
    show(contributors)
}

