import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Language from "../views/Language.vue";
import About from "../views/About.vue";
import Publication from "../views/Publication.vue";
import People from "../views/People.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: Home,
        },
        {
            name: "language",
            path: "/language",
            component: Language
        },
        {
            name: "about",
            path: "/about",
            component: About
        },
        {
            name: "publication",
            path: "/publication",
            component: Publication
        }, 
        {
            name: "people",
            path: "/people",
            component: People
        }
    ]
});