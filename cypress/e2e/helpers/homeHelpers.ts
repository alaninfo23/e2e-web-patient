export const BUTTON_OPEN_MENU_ICON: string = "OPEN_MENU_ICON";
export const BUTTON_OPEN_LOG_OUT_OPTION: string = "LOG_OUT_OPTION";
export const BUTTON_SURVEY_CARD = (name: string): string => {
  return `h5.MuiTypography-h5:contains("${name}")`;
};
export const BUTTON_USER_PROFILE: string = "div.MuiBox-root button div.MuiAvatar-root";