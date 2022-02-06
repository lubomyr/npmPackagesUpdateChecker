let refreshMainScreenCallback = () => null;

export const setRefreshMainScreenCallback = callback => {
  refreshMainScreenCallback = callback;
};

export const applyRefreshMainScreenCallback = () => {
  refreshMainScreenCallback();
};
