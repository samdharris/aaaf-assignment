import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Teams from "../views/teams/Teams.vue";
import TeamDetail from "../views/teams/TeamDetail.vue";
import NotFound from "../views/NotFound.vue";

import Users from "../views/users/Users.vue";
import UserDetail from "../views/users/UserDetail.vue";

import DocumentDetail from "../views/documents/DocumentDetail.vue";

/**
 * Vue routes
 */
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
        path: "/login",
        component: Login,
        meta: {
            requiresAuth: false,
            visitWithAuth: false,
            requiresAdminRights: false
        }
    },
    {
        path: "/teams",
        component: Teams,
        meta: {
            requiresAuth: true,
            visitWithAuth: true,
            requiresAdminRights: true
        }
    },
    {
        path: "/teams/:teamId",
        component: TeamDetail,
        meta: {
            requiresAuth: true,
            visitWithAuth: true,
            requiresAdminRights: false
        }
    },
    {
        path: "/users",
        component: Users,
        meta: {
            requiresAuth: true,
            visitWithAuth: true,
            requiresAdminRights: true
        }
    },
    {
        path: "/users/:userId",
        component: UserDetail,
        meta: {
            requiresAuth: true,
            visitWithAuth: true,
            requiresAdminRights: false
        }
    },
    {
        path: "/documents/:documentId",
        component: DocumentDetail,
        meta: {
            requiresAuth: true,
            visitWithAuth: true,
            requiresAdminRights: false
        }
    },
    {
        path: "*",
        component: NotFound,
        meta: {
            requiresAuth: false,
            visitWithAuth: true,
            requiresAdminRights: false
        }
    }
];

export default routes;
