import { SET_SNACKBAR, RESET_SNACKBAR } from "./general-types";
export default {
    [SET_SNACKBAR](state, config) {
        state.snackbar = { ...config };
    },
    [RESET_SNACKBAR](state) {
        const defaultConfig = { text: "", color: "", open: false };
        state.snackbar = { ...defaultConfig };
    }
};
