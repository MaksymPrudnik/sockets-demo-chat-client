import React from 'react';
import { shallow } from 'enzyme';
import LoadMoreMessagesButton from './LoadMoreMessagesButton';

describe('<LoadMoreMessagesButton />', () => {
    const props = {channel: 'new channel', count: 5}
    const wrapper = shallow(<LoadMoreMessagesButton {...props} />);
    
    it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })
})