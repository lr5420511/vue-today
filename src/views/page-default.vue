<template>
    <lay-default :titleOpacity="headOpacity">
        <template slot="title">
            <ser-search class="page-default-search"
                        :realWidth="searchWidth"
                        :displayText="searchText"
                        @emitFocusIn="searchFocusInHook"
            ></ser-search>
        </template>
        <ser-play :playHeight="playHeight"
                  :playScenes="playScenes"
                  @emitPlayClick="playClickHook"
        ></ser-play>
        <lay-series class="page-default-weathers"
                    :displayTitle="weatherTitle">
            <ser-weathers :weathers="weathers"
            ></ser-weathers>
        </lay-series>
    </lay-default>
</template>

<script>
import jsonp from '../utils/domain-request';
import LayoutDefault from '../components/layouts/layout-default.vue';
import LayoutSeries from '../components/layouts/layout-series.vue';
import ServiceSearch from '../components/services/service-search.vue';
import ServicePlay from '../components/services/service-play.vue';
import ServiceWeathers from '../components/services/service-weathers.vue';
import { PLAY_URL, LOCALE_URL, WEATHER_URL } from '../config';

export default {
    components: {
        'lay-default': LayoutDefault,
        'lay-series': LayoutSeries,
        'ser-search': ServiceSearch,
        'ser-play': ServicePlay,
        'ser-weathers': ServiceWeathers
    },
    data: () => ({
        headOpacity: 0.5,
        searchWidth: 7.5,
        searchText: '键入城市名称以便搜索',
        playHeight: 7.5,
        playScenes: [
            { id: 1, source: null },
            { id: 2, source: null },
            { id: 3, source: null }
        ],
        locale: null,
        weathers: []
    }),
    computed: {
        weatherTitle: cur => `${cur.locale || ''}未来天气`
    },
    created: async function() {
        let res;
        try {
            res = await jsonp({ url: PLAY_URL, query: {} });
        } catch(err) {
            if(!err.forecastable) throw err;
            return console.log(`获取循环图片时发生错误，错误信息：${err.message}`);
        }
        res = res.images.map((cur, i) => {
            cur = Object.assign({}, cur);
            cur.id = i + 1;
            cur.source = cur.url;
            delete cur.url;
            return cur;
        });
        const scenes = this.playScenes;
        scenes.splice(0, scenes.length, ...res);
        
        try {
            res = await jsonp({ url: LOCALE_URL, query: {} });
        } catch(err) {
            if(!err.forecastable) throw err;
            return console.log(`查询设备所在区域时发生错误，错误信息：${err.message}`);
        }
        res = (res.address.match(/^[^市]+市/) || [])[0];
        try {
            res = await jsonp({ url: WEATHER_URL, query: { city: res } });
        } catch(err) {
            if(!err.forecastable) throw err;
            return console.log(`查询区域天气信息时发生错误，错误信息：${err.message}`);
        }
        const { city, weather, date } = res;
        this.locale = city;
        const today = new Date(date);
        res = weather.map((cur, i) => ({
            id: i + 1,
            times: today.setDate(today.getDate() + (i ? 1 : 0)),
            report: cur.weather,
            temperature: cur.temp
        }));
        this.weathers.push(...res);
    },
    methods: {
        searchFocusInHook: function() {
            this.$router.push('/search');
        },
        playClickHook: function(cur) {
            const [url, comment, date] = [cur.source, cur.copyright, cur.startdate].map(
                cur => encodeURIComponent(cur)
            );
            this.$router.push(`/observer/${url}/${comment}/${date}`);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);

.page-default-search {
    margin: 0.1875rem 0 0.1875rem 0.7875rem;
}

.page-default-weathers {
    margin-top: 0.3125rem;
}
</style>