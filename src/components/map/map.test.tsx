import React from 'react';
import { shallow } from 'enzyme';
import {IShipInterface,IPort} from '../../interfaces/interfaces';
import Map from './map';

const setup = () => {
    const wrapper = shallow(<Map ships={[] as Array<IShipInterface>} port={{} as IPort} />);
    return {
        wrapper,
    };
};

describe('Map component', () => {
    it('should render snapshot', () => {
        const { wrapper } = setup();
        expect(wrapper).toMatchSnapshot();
    });
});
