<template>
    <lay-default :titleOpacity="headOpacity">
        <template slot="title">
            <ser-search class="head-search"
                        :realWidth="searchWidth"
                        :displayText="searchText"
                        @emitFocusIn="searchFocusInHook"
            ></ser-search>
        </template>
        <ser-play :playHeight="playHeight"
                  :playScenes="playScenes"
                  @emitPlayClick="playClickHook"
        ></ser-play>
    </lay-default>
</template>

<script>
import jsonp from '../utils/domain-request';
import LayoutDefault from '../components/layouts/layout-default.vue';
import ServiceSearch from '../components/services/service-search.vue';
import ServicePlay from '../components/services/service-play.vue';
import { PLAY_URL } from '../config';

export default {
    components: {
        'lay-default': LayoutDefault,
        'ser-search': ServiceSearch,
        'ser-play': ServicePlay
    },
    data: () => ({
        headOpacity: 0.5,
        searchWidth: 7.5,
        searchText: '键入城市名称以便搜索',
        playHeight: 6.875,
        playScenes: [
            { id: 1, source: null },
            { id: 2, source: null },
            { id: 3, source: null }
        ]
    }),
    created: async function() {
        let res;
        try {
            res = await jsonp({ url: PLAY_URL, query: {}, timeout: 5000 });
        } catch(err) {
            if(!err.forecastable) throw err;
            return;
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
    },
    methods: {
        searchFocusInHook: function() {
            
        },
        playClickHook: function() {

        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);

.head-search {
    margin: 0.1875rem 0 0.1875rem 0.7875rem;
}
</style>