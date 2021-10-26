const apiHost = 'https://registry.npmjs.org';

export const getPackageDistTags = async packageName => {
  const response = await fetch(
    `${apiHost}/-/package/${packageName}/dist-tags`,
  ).then(response => response.json());
  return response;
};

export const getPackageAllTags = async packageName => {
  const response = await fetch(
    `${apiHost}/${packageName}`,
  ).then(response => response.json());
  return response;
};
