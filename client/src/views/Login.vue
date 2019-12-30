<template>
    <v-container fill-height>
        <v-row align-content="center">
            <v-col>
                <h1>Login</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <ValidationObserver
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
                            >Login</v-btn
                        >
                    </v-form>
                </ValidationObserver>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
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
    methods: {
        onSubmit() {
            alert("Submitted");
        }
    }
};
</script>
