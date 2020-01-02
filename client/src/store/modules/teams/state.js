export default {
    /**
     * Stores all the teams in the system
     */
    teams: [],
    /**
     * Flag used to indicate when we're loading something from the server.
     */
    loading: false,
    /**
     * Flag used to indicate when we're submitting the team form.
     */
    submitting: false,
    /**
     * Stores server side validation error messages.
     */
    errors: {},
    /**
     * The current team that's being shown on TeamDetail.vue.
     */
    team: {}
};
