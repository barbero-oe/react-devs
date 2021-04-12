import {ServiceContributor} from "./ServiceContributor";
import {Contributor} from "../screens/Contributors";
import {ServiceRepositories} from "./ServiceRepositories";
import {Repository} from "../screens/Repositories";

export const showContributors = async (fetchContributors: (name: string) => Promise<ServiceContributor[]>,
                                       name: string,
                                       show: (contributors: Contributor[]) => void) => {
    const serviceContributors = await fetchContributors(name)
    const contributors = serviceContributors.map(({id, login, avatar_url}) =>
        ({id, user: login, avatar: avatar_url}))
    show(contributors)
}

export const showRepositories = async (fetchRepositories: (search: string) => Promise<ServiceRepositories[]>,
                                       name: string,
                                       show: (repositories: Repository[]) => void) => {
    const serviceRepositories = await fetchRepositories(name)
    const repositories: Repository[] = serviceRepositories.map(({id, full_name, description}) =>
        ({id, name: full_name, description}))
    show(repositories)
}

