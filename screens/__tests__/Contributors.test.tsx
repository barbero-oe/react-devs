import * as React from 'react'
import {render} from "@testing-library/react-native";
import {Contributors} from "../Contributors";
import {Provider} from "../../infrastructure/Provider";

const avatar = require('../../assets/images/favicon.png')

it('should display contributors names', () => {
    const contributors = [
        {id: 0, user: 'zpao', avatar},
        {id: 1, user: 'foo', avatar},
        {id: 2, user: 'bar', avatar},
        {id: 3, user: 'baz', avatar}]
    const {queryByText} = render(<Contributors contributors={contributors}/>)

    expect(queryByText('zpao')).not.toBeNull()
    expect(queryByText('bar')).not.toBeNull()
    expect(queryByText('johan')).toBeNull()
})

it('should transform service info of the contributors', async () => {
    const contributors = createServiceContributors(3)
    const provider = new Provider([['fetch-contributors', () => contributors]])
    const show = jest.fn()

    await provider.showContributors('facebook/react', show)

    expect(show).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({id: 0, user: 'user-0'}),
        expect.objectContaining({id: 1, user: 'user-1'})]))
})

function createServiceContributors(quantity: number) {
    const contributors = []
    for (let i = 0; i < quantity; i++)
        contributors.push(create(i))
    return contributors
}

function create(index: number) {
    const login = `user-${index}`
    return {
        login,
        id: index,
        url: `https://api.github.com/users/${login}`,
        contributions: (index + 1) * 7
    }
}
