import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

import store from "../store";

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

    const routeRequiresAdminRights = to.matched.some(
        record => record.meta.requiresAdminRights
    );

    const routeCanBeViewedWhenLoggedIn = to.matched.some(
        record => record.meta.visitWithAuth
    );

    if (
        routeRequiresAuth &&
        userAuthenticated === false &&
        from.path !== "/login"
    ) {
        next({
            path: "/login"
        });
        return;
    } else if (userAuthenticated && routeCanBeViewedWhenLoggedIn === false) {
        next({
            path: "/"
        });
        return;
    } else if (
        userAuthenticated &&
        routeRequiresAdminRights &&
        !store.state.auth.currentUser.isAdmin
    ) {
        next({
            path: "/not-found"
        });
    } else {
        next();
    }
});

export default router;
