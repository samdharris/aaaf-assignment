export default {
    /**
     * Flag used to indicate when we're submitting the user form.
     */
    submitting: false,
    /**
     * all documents associated with the currently viewed team
     */
    documents: [],
    /**
     * Flag used to indicate when we're loading something from the server.
     */
    loading: false,
    /**
     * Stores server side validation error messages.
     */
    errors: {}
};
