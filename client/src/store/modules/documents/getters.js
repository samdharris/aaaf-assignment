import _ from "lodash";
import { getUserId } from "../../../util/authHelper";

export default {
    /**
     * Checks if the current document is checked out
     *
     * @param {object} state
     * @param {object} getters
     * @returns bool
     */
    documentIsCheckedOut: (state, getters) => {
        return !_.isNil(getters.latestVersion.checkedOutBy);
    },
    /**
     * Gets the latest version of a document
     *
     * @param {object} state
     * @returns object
     */
    latestVersion: state => {
        if (_.isNil(state.document.versions)) {
            return {};
        }

        const numVersions = state.document.versions.length;
        if (numVersions < 1) {
            return {};
        }

        /**
         * The last item in the versions array will be the most recent version of the document.
         */
        return state.document.versions[numVersions - 1];
    },
    /**
     * Checks if we can edit the current version of the document
     *
     * @param {object} state
     * @param {object} getters
     * @returns bool
     */
    canEditDocument: (state, getters) => {
        return getters.latestVersion.checkedOutBy._id === getUserId();
    }
};
