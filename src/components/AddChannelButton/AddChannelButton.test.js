import React from 'react';
import { shallow } from 'enzyme';
import AddChannelButton from './AddChanelButton';

describe('<AddChannelButton />', () => {
    const wrapper = shallow(<AddChannelButton />);
    it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })

    it('should have a text field', () => {
        expect(wrapper.find('input[type="text"]').length).toEqual(1);
    })

    it('[text input] should prevent invalid chars input', () => {
        const beforeInputParams = {
            data: 'a',
            preventDefault: jest.fn(() => {})
        }
        wrapper.find('input[type="text"]').simulate('beforeinput', beforeInputParams)
        expect(beforeInputParams.preventDefault).toHaveBeenCalledTimes(0)
        wrapper.find('input[type="text"]').simulate('beforeinput', {...beforeInputParams, data: '-'})
        expect(beforeInputParams.preventDefault).toHaveBeenCalledTimes(1)
        wrapper.find('input[type="text"]').simulate('beforeinput', {...beforeInputParams, data: ' '})
        expect(beforeInputParams.preventDefault).toHaveBeenCalledTimes(2)
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'm' } } )
        wrapper.find('input[type="text"]').simulate('beforeinput', {...beforeInputParams, data: ' '})
        expect(beforeInputParams.preventDefault).toHaveBeenCalledTimes(2)
    })

    it('[text input] should update onChange', () => {
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'm' } } )
        expect(wrapper.find('input[type="text"]').prop('value')).toEqual('m');
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'new channel' } } )
        expect(wrapper.find('input[type="text"]').prop('value')).toEqual('new channel');
    })

    it('[button] should clear text input', () => {
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'new channel' } } )
        wrapper.find('button').simulate('click')
        expect(wrapper.find('input[type="text"]').prop('value')).toEqual('');
    })
})