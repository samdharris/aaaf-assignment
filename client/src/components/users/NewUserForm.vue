<template>
    <v-container fill-height>
        <v-row>
            <v-col>
                <v-card>
                    <v-toolbar color="primary" light>
                        <v-toolbar-title class="white--text">
                            <span v-if="editMode">Update</span>
                            <span v-else>Add</span>
                            User
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver
                            ref="newUserForm"
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
                                        label="Name"
                                    ></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider
                                    name="email"
                                    rules="required|email"
                                    v-slot="{ errors, valid }"
                                >
                                    <v-text-field
                                        v-bind="$attrs"
                                        v-model="formData.email"
                                        type="email"
                                        :error-messages="errors"
                                        :success="valid"
                                        id="email"
                                        name="email"
                                        label="email"
                                    ></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider
                                    name="password"
                                    :rules="{ required: !editMode }"
                                    v-slot="{ errors, valid }"
                                >
                                    <v-text-field
                                        required
                                        persistent-hint
                                        :hint="
                                            editMode
                                                ? 'Leave blank to keep your current password'
                                                : ''
                                        "
                                        :error-messages="errors"
                                        :success="valid"
                                        v-model="formData.password"
                                        label="Password"
                                        type="password"
                                    ></v-text-field>
                                </ValidationProvider>
                                <v-switch
                                    v-show="
                                        userToEdit && userId !== userToEdit._id
                                    "
                                    v-model="formData.enabled"
                                    label="Enable User?"
                                ></v-switch>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="passes(onSubmit)"
                                    color="success"
                                    :disabled="invalid && validated"
                                    :loading="submitting"
                                >
                                    <span v-if="editMode">Update User</span>
                                    <span v-else>Create User</span>
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
export default {
    props: {
        editMode: {
            type: Boolean,
            default: false
        },
        userToEdit: {
            type: Object,
            default: () => {}
        },
        userId: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            formData: {
                name: "",
                email: "",
                password: "password123456",
                enabled: false
            }
        };
    },
    computed: mapState({
        submitting: state => state.users.submitting,
        errors: state => state.users.errors
    }),
    methods: {
        ...mapActions({
            createUser: "users/createUser",
            updateUser: "users/updateUser"
        }),
        async onSubmit() {
            let success = false;
            if (this.editMode) {
                success = await this.updateUser(this.formData);
            } else {
                success = await this.createUser(this.formData);
            }

            if (success) {
                this.formData = {
                    name: this.editMode ? this.userToEdit.name : "",
                    email: this.editMode ? this.userToEdit.email : "",
                    password: this.editMode ? "" : "password123456",
                    enabled: this.editMode ? this.userToEdit.enabled : false
                };
                this.$refs.newUserForm.reset();
                this.$emit("closeNewUserForm", true);
            }
        }
    },
    watch: {
        errors: {
            handler(value) {
                this.$refs.newUserForm.setErrors(value);
            }
        }
    },
    mounted() {
        if (this.editMode) {
            this.formData = {
                name: this.userToEdit.name,
                email: this.userToEdit.email,
                enabled: this.userToEdit.enabled
            };
        }
    }
};
</script>
