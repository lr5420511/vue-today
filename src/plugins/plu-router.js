import Vue from 'vue';
import VueRouter from 'vue-router';

import PageMain from '../views/page-main.vue';
import PageDefault from '../views/page-default.vue';
import PageNews from '../views/page-news.vue';
import PageSearch from '../views/page-search.vue';
import PageHistory from '../views/page-history.vue';
import PageResult from '../views/page-result.vue';
import PageObserver from '../views/page-observer.vue';

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
        },
        {
            path: '/search',
            component: PageSearch,
            children: [
                {
                    path: '',
                    redirect: 'history'
                },
                {
                    path: 'history',
                    component: PageHistory
                },
                {
                    path: 'result/:city',
                    component: PageResult
                }
            ]
        },
        {
            path: '/observer/:url/:comment/:date',
            component: PageObserver
        }
    ]
});