<template>
    <div class="layout-series">
        <div class="layout-series-wrap"
             :style="{
                 'padding-bottom': `${toBottom}rem`
             }">
            <div class="layout-series-refresh"
                 ref="refresh"
                 :style="{ 
                     height: `${refreshHeight}px`,
                     'line-height': `${refreshIconLine}px` 
                 }">
                <i :class="`layout-series-refresh-icon iconfont ${refreshIcon}`"
                   :style="{ 
                       transform: `scale(${refreshIconScale})` 
                   }"
                ></i>
            </div>
            <div class="layout-series-title">
                {{displayTitle}}
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import '../../assets/icons/iconfont.css';
import ElSolution from 'element-solution';

export default {
    props: {
        displayTitle: {
            type: String,
            default: 'LAYOUT-SERIES-TITLE',
            validator: val => val.length > 0
        },
        toBottom: {
            type: Number,
            default: 1.5,
            validator: val => val >= 0
        },
        host: {
            type: HTMLElement,
            default: () => document.documentElement
        }
    },
    data: () => ({
        ssolution: null,
        tsolution: null,
        refreshHeight: 0,
        refreshMaxHeight: 1,
        refreshIcon: 'icondown',
        operatable: true,
        loadCount: 0
    }),
    computed: {
        refreshIconScale: cur => Math.min(cur.refreshHeight / cur.refreshMaxHeight, 1),
        refreshIconLine: cur => Math.min(cur.refreshMaxHeight, cur.refreshHeight)
    },
    methods: {
        getValue: function(el, prop) {
            return parseFloat(getComputedStyle(el)[prop]);
        },
        loadMore: function() {
            this.operatable = false;
            this.$emit('emitLoadMore', ++this.loadCount, this);
        },
        refresh: function() {
            Object.assign(this, {
                operatable: false,
                loadCount: 0,
                refreshIcon: 'iconrefresh'
            });
            this.$emit('emitRefresh', this);
        },
        reset: function() {
            if(!this.loadCount) {
                this.refreshHeight = 0;
                this.refreshIcon = 'icondown';
            }
            this.$nextTick(() => (this.operatable = true));
        }
    },
    mounted: function() {
        const maximum = this.refreshMaxHeight = this.getValue(
            this.$refs.refresh, 'maxHeight'
        );
        this.ssolution = new ElSolution(
            this.host,
            'scroll-down',
            {
                critical: maximum,
                callback: () => {
                    if(!this.operatable) return;
                    this.loadMore();
                }
            }
        );
        this.tsolution = new ElSolution(
            this.host,
            'touch-down',
            {
                critical: maximum,
                progress: val => {
                    if(!this.operatable) return;
                    this.refreshHeight = val;
                },
                callback: isCritical => {
                    if(!this.operatable) return;
                    (isCritical || (this.refreshHeight = 0)) && (
                        this.refresh()
                    );
                }
            }
        );
    },
    destroyed: function() {
        const { ssolution, tsolution } = this;
        ssolution.clean();
        tsolution.clean();
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);
@import url(../../assets/less/mixins/width-mx.less);

.layout-series {
    .flex-mx(100%);
    background-color: @v-sixth-color;
    &-wrap {
        .width-mx(@v-content-width, 0);
        overflow: hidden;
    }
    &-refresh {
        max-height: 0.825rem;
        overflow: hidden;
        &-icon {
            float: left;
            margin-left: 4.625rem;
        }
    }
    &-title {
        padding: 0.25rem 0;
        text-indent: 0.1875rem;
        font-size: @v-font-size * 1.5;
        font-family: consolas, Yahei;
    }
}
</style>