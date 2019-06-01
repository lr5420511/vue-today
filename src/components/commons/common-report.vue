<template>
    <div class="common-report"
         @click.stop="reportClick">
        <div class="common-report-title">
        {{displayTitle}}
        </div>
        <img class="common-report-scene" 
             :src="reportScene" 
        />
        <div class="common-report-summary"
             v-if="summaryExist"
        >{{summary}}</div>
        <div class="common-report-extends">
            <span v-if="sourceExist">
            报道来自于{{source}}
            </span>
            <span>{{dateTime}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        displayTitle: {
            type: String,
            default: 'COMMON-REPORT-TITLE',
            validator: val => val.length > 0
        },
        reportScene: {
            type: String,
            default: null,
            validator: val => /\.(jpe?g|png|gif)$/i.test(val)
        },
        summary: {
            type: String,
            default: 'COMMON-REPORT-SUMMARY'
        },
        source: {
            type: String,
            default: 'COMMON-REPORT-SOURCE'
        },
        times: {
            type: Number,
            default: 0,
            validator: val => val >= 0
        }
    },
    computed: {
        summaryExist: cur => Boolean(cur.summary),
        sourceExist: cur => Boolean(cur.source),
        dateTime: cur => (new Date(cur.times)).toLocaleString()
    },
    methods: {
        reportClick: function() {
            this.$emit('emitReportClick', this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.common-report-text-mx() {
    padding: 0.1875rem;
    overflow: hidden;
}

.common-report {
    .flex-mx(100%);
    border-top: dotted 1px @v-fourth-color;
    &-title {
        .common-report-text-mx();
        white-space: nowrap;
    }
    &-scene {
        width: 100%;
        height: 5.625rem;
    }
    &-summary {
        .common-report-text-mx();
        color: @v-fourth-color;
        text-indent: 0.5625rem;
        line-height: 0.6875rem;
    }
    &-extends {
        .common-report-text-mx();
        color: @v-fourth-color;
        font-size: @v-font-size * 0.8;
        span {
            margin-left: 0.5625rem;
        }
    }
}
</style>
