import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {JSDOM} from 'jsdom';
import configureMockStore from 'redux-mock-store';

Enzyme.configure({adapter: new Adapter()});
export const mockStore = configureMockStore([]);
const {window} = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = window;
global.navigator = {
  userAgent: 'node.js'
};
chai.use(chaiImmutable);
