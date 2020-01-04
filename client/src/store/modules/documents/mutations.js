import { SET_SUBMITTING } from "./document-types";

export default {
    [SET_SUBMITTING](state, submitting) {
        state.submitting = submitting;
    }
};
