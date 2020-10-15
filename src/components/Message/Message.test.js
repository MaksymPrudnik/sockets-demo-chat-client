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

    it('should display message image optionaly', () => {
        const noImageWraper = shallow(<Message username={props.username} message={{...props.message, img: ''}} />)
        expect(noImageWraper.find('img').length).toEqual(0);
    })

    it('should display message body optionaly', () => {
        const noImageWraper = shallow(<Message username={props.username} message={{...props.message, body: ''}} />)
        expect(noImageWraper.find('img').length).toEqual(0);
    })

})