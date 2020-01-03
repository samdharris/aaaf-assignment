export default {
    /**
     * Contains a list of all site users
     */
    users: [],
    /**
     * Flag used to indicate when we're loading something from the server.
     */
    loading: false,
    /**
     * Flag used to indicate when we're submitting the user form.
     */
    submitting: false,
    /**
     * Stores server side validation error messages.
     */
    errors: {},
    /**
     * Stores the currently active user.
     */
    user: {}
};
