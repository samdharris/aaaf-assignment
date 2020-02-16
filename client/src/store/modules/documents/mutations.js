import {
    SET_SUBMITTING,
    ADD_DOCUMENT,
    REMOVE_DOCUMENT,
    UPDATE_DOCUMENT,
    SET_LOADING,
    SET_DOCUMENTS,
    SET_ERRORS,
    SET_DOCUMENT,
    CHECKOUT_DOCUMENT,
    CHECKIN_DOCUMENT
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
    [SET_DOCUMENT](state, document) {
        state.document = { ...document };
    },
    [SET_ERRORS](state, errors) {
        state.errors = { ...errors };
    },
    [ADD_DOCUMENT](state, document) {
        state.documents.push(document);
    },
    [REMOVE_DOCUMENT](state, id) {
        state.documents = [
            ...state.documents.filter(document => document._id !== id)
        ];
        state.document = {};
    },
    [UPDATE_DOCUMENT](state, doc) {
        state.documents = [
            ...state.documents.filter(document => document._id !== doc._id),
            doc
        ];

        state.document = { ...doc };
    },
    [CHECKOUT_DOCUMENT](state, version) {
        state.document.versions = [
            ...state.document.versions.filter(v => v._id !== version._id),
            version
        ];
    },
    [CHECKIN_DOCUMENT](state, version) {
        state.document.versions = [
            ...state.document.versions.filter(v => v._id !== version._id),
            version
        ];
    }
};
