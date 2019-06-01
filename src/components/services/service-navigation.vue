<template>
<com-group class="service-navigation"
           :blockWidth="perWidth"
           :items="navs"
           v-model="curIndex"
           @input="toggle"
></com-group>
</template>

<script>
import CommonGroup from '../commons/common-group.vue';

export default {
    components: {
        'com-group': CommonGroup
    },
    props: {
        perWidth: {
            type: Number,
            default: 2.5,
            validator: val => val > 0
        }
    },
    data: () => ({
        navs: [
            { id: 0, icon: 'iconhome', text: ' 主 页 ' },
            { id: 1, icon: 'iconnews', text: ' 热点新闻 ' }
        ],
        curIndex: 0
    }),
    methods: {
        toggle: function() {
            const [index] = Object.assign([], arguments);
            this.$emit('routeChanged', this.navs[index], this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);

.service-navigation {
    font-family: consolas, Yahei;
}
</style>
