import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import '../../../__test__/jest.config';
import { CustomerListContainer } from '../Containers';
import { fakeProps } from '../../../__test__/testHelpers';

const { describe, test, expect } = global;

jest.mock('../../src/services/ApiService.js');

const wrapper = shallow(<MemoryRouter><CustomerListContainer.WrappedComponent {...fakeProps} /></MemoryRouter >);
const wrapperComp = wrapper.dive().dive();

describe('The CustomerList component', () => {
  test('it exists', () => {
    // The component should have a single master div with .CustomerList
    expect(wrapperComp.find('.CustomerList').length).toBe(1);

    // The component should contain the text 'Customers of Bonjour Cafe'
    // based on the fakeProps
    expect(wrapperComp.text()).toContain('Customers of Bonjour Cafe');

    // The table should have a header containing 'User Name'
    expect(wrapperComp.find('tr').at(0)
      .text()).toContain('User Name');

    // By default, Wohlerbear shoudl be first user
    expect(wrapperComp.find('tr').at(1)
      .text()).toContain('Wohlerbear');

    // After clicking to sort by total revenue, Wohlerbear is first user
    wrapperComp.find('.header-total-revenue').simulate('click');
    expect(wrapperComp.find('tr').at(1)
      .text()).toContain('Wohlerbear');

    // After clicking to sort by total revenue, eatEverything is first user
    wrapperComp.find('.header-total-revenue').simulate('click');
    expect(wrapperComp.find('tr').at(1)
      .text()).toContain('eatEverything');

    // After clicking to sort by total revenue, Wohlerbear is first user
    wrapperComp.find('.header-total-revenue').simulate('click');
    expect(wrapperComp.find('tr').at(1)
      .text()).toContain('Wohlerbear');

    // After clicking to sort by average revenue, Prince of All Saiyans is first user
    wrapperComp.find('.header-average-revenue').simulate('click');
    expect(wrapperComp.find('tr').at(1)
      .text()).toContain('Prince of All Saiyans');

    // After clicking to sort by average revenue, Chris is first user
    wrapperComp.find('.header-average-revenue').simulate('click');
    expect(wrapperComp.find('tr').at(1)
      .text()).toContain('Chris');

    // After clicking to sort by average revenue, Prince of All Saiyans is first user
    wrapperComp.find('.header-average-revenue').simulate('click');
    expect(wrapperComp.find('tr').at(1)
      .text()).toContain('Prince of All Saiyans');
  });
});
