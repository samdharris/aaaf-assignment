<template>
    <v-container fill-height>
        <v-row>
            <v-col>
                <v-card>
                    <v-toolbar color="primary" light>
                        <v-toolbar-title>
                            Add a User
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
                                        v-model="user.name"
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
                                        v-model="user.email"
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
                                    rules="required"
                                    v-slot="{ errors, valid }"
                                >
                                    <v-text-field
                                        required
                                        :error-messages="errors"
                                        :success="valid"
                                        v-model="user.password"
                                        label="Password"
                                        type="password"
                                    ></v-text-field>
                                </ValidationProvider>
                                <v-switch
                                    v-model="user.enabled"
                                    label="Enable User?"
                                ></v-switch>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="passes(onSubmit)"
                                    color="success"
                                    :disabled="invalid && validated"
                                    :loading="submitting"
                                    >Create User</v-btn
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
            user: {
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
            createUser: "users/createUser"
        }),
        async onSubmit() {
            const userCreated = await this.createUser(this.user);
            if (userCreated) {
                this.user = {
                    name: "",
                    email: "",
                    password: "password123456",
                    enabled: false
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
    }
};
</script>
