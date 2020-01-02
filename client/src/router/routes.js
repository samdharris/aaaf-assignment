import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Teams from "../views/Teams.vue";
import TeamDetail from "../views/TeamDetail.vue";
import NotFound from "../views/NotFound.vue";

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
        path: "*",
        component: NotFound,
        meta: {
            requiresAuth: false,
            visitWithAuth: true
        }
    }
];

export default routes;
