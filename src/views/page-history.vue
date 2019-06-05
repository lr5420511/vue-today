<template>
    <lay-series class="page-history"
                :displayTitle="historyTitle"
                :toBottom="historyToBottom">
        <ser-history :records="historyRecords"
                     @emitRemoveRecord="removeRecord"
                     @emitHistoryClear="clearHistory"
                     @emitRecordClick="recordClick"
        ></ser-history>
    </lay-series>
</template>

<script>
import ServiceHistory from '../components/services/service-history.vue';
import LayoutSeries from '../components/layouts/layout-series.vue';

export default {
    components: {
        'ser-history': ServiceHistory,
        'lay-series': LayoutSeries
    },
    data: () => ({
        historyToBottom: 0,
        count: 0
    }),
    computed: {
        historyTitle: cur => `共有${cur.count}条历史搜索记录`,
        historyRecords: cur => cur.$store.getters.myHistory.map((cur, i) => ({
            id: i + 1,
            content: cur
        })) 
    },
    created: function() {
        const { $store } = this;
        this.count = $store.getters.myHistory.length;
    },
    methods: {
        removeRecord: function(cur) {
            this.$store.commit('removeHis', cur.content);
        },
        clearHistory: function() {
            this.count && (this.$store.commit('clear'));
        },
        recordClick: function(cur) {
            this.$store.commit('moveToHead', cur.content);
            this.$router.push(`/search/result/${cur.content}`);
        }
    },
    watch: {
        '$store.getters.myHistory': function(cur) {
            this.count = cur.length;
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);

.page-history {
    margin-top: 0.3125rem;
}
</style>
