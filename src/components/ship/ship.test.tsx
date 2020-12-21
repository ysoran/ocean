import React from 'react';
import { shallow } from 'enzyme';
import Ship from './ship';

const setup = () => {
    const wrapper = shallow(<Ship lat={12} lng={12} idle={true} dest={""} eta={0} />);
    return {
        wrapper,
    };
};

describe('Ship component', () => {
    it('should render snapshot', () => {
        const { wrapper } = setup();
        expect(wrapper).toMatchSnapshot();
    });
});
