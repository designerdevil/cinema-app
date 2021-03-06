import { generateImports } from './common.template'
import defaultOptions from '../../config.json'

function generateFunctionalComponent(
  COMPONENT_NAME,
  componentType,
  { cssExtension = defaultOptions.defaultOptions } = defaultOptions
) {
  return `${generateImports(COMPONENT_NAME, componentType, { cssExtension })}

const ${COMPONENT_NAME} = ({}) => (
  <div className="${COMPONENT_NAME.toLowerCase()}"></div>
);

${COMPONENT_NAME}.propTypes = {};

${COMPONENT_NAME}.defaultProps = {};

export default ${COMPONENT_NAME}
`
}

export default generateFunctionalComponent
