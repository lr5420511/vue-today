<template>
    <div class="service-history">
        <com-label v-for="(cur, i) in records"
                   :key="cur.id"
                   :displayText="cur.content"
                   @emitCloseClick="recordRemoveClick(cur, i)"
                   @emitLabelClick="recordClick(cur, i)"
        ></com-label>
        <div class="service-history-operator"
             @click.stop="historyClearClick"
        >清空历史记录</div>
    </div>
</template>

<script>
import CommonLabel from '../commons/common-label.vue';

export default {
    components: {
        'com-label': CommonLabel
    },
    props: {
        records: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        recordRemoveClick: function(cur, i) {
            this.$emit('emitRemoveRecord', cur, i, this);
        },
        historyClearClick: function() {
            this.$emit('emitHistoryClear', this);
        },
        recordClick: function(cur, i) {
            this.$emit('emitRecordClick', cur, i, this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.service-history {
    .flex-mx(100%);
    &-operator {
        .flex-mx(100%);
        padding: 0.1875rem 0;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        border-top: dashed 1px @v-fifth-color;
    }
}
</style>
