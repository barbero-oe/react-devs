import {Contributor} from "../screens/Contributors";
import {Repository} from "../screens/Repositories";
import {showContributors, showRepositories} from "../domain/Actions";

export class Provider {
    private deps: Map<string, any>

    constructor(dependencies: [string, any][]) {
        this.deps = new Map<string, any>(dependencies)
    }

    readonly showContributors = (name: string, show: (contributors: Contributor[]) => void) => {
        (async () => await showContributors(this.deps.get('fetch-contributors'), name, show))()
    }

    readonly showRepositories = (search: string, show: (repositories: Repository[]) => void) => {
        (async () => await showRepositories(this.deps.get('fetch-repositories'), search, show))()
    }
}