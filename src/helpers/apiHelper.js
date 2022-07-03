const apiHost = 'https://registry.npmjs.org';
const npmHost = 'https://www.npmjs.com';

export const getSuggestions = async searchText => {
  const response = await fetch(
    `${npmHost}/search/suggestions?q=${searchText}`,
  ).then(v => v.json());
  return response;
};

export const getPackageDistTags = async packageName => {
  const response = await fetch(
    `${apiHost}/-/package/${packageName}/dist-tags`,
  ).then(v => v.json());
  return response;
};

export const getPackageAllTags = async packageName => {
  const response = await fetch(`${apiHost}/${packageName}`).then(v => v.json());
  return response;
};
