<template>
<div class="layout-main">
    <slot name="view"></slot>
    <div class="layout-main-foot">
        <div class="layout-main-navigation">
            <slot></slot>
        </div>
    </div>
</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/anchor-mx.less);
@import url(../../assets/less/mixins/flex-mx.less);
@import url(../../assets/less/mixins/paper-mx.less);
@import url(../../assets/less/mixins/width-mx.less);

.layout-main {
    .flex-mx(100%);

    &-foot {
        .anchor-mx(left, 0, bottom, 0);
        .flex-mx(100%);
        .paper-mx(@v-sixth-color, @v-fourth-color);
    }

    &-navigation {
        .width-mx(@v-content-width, 0);
        overflow: hidden;
    }
}
</style>
