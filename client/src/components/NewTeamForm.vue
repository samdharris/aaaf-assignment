<template>
    <v-container fill-height>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        <span class="headline">Add a Team</span>
                    </v-card-title>
                    <v-card-text>
                        <ValidationObserver
                            ref="newTeamForm"
                            v-slot="{ invalid, validated, passes, validate }"
                        >
                            <v-form>
                                <ValidationProvider
                                    name="name"
                                    :rules="{
                                        required: true,
                                        min: 6,
                                        max: 50,
                                        regex: /^[a-zA-Z0-9 ]{0,50}$/
                                    }"
                                    v-slot="{ errors, valid }"
                                >
                                    <v-text-field
                                        v-bind="$attrs"
                                        v-model="team.name"
                                        :error-messages="errors"
                                        :success="valid"
                                        id="name"
                                        name="name"
                                        label="Team Name"
                                    ></v-text-field>
                                </ValidationProvider>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="passes(onSubmit)"
                                    color="success"
                                    :disabled="invalid && validated"
                                    :loading="submitting"
                                    >Create Team</v-btn
                                >
                            </v-form>
                        </ValidationObserver>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            team: {
                name: ""
            }
        };
    },
    computed: mapState({
        submitting: state => state.teams.submitting,
        errors: state => state.teams.errors
    }),
    methods: {
        ...mapActions({
            createTeam: "teams/createTeam"
        }),
        onSubmit() {
            this.createTeam(this.team);
            this.team.name = "";
            this.$refs.newTeamForm.reset();
            this.$emit("closeNewTeamForm", true);
        }
    },
    watch: {
        errors: {
            handler(value) {
                this.$refs.newTeamForm.setErrors(value);
            }
        }
    }
};
</script>
