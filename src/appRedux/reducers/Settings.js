import { WINDOW_WIDTH } from "../Actions/constants";

import {
  LAYOUT_TYPE,
  LAYOUT_TYPE_FULL,
  NAV_STYLE,
  NAV_STYLE_FIXED,
  THEME_COLOR,
  THEME_TYPE,
  THEME_TYPE_SEMI_DARK,
  THEME_TYPE_LITE,
} from "../Actions/ThemeSetting";

const initialSettings = {
  navStyle: NAV_STYLE_FIXED,
  layoutType: LAYOUT_TYPE_FULL,
  themeType: THEME_TYPE_LITE,
  themeColor: THEME_COLOR,
  width: window.innerWidth,
  isDirectionRTL: false,
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    case THEME_TYPE:
      return {
        ...state,
        themeType: action.themeType
      };
    case THEME_COLOR:
      // console.log("yes", action.themeColor);
      return {
        ...state,
        themeColor: action.themeColor
      };
    case NAV_STYLE:
      return {
        ...state,
        navStyle: action.navStyle
      };
    case LAYOUT_TYPE:
      return {
        ...state,
        layoutType: action.layoutType
      };

    default:
      return state;
  }
};

export default settings;
