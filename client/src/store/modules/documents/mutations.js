import { SET_SUBMITTING } from "./document-types";

export default {
    [SET_SUBMITTING](state, submitting) {
        state.submitting = submitting;
    },
    [SET_LOADING](state, loading) {
        state.loading = loading;
    },
    [SET_DOCUMENTS](state, documents) {
        state.documents = [...documents];
    },
    }
};
