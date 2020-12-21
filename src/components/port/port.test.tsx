import React from 'react';
import { shallow } from 'enzyme';
import Port from './port';

const setup = () => {
    const wrapper = shallow(<Port lat={0} lng={0} />);
    return {
        wrapper,
    };
};

describe('Port component', () => {
    it('should render snapshot', () => {
        const { wrapper } = setup();
        expect(wrapper).toMatchSnapshot();
    });
});
