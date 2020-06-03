import React from 'react'
import { shallow } from 'enzyme'
import { EdcHelp } from './EdcHelp'

describe('EdcHelp', () => {
  it('should render a <i /> to display the icon', () => {
    const wrapper = shallow(<EdcHelp />)
    expect(wrapper.find('i').length).toEqual(1)
  })
})
