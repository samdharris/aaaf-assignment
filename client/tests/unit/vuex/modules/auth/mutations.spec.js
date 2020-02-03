import mutations from "../../../../../src/store/modules/auth/mutations";

describe("auth mutations", () => {
    it("SET_AUTHENTICATING", () => {
        const state = {
            isAuthenticating: false
        };

        mutations["SET_AUTHENTICATING"](state, true);

        expect(state.isAuthenticating).toBeTruthy();
    });

    it("SET_ERRORS", () => {
        const state = {
            errors: {}
        };

        mutations["SET_ERRORS"](state, {
            message: "Something went horribly wrong"
        });

        expect(state.errors).toHaveProperty("message");
        expect(state.errors.message).toBe("Something went horribly wrong");
    });

    it("SET_CURRENT_USER", () => {
        const state = {
            currentUser: {}
        };

        const user = {
            id: 1,
            name: "Bob Fred"
        };
        mutations["SET_CURRENT_USER"](state, user);

        expect(state.currentUser).toMatchObject(user);
    });
});
