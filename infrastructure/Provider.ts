import {showContributors} from "../domain/ShowContributors";
import {Contributor} from "../screens/Contributors";

export class Provider {
    private deps: Map<string, any>

    constructor(dependencies: [string, any][]) {
        this.deps = new Map<string, any>(dependencies)
    }

    readonly showContributors = (owner: string, name: string, show: (contributors: Contributor[]) => void) => {
        (async () => await showContributors(this.deps.get('fetch-contributors'), owner, name, show))()
    }
}