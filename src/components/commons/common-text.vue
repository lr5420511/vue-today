<template>
    <div class="common-text">
        <div class="common-text-wrap"
             :style="{ 
                 'border-radius': `${radius}px` 
             }">
            <i :class="`iconfont common-text-icon ${icon}`"
               ref="icon"
            ></i>
            <input class="common-text-input"
                   :placeholder="comment"
                   :type="textType"
                   :style="{ 
                       width: `${realWidth}rem`,
                       height: `${iconHeight}px` 
                   }"
                   :value="value"
                   @input="inputHook"
                   @keydown.enter.stop="enterHook"
                   @focusin="focusinHook"
            />
        </div>
    </div>
</template>

<script>
import '../../assets/icons/iconfont.css'

export default {
    props: {
        realWidth: {
            type: Number,
            default: 4,
            validator: val => val > 0
        },
        comment: {
            type: String,
            default: 'COMMON-TEXT',
            validator: val => val.length > 0
        },
        textType: {
            type: String,
            default: 'text',
            validator: val => /^(text|password)$/i.test(val)
        },
        icon: {
            type: String,
            default: 'iconedit',
            validator: val => val.length > 0
        },
        value: {
            type: String,
            default: '',
            validator: val => typeof val === 'string'
        }
    },
    data: () => ({
        radius: 0,
        iconHeight: 0
    }),
    mounted: function() {
        this.iconHeight = this.getValue(this.$refs.icon, 'height');
        const parentHeight = [
            'borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom'
        ].reduce((res, prop) => 
            res + this.getValue(this.$el.firstElementChild, prop), 0
        ) + this.iconHeight;
        this.radius = parentHeight / 2;
    },
    methods: {
        getValue: function(el, prop) {
            return parseFloat(getComputedStyle(el)[prop]);
        },
        inputHook: function(ev) {
            const { value } = ev.target;
            this.$emit('input', value, this);
        },
        enterHook: function() {
            this.$emit('emitEnter', this);
        },
        focusinHook: function() {
            this.$emit('emitFocusIn', this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.common-text {
    .flex-mx(auto);
    &-wrap {
        .flex-mx(auto);
        position: relative;
        padding: 0.0875rem 0;
        border: solid 0.025rem @v-first-color;
        overflow: hidden;
    }
    &-icon {
        float: left;
    }
    &-input {
        float: right;
        padding: 0 0 0 0.125rem;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: @v-font-size;
        font-family: @v-font-family;
        color: @v-third-color;
    }
}
</style>
