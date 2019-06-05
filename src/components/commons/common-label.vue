<template>
    <div class="common-label"
         @click.stop="labelClick">
        <div class="common-label-context">
            {{displayText}}
            <i class="iconfont iconclose"
               @click.stop="closeClick"
            ></i>
        </div>
    </div>
</template>

<script>
import '../../assets/icons/iconfont.css';

export default {
    props: {
        displayText: {
            type: String,
            default: 'COMMON-LABEL-TEXT',
            validator: val => val.length > 0
        }
    },
    methods: {
        closeClick: function() {
            this.$emit('emitCloseClick', this);
        },
        labelClick: function() {
            this.$emit('emitLabelClick', this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.common-label {
    .flex-mx(100%);
    border-top: dashed 1px @v-fifth-color;
    padding: 0.1875rem 0;
    &-context {
        padding: 0 0.1875rem;
        line-height: @v-unit-height;
        i {
            font-size: @v-font-size;
            float: right;
        }
    }
}
</style>
