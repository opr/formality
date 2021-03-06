import chai from 'chai';
import {JSDOM} from 'jsdom';
import chaiImmutable from 'chai-immutable';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    beforeParse(window) {
        window.requestAnimationFrame = (x) => {}; //this is to shut react up
    }
});
const doc = dom.window.document;
const win = dom.window;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

chai.use(chaiImmutable);