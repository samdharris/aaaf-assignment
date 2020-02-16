<template>
    <v-container fill-height>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        <span class="headline">
                            <span v-if="isEditMode">Update</span>
                            <span v-else>Add</span>
                            a Team</span
                        >
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
                                        v-model="formData.name"
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
                                >
                                    <span v-if="isEditMode">Update</span>
                                    <span v-else>Create</span>
                                    Team
                                </v-btn>
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
import _ from "lodash";
export default {
    props: {
        teamToEdit: {
            type: Object,
            default: () => {}
        },
        isEditMode: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formData: {
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
            createTeam: "teams/createTeam",
            updateTeam: "teams/updateTeam"
        }),
        async onSubmit() {
            let success = false;
            if (!this.isEditMode) {
                success = await this.createTeam(this.formData);
            } else {
                success = await this.updateTeam(this.formData);
            }
            if (success) {
                this.formData.name = "";
                this.$refs.newTeamForm.reset();
                this.$emit("closeNewTeamForm", true);
            }
        }
    },
    watch: {
        errors: {
            handler(value) {
                this.$refs.newTeamForm.setErrors(value);
            }
        }
    },
    mounted() {
        if (!_.isEmpty(this.teamToEdit)) {
            this.formData = {
                name: this.teamToEdit.name
            };
        }
    },
    updated() {
        if (!_.isEmpty(this.teamToEdit)) {
            this.formData = {
                name: this.teamToEdit.name
            };
        }
    }
};
</script>
