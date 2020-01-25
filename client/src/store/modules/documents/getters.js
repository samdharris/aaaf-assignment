import _ from "lodash";
import { getUserId } from "../../../util/authHelper";

export default {
    documentIsCheckedOut: (state, getters) => {
        return !_.isNil(getters.latestVersion.checkedOutBy);
    },
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
    canEditDocument: (state, getters) => {
        return getters.latestVersion.checkedOutBy === getUserId();
    }
};
