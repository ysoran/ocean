import React from 'react';
import { shallow } from 'enzyme';
import {IShipInterface} from '../../interfaces/interfaces';
import Lister from './lister';

const setup = () => {
    const wrapper = shallow(<Lister ships={[] as Array<IShipInterface>} showHeader={true} setShowHeader={()=>{}} />);
    return {
        wrapper,
    };
};

describe('List component', () => {
    it('should render snapshot', () => {
        const { wrapper } = setup();
        expect(wrapper).toMatchSnapshot();
    });
});
