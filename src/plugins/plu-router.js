import Vue from 'vue';
import VueRouter from 'vue-router';

import PageMain from '../views/page-main.vue';
import PageDefault from '../views/page-default.vue';
import PageNews from '../views/page-news.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/main',
            component: PageMain,
            children: [
                {
                    path: '',
                    redirect: 'default'
                },
                {
                    path: 'default',
                    component: PageDefault
                },
                {
                    path: 'news',
                    component: PageNews
                }
            ]
        }
    ]
});