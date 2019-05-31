const PATHS = require('../paths');

module.exports = ({ limit = 10000 } = {}) => ({
  test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
  loader: 'url-loader',
  options: { name: 'images/[name].[ext]', limit },
  include: PATHS.app
});

