export const TAB_SELECTED_INDEX = 'ui/TAB_SELECTED_INDEX';
export const TOGGLE_LOADING = 'ui/TOGGLE_LOADING';

export const setTabSelectedIndex = payload => ({
  type: TAB_SELECTED_INDEX,
  payload,
});

export const toggleLoading = () => ({
  type: TOGGLE_LOADING,
});
