import {
    SET_SUBMITTING,
    ADD_DOCUMENT,
    REMOVE_DOCUMENT,
    UPDATE_DOCUMENT,
    SET_LOADING,
    SET_DOCUMENTS
} from "./document-types";

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
    [ADD_DOCUMENT](state, document) {
        state.documents.push(document);
    },
    [REMOVE_DOCUMENT](state, id) {
        state.documents = [
            ...state.documents.filter(document => document._id !== id)
        ];
    },
    [UPDATE_DOCUMENT](state, doc) {
        state.documents = [
            ...state.documents.filter(document => document._id !== doc._id),
            doc
        ];
    }
};
