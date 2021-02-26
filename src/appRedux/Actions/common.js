import { ON_SHOW_LOADER, ON_HIDE_LOADER,ON_HIDE_MODAL,ON_SHOW_MODAL } from "./constants"
export const hideAuthLoader = () => {
    return {
      type: ON_HIDE_LOADER,
    };
  };

  export const showAuthLoader = () => {
    return {
      type: ON_SHOW_LOADER,
    };
  };
  
  export const hideModal = () => {
    return {
      type: ON_HIDE_MODAL,
    };
  };

  export const showModal = () => {
    return {
      type: ON_SHOW_MODAL,
    };
  };
