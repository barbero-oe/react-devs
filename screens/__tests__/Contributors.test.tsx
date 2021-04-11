import * as React from 'react'
import {render} from "@testing-library/react-native";
import {Contributors} from "../Contributors";

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
});