import { expect } from 'chai';
import './lib.js';

describe('test add', () => {
  it('should render correctly on the page', () => {
    expect(document.querySelector('#my_fancy_app').textContent).to.equal('4');
  });
});
