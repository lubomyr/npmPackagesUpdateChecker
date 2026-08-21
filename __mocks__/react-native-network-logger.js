// The real module pulls in RN's FileReader, which needs a native binary.
const React = require('react');

module.exports = {
  __esModule: true,
  default: () => React.createElement('NetworkLogger'),
  startNetworkLogging: () => {},
  stopNetworkLogging: () => {},
  getBackHandler: () => () => {},
};
