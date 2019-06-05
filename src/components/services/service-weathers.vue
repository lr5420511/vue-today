<template>
    <div class="service-weathers">
        <com-mark v-for="(cur, i) in weathers"
                  :key="cur.id"
                  :times="cur.times"
                  :report="cur.report"
                  :temperature="cur.temperature"
                  @emitMarkClick="weatherClick(cur, i)"
        ></com-mark>
    </div>
</template>

<script>
import CommonMark from '../commons/common-mark.vue';

export default {
    components: {
        'com-mark': CommonMark
    },
    props: {
        weathers: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        weatherClick: function(cur, i) {
            this.$emit('emitWeatherClick', cur, i, this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.service-weathers {
    .flex-mx(100%);
}
</style>
