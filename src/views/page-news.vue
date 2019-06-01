<template>
    <lay-series :displayTitle="displayTitle"
                @emitLoadMore="loadMore"
                @emitRefresh="refresh">
        <ser-news :news="todayNews"
        ></ser-news>
    </lay-series>
</template>

<script>
import ServiceNews from '../components/services/service-news.vue';
import LayoutSeries from '../components/layouts/layout-series.vue';
import jsonp from '../utils/domain-request';
import { NEWS } from '../config';

const { URL, CATEGORIES, DEFAULT, COUNT } = NEWS;

export default {
    components: {
        'ser-news': ServiceNews,
        'lay-series': LayoutSeries
    },
    data: () => ({
        displayTitle: '今日热点新闻',
        todayNews: [],
        curCategore: CATEGORIES[DEFAULT]
    }),
    methods: {
        randomCategore: function() {
            const len = CATEGORIES.length;
            return CATEGORIES[Math.floor(Math.random() * len)];
        },
        joinUrl: function(categore, start) {
            return [URL, categore, `${start}-${COUNT}.html`].join('/');
        },
        requestNews: async function(start) {
            let news;
            try {
                news = await jsonp({
                    url: this.joinUrl(this.curCategore, start),
                    query: {},
                    cacheMode: false,
                    timeout: 10000,
                    proxy: 'artiList'
                });
            } catch(err) {
                if(!err.forecastable) throw err;
                return;
            }
            return news[this.curCategore].map(cur => ({
                id: cur.docid,
                title: cur.title,
                scene: cur.imgsrc,
                summary: cur.digest,
                source: cur.source,
                times: Date.parse(cur.ptime)
            }));

        },
        loadMore: async function(loadCount, lay) {
            const news = await this.requestNews(loadCount * COUNT);
            this.todayNews.push(...news);
            lay.reset();
        },
        refresh: async function(lay) {
            this.curCategore = this.randomCategore();
            const news = await this.requestNews(0);
            this.todayNews.splice(0, this.todayNews.length, ...news);
            lay.reset();
        }
    },
    mounted: async function() {
        const news = await this.requestNews(0);
        this.todayNews.push(...news);
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);
</style>
