import { required, email, max, min, regex } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
    ...required,
    message: "This field is required"
});

extend("max", {
    ...max,
    message: "This field must be {length} characters or less"
});

extend("min", {
    ...min
});

extend("regex", {
    ...regex
});
extend("email", {
    ...email,
    message: "This field must be a valid email"
});
