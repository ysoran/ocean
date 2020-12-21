import React from 'react';
import { shallow } from 'enzyme';
import SearchPanel from './search-panel';

const setup = () => {
    const wrapper = shallow(<SearchPanel handleSearch={()=>{}} />);
    return {
        wrapper,
    };
};

describe('Search Panel component', () => {
    it('should render snapshot', () => {
        const { wrapper } = setup();
        expect(wrapper).toMatchSnapshot();
    });
});
