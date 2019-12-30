import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

import { isAuthenticated } from "../util/authHelper";
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const userAuthenticated = isAuthenticated();
    const routeRequiresAuth = to.matched.some(
        record => record.meta.requiresAuth
    );
    const routeCanBeViewedWhenLoggedIn = to.matched.some(
        record => record.meta.visitWithAuth
    );

    console.log(`User authenticated: ${userAuthenticated}`);
    console.log(`routeRequiresAuth: ${routeRequiresAuth}`);
    console.log(
        `routeCanBeViewedWhenLoggedIn: ${routeCanBeViewedWhenLoggedIn}`
    );
    if (routeRequiresAuth && userAuthenticated === false) {
        next({
            path: "/login"
        });
        return;
    } else if (userAuthenticated && routeCanBeViewedWhenLoggedIn === false) {
        next({
            path: "/"
        });
        return;
    } else {
        next();
    }
});

export default router;
