<template>
    <v-container fill-height>
        <v-row>
            <v-col>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title
                            >Login to {{ appName }}</v-toolbar-title
                        >
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver
                            ref="form"
                            v-slot="{ invalid, validated, passes, validate }"
                        >
                            <v-form>
                                <ValidationProvider
                                    name="email"
                                    rules="required|email"
                                    v-slot="{ errors, valid }"
                                >
                                    <v-text-field
                                        v-bind="$attrs"
                                        v-model="loginData.email"
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
                                        v-model="loginData.password"
                                        label="Password"
                                        type="password"
                                    ></v-text-field>
                                </ValidationProvider>
                                <v-btn
                                    color="success"
                                    @click="passes(onSubmit)"
                                    :disabled="invalid && validated"
                                    :loading="isAuthenticating"
                                    >Login</v-btn
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
    name: "login",
    data() {
        return {
            loginData: {
                email: "",
                password: ""
            }
        };
    },
    computed: mapState({
        isAuthenticating: state => state.auth.isAuthenticating,
        errors: state => state.auth.errors,
        appName: state => state.general.appName
    }),
    methods: {
        ...mapActions({
            login: "auth/login"
        }),
        onSubmit() {
            this.login(this.loginData);
        }
    },
    watch: {
        errors: {
            handler(value) {
                this.$refs.form.setErrors(value);
            }
        }
    }
};
</script>
