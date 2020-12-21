import React from 'react';
import { shallow } from 'enzyme';
import Home from './home';

const setup = () => {
    const wrapper = shallow(<Home/>);
    return {
        wrapper,
    };
};

describe('Home component', () => {
    it('should render snapshot', () => {
        const { wrapper } = setup();
        expect(wrapper).toMatchSnapshot();
    });
});
