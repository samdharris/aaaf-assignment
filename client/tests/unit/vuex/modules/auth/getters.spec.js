import getters from "../../../../../src/store/modules/auth/getters";

describe("auth getters", () => {
    describe("isAuthenticated", () => {
        it("isAuthenticated is true when current user is set", () => {});

        it("isAuthenticated is false when no user is set", () => {
            const state = {
                currentUser: {}
            };

            expect(getters.isAuthenticated(state)).toBeFalsy();
        });
    });
});
