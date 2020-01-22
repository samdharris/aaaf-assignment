import {
    SET_SUBMITTING,
    ADD_DOCUMENT,
    SET_LOADING,
    SET_DOCUMENTS,
    SET_ERRORS,
    SET_DOCUMENT
} from "./document-types";
import axios from "../../../util/axios";
import { showSnackbar } from "../../helpers";
import router from "../../../router";
export default {
    getDocuments: async (ctx, teamId) => {
        localStorage.setItem("team", teamId);
        console.log(teamId);
        try {
            ctx.commit(SET_LOADING, true);
            const { data } = await axios.get(`/api/teams/${teamId}/documents`);
            console.log(data);
            ctx.commit(SET_DOCUMENTS, data.documents);
        } catch (error) {
            throw error;
        } finally {
            ctx.commit(SET_LOADING, false);
        }
    },
    getDocument: async (ctx, documentId) => {
        try {
            ctx.commit(SET_LOADING, true);
            console.log(ctx.state);
            const { data } = await axios.get(
                `/api/teams/${localStorage.getItem(
                    "team"
                )}/documents/${documentId}`
            );
            ctx.commit(SET_DOCUMENT, data.document);
        } catch (error) {
            throw error;
        } finally {
            ctx.commit(SET_LOADING, false);
        }
    },
    uploadDocument: async (ctx, { document, teamId }) => {
        console.log(teamId);
        console.log(document);
        try {
            ctx.commit(SET_SUBMITTING, true);

            const formData = new FormData();
            formData.append("document", document);

            const { data } = await axios.post(
                `/api/teams/${teamId}/documents`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            ctx.commit(ADD_DOCUMENT, data.document);
            showSnackbar("Document added!", "success");
            return true;
        } catch (error) {
            ctx.commit(SET_ERRORS, error.response.data);
            return false;
        } finally {
            ctx.commit(SET_SUBMITTING, false);
        }
    },
    deleteDocument: async (ctx, documentId) => {
        try {
            await axios.delete(
                `/api/teams/${localStorage.getItem(
                    "team"
                )}/documents/${documentId}`
            );
            router.push("/");
            showSnackbar("Document removed!", "success");
        } catch (error) {
            throw error;
        }
    }
};
