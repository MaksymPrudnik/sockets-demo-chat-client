import React from 'react';
import { shallow } from 'enzyme';
import Message from './Message';

describe('<Message />', () => {
    const props = {
        username: 'maksymprudnik',
        message: {
            username: 'max',
            body: 'hi',
            img: 'https://sockets-chat-maksymprudnik.s3.eu-central-1.amazonaws.com/37-2.png',
            createdat: 'some/date'
        }
    }
    const wrapper = shallow(<Message {...props} />)
    it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })

    it('should display message author optionaly', () => {
        expect(wrapper.find('span.message-author').length).toEqual(1);
        const equalUsernamesWrapper = shallow(<Message username={props.username} message={{...props.message, username: props.username}} />)
        expect(equalUsernamesWrapper.find('span.message-author').length).toEqual(0);
    })

    it('should display message image optionaly', () => {
        expect(wrapper.find('img').length).toEqual(1);
        const noImageWraper = shallow(<Message username={props.username} message={{...props.message, img: ''}} />)
        expect(noImageWraper.find('img').length).toEqual(0);
    })

    it('should display message body optionaly', () => {
        expect(wrapper.find('span.message-body').length).toEqual(1);
        const noBodyWraper = shallow(<Message username={props.username} message={{...props.message, body: ''}} />)
        expect(noBodyWraper.find('span.message-body').length).toEqual(0);
    })

})