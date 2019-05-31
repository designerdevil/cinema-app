function generateTestTemplate(COMPONENT_NAME) {
    return `import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import ${COMPONENT_NAME} from './${COMPONENT_NAME}';

configure({ adapter: new Adapter() });
describe('${COMPONENT_NAME}', () => {
    let wrapper;
    const mockData = {};
    beforeEach(() => {
        wrapper = shallow(<${COMPONENT_NAME} {...mockData} />)
    });

    test('Validating with previous snap shot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
`
}

export default generateTestTemplate;
