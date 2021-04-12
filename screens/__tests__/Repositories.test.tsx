import React from "react";
import {fireEvent, render} from "@testing-library/react-native";
import {Repositories} from "../Repositories";
import {Provider} from "../../infrastructure/Provider";

it('should show the repositories', function () {
    const repos = [
        {id: 0, name: 'org/foo', description: 'foo description'},
        {id: 1, name: 'org/boo', description: 'boo description'},
        {id: 2, name: 'org/bar', description: 'bar description'}]

    const {queryByText} = render(<Repositories repositories={repos}/>)

    expect(queryByText('org/foo')).not.toBeNull()
    expect(queryByText('boo description')).not.toBeNull()
    expect(queryByText('fizz')).toBeNull()
})

it('should call function when pressed', function () {
    const repos = [
        {id: 0, name: 'org/foo', description: 'foo description'},
        {id: 1, name: 'org/boo', description: 'boo description'},
        {id: 2, name: 'org/bar', description: 'bar description'}]
    const repoPressed = jest.fn()

    const {getByText} = render(
        <Repositories repositories={repos}
                      onPress={repoPressed}/>)

    fireEvent.press(getByText('org/foo'))

    expect(repoPressed).toHaveBeenCalledWith('org/foo')
});

it('should fetch repositories from service', async () => {
    const repositories = createRepos(3)
    const provider = new Provider([['fetch-repositories', () => repositories.items]])
    const show = jest.fn()

    await provider.showRepositories('facebook/react', show)

    expect(show).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({id: 0, name: 'org/name-0'}),
        expect.objectContaining({id: 1, name: 'org/name-1'})]))
});

function createRepos(quantity: number) {
    const repos = []
    for (let i = 0; i < quantity; i++) {
        repos.push(createRepo(i))
    }
    return {items: repos}
}

function createRepo(id: number) {
    const name = `name-${id}`
    return {
        id,
        name,
        full_name: `org/${name}`,
        owner: {
            login: "org",
            id: id * 7,
        },
        description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    }
}

/*
    "items": [
        {
            "id": 10270250,
            "name": "react",
            "full_name": "facebook/react",
            "owner": {
                "login": "facebook",
                "id": 69631,
                "avatar_url": "https://avatars.githubusercontent.com/u/69631?v=4",
                "url": "https://api.github.com/users/facebook",
                "html_url": "https://github.com/facebook",
            },
            "html_url": "https://github.com/facebook/react",
            "homepage": "https://reactjs.org",
            "description": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
            "url": "https://api.github.com/repos/facebook/react",
        },
 */
