<template>
    <div class="service-news">
        <com-report v-for="(cur, i) in news"
                    :key="cur.id"
                    :displayTitle="cur.title"
                    :reportScene="cur.scene"
                    :summary="cur.summary"
                    :source="cur.source"
                    :times="cur.times"
                    @emitReportClick="newClick(cur, i)"
        ></com-report>
    </div>
</template>

<script>
import CommonReport from '../commons/common-report.vue';

export default {
    components: {
        'com-report': CommonReport
    },
    props: {
        news: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        newClick: function(cur, i) {
            this.$emit('emitNewClick', cur, i, this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.service-news {
    .flex-mx(100%);
}
</style>
