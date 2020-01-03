import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Teams from "../views/teams/Teams.vue";
import TeamDetail from "../views/teams/TeamDetail.vue";
import NotFound from "../views/NotFound.vue";

import Users from "../views/users/Users.vue";
import UserDetail from "../views/users/UserDetail.vue";

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
    },
    {
        path: "/teams",
        component: Teams,
        meta: {
            requiresAuth: true,
            visitWithAuth: true
        }
    },
    {
        path: "/teams/:teamId",
        component: TeamDetail,
        meta: {
            requiresAuth: true,
            visitWithAuth: true
        }
    },
    {
        path: "/users",
        component: Users,
        meta: {
            requiresAuth: true,
            visitWithAuth: true
        }
    },
    {
        path: "/users/:userId",
        component: UserDetail,
        meta: {
            requiresAuth: true,
            visitWithAuth: true
        }
    },
    {
        path: "*",
        component: NotFound,
        meta: {
            requiresAuth: false,
            visitWithAuth: true
        }
    }
];

export default routes;
