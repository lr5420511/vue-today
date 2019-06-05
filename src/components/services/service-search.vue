<template>
    <com-text :comment="displayText"
              :icon="icon"
              :realWidth="realWidth"
              :focus="initFocus"
              v-model="value"
              @input="inputHook"
              @emitEnter="enterHook"
              @emitFocusIn="focusinHook"
    ></com-text>
</template>

<script>
import CommonText from '../commons/common-text.vue';

export default {   
    components: {
        'com-text': CommonText
    },
    props: {
        realWidth: {
            type: Number,
            default: 5,
            validator: val => val > 0
        },
        displayText: {
            type: String,
            default: '键入文本以便于搜索',
            validator: val => typeof val === 'string'
        },
        initFocus: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        icon: 'iconsearch',
        value: ''
    }),
    methods: {
        inputHook: function(val) {
            this.$emit('input', val, this);
        },
        enterHook: function() {
            this.$emit('emitEnter', this.value, this);
        },
        focusinHook: function() {
            this.$emit('emitFocusIn', this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
</style>
