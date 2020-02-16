import { SET_SNACKBAR, RESET_SNACKBAR } from "./general-types";
export default {
    /**
     * Setup the snackbar with the given config
     * @param {object} state
     * @param {object} config
     */
    [SET_SNACKBAR](state, config) {
        state.snackbar = { ...config };
    },
    /**
     * Reset the snackbar state to its default config
     * @param {object} state
     */
    [RESET_SNACKBAR](state) {
        const defaultConfig = { text: "", color: "", open: false };
        state.snackbar = { ...defaultConfig };
    }
};
