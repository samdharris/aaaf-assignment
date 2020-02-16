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
    /**
     * Sets the submitting flag
     * @param {object} state
     * @param {bool} submitting
     */
    [SET_SUBMITTING](state, submitting) {
        state.submitting = submitting;
    },
    /**
     * Sets the loading flag
     * @param {object} state
     * @param {bool} loading
     */
    [SET_LOADING](state, loading) {
        state.loading = loading;
    },
    /**
     * Sets documents
     * @param {object} state
     * @param {array} documents
     */
    [SET_DOCUMENTS](state, documents) {
        state.documents = [...documents];
    },
    /**
     * Sets the currently viewed document
     * @param {object} state
     * @param {object} document
     */
    [SET_DOCUMENT](state, document) {
        state.document = { ...document };
    },
    /**
     * Sets any errors to show to the user
     * @param {object} state
     * @param {object} errors
     */
    [SET_ERRORS](state, errors) {
        state.errors = { ...errors };
    },
    /**
     * Add a newly created document to state
     * @param {object} state
     * @param {object} document
     */
    [ADD_DOCUMENT](state, document) {
        state.documents.push(document);
    },
    /**
     * Remove the given document from state
     * @param {object} state
     * @param {string} id
     */
    [REMOVE_DOCUMENT](state, id) {
        state.documents = [
            ...state.documents.filter(document => document._id !== id)
        ];
        state.document = {};
    },
    /**
     * Update a given document
     * @param {object} state
     * @param {object} doc
     */
    [UPDATE_DOCUMENT](state, doc) {
        state.documents = [
            ...state.documents.filter(document => document._id !== doc._id),
            doc
        ];

        state.document = { ...doc };
    },
    /**
     * Checkout a given version of the current document
     * @param {object} state
     * @param {object} version
     */
    [CHECKOUT_DOCUMENT](state, version) {
        state.document.versions = [
            ...state.document.versions.filter(v => v._id !== version._id),
            version
        ];
    },
    /**
     * Checkin a given version of the current document
     * @param {object} state
     * @param {object} version
     */
    [CHECKIN_DOCUMENT](state, version) {
        state.document.versions = [
            ...state.document.versions.filter(v => v._id !== version._id),
            version
        ];
    }
};
