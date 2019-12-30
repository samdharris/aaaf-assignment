import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

import { isAuthenticated } from "../util/authHelper";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home,
        meta: {
            requiresAuth: true,
            visitWithAuth: true
        }
    },
    {
        path: "/about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/login",
        component: Login,
        meta: {
            requiresAuth: false,
            visitWithAuth: false
        }
    }
];

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

    console.log(routeRequiresAuth);
    if (routeRequiresAuth && !userAuthenticated) {
        next({
            path: "/login"
        });
        return;
    }
    console.log(`authenticated: ${userAuthenticated}`);
    console.log(
        `can view page when logged in: ${routeCanBeViewedWhenLoggedIn}`
    );
    if (userAuthenticated && !routeCanBeViewedWhenLoggedIn) {
        next({
            path: "/"
        });
        return;
    }

    next();
});

export default router;
