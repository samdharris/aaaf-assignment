import mutations from "../../../../../src/store/modules/teams/mutations";

describe("teams module", () => {
    it("SET_TEAMS", () => {
        const state = { teams: [] };

        const teams = [
            {
                name: "Team A"
            },
            {
                name: "Team B"
            },
            {
                name: "Team C"
            }
        ];
        mutations.SET_TEAMS(state, teams);

        expect(state.teams).toHaveLength(teams.length);
        expect(state.teams).toEqual(expect.arrayContaining(teams));
    });

    it("SET_LOADING", () => {
        const state = { isLoading: false };
        mutations.SET_LOADING(state, true);
        expect(state.isLoading).toBeTruthy();
    });

    it("SET_SUBMITTING", () => {
        const state = { submitting: false };
        mutations.SET_SUBMITTING(state, true);
        expect(state.submitting).toBeTruthy();
    });

    it("ADD_TEAM", () => {
        const state = {
            teams: [
                {
                    name: "Team A"
                }
            ]
        };

        const team = { name: "Team B" };

        mutations.ADD_TEAM(state, team);
        expect(state.teams).toHaveLength(2);
        expect(state.teams).toContain(team);
    });
});
