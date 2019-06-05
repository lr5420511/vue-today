<template>
    <lay-default>
        <template slot="title">
            <i class="page-search-return iconfont iconreturn"
               @click="routerReturn"
            ></i>
            <ser-search class="page-search-search"
                        :realWidth="searchWidth"
                        :displayText="searchText"
                        :initFocus="searchFocus"
                        @emitEnter="searchEnter"
            ></ser-search>
        </template>
        <router-view></router-view>
    </lay-default>
</template>

<script>
import '../assets/icons/iconfont.css';
import LayoutDefault from '../components/layouts/layout-default.vue';
import ServiceSearch from '../components/services/service-search.vue';

export default {
    components: {
        'lay-default': LayoutDefault,
        'ser-search': ServiceSearch
    },
    data: () => ({
        searchWidth: 7.4125,
        searchText: '键入城市名称以便搜索',
        searchFocus: true
    }),
    methods: {
        routerReturn: function() {
            history.length > 1 && (this.$router.go(-1));
        },
        searchEnter: function(val) {
            if(!val) return;
            const { $store, $router } = this;
            $store.commit('addHis', val);
            $router.replace(`/search/result/${encodeURIComponent(val)}`);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);

.page-search-return,
.page-search-search {
    float: left;
}

.page-search-search {
    margin: 0.1875rem 0 0.1875rem 0.1875rem;
}

.page-search-return {
    margin: 0.3rem 0;
}
</style>
