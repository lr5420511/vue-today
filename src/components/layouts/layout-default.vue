<template>
    <div class="layout-default"
         :style="{ 'padding-top': `${paddingTop}rem` }">
        <div class="layout-default-head">
            <div class="layout-default-head-paper"
                 :style="{ opacity: titleOpacity }"
            ></div>
            <div class="layout-default-head-title">
                <slot name="title"></slot>
            </div>
        </div>
        <div class="layout-default-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        titleOpacity: {
            type: Number,
            default: 1,
            validator: val => val >= 0 && val <= 1
        }
    },
    data: () => ({
        paddingTop: 0,
        remToPixels: null
    }),
    mounted: function() {
        const remToPx = this.remToPixels = this.getValue(document.documentElement, 'fontSize');
        this.titleOpacity === 1 && (
            this.paddingTop = this.getValue(this.$el.firstElementChild, 'height') / remToPx 
        );
    },
    methods: {
        getValue: function(el, prop) {
            return parseFloat(getComputedStyle(el)[prop]);
        }
    },
    watch: {
        titleOpacity: function(val, old) {
            const vaild = (val === 1 && old < 1) || (val < 1 && old === 1);
            if(!vaild) return;
            this.$nextTick(() => {
                this.paddingTop = val === 1 ? 
                    this.getValue(this.$el.firstElementChild, 'height') / this.remToPixels : 0; 
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/anchor-mx.less);
@import url(../../assets/less/mixins/fill-mx.less);
@import url(../../assets/less/mixins/flex-mx.less);
@import url(../../assets/less/mixins/paper-mx.less);
@import url(../../assets/less/mixins/width-mx.less);

.layout-default {
    .flex-mx(100%);
    &-head {
        .anchor-mx(left, 0, top, 0);
        .flex-mx(100%);
        &-paper {
            .fill-mx();
            .paper-mx(@v-sixth-color, @v-fourth-color);
            position: absolute;
        }
        &-title {
            .width-mx(@v-content-width, 0);
            position: relative;
            overflow: hidden;
        }
    }
    &-content {
        .flex-mx(100%);
    }
}
</style>
