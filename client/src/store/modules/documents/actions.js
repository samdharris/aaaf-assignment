import {
    SET_SUBMITTING,
    ADD_DOCUMENT,
    SET_LOADING,
    SET_DOCUMENTS,
    SET_ERRORS,
    SET_DOCUMENT,
    CHECKOUT_DOCUMENT,
    CHECKIN_DOCUMENT,
    REMOVE_DOCUMENT,
    UPDATE_DOCUMENT
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
            showSnackbar(
                `Something went wrong getting documents: ${error.response.data.message}`,
                "error"
            );
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
            showSnackbar(
                `Something went wrong getting document details: ${error.response.data.message}`,
                "error"
            );
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
            const team = localStorage.getItem("team");
            await axios.delete(`/api/teams/${team}/documents/${documentId}`);
            ctx.commit(REMOVE_DOCUMENT, documentId);
            router.push(`/teams/${team}`);
            showSnackbar("Document removed!", "success");
        } catch (error) {
            console.error(error);
            showSnackbar(
                `Something went wrong deleting the document: ${error.response.data.message}`,
                "error"
            );
        }
    },
    checkoutDocument: async (ctx, documentId) => {
        try {
            const { data } = await axios.put(
                `/api/teams/${localStorage.getItem(
                    "team"
                )}/documents/${documentId}/checkout`
            );
            ctx.commit(CHECKOUT_DOCUMENT, data.version);
            showSnackbar("Document checked out!", "success");
        } catch (error) {
            showSnackbar(
                `Something went wrong checking out ${error.response.data.message}`,
                "error"
            );
        }
    },
    checkinDocument: async (ctx, documentId) => {
        try {
            const { data } = await axios.put(
                `/api/teams/${localStorage.getItem(
                    "team"
                )}/documents/${documentId}/checkin`
            );
            ctx.commit(CHECKIN_DOCUMENT, data.version);
            showSnackbar("Document checked in!", "success");
        } catch (error) {
            showSnackbar(
                `Something went wrong checking in ${error.response.data.message}`,
                "error"
            );
        }
    },
    editDocument: async (ctx, { documentId, document }) => {
        try {
            ctx.commit(SET_SUBMITTING, true);
            const formData = new FormData();
            formData.append("document", document);

            const { data } = await axios.put(
                `/api/teams/${localStorage.getItem(
                    "team"
                )}/documents/${documentId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            ctx.commit(UPDATE_DOCUMENT, data.document);
            showSnackbar("Document updated!", "success");
            return true;
        } catch (error) {
            console.error(error);
            showSnackbar(
                `something went wrong editing document: ${error.message}`,
                "error"
            );
            return false;
        } finally {
            ctx.commit(SET_SUBMITTING, false);
        }
    }
};
