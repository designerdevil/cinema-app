const devConfig = require('../config/dev-config.json');
const prodConfig = require('../config/prod-config.json');

export default () => {
    const ENV = process.env.NODE_ENV.trim().toLowerCase();
    return ENV === 'development' ? devConfig : prodConfig;
};
