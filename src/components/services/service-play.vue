<template>
    <com-carousel :carouselHeight="playHeight"
                  :duration="duration"
                  :items="playScenes"
                  v-model="index"
                  @emitItemClick="playClick"
    ></com-carousel>
</template>

<script>
import CommonCarousel from '../commons/common-carousel.vue';

export default {
    components: {
        'com-carousel': CommonCarousel
    },
    props: {
        playHeight: {
            type: Number,
            default: 1,
            validator: val => val > 0
        },
        playScenes: {
            type: Array,
            default: () => [
                { id: 1, source: null },
                { id: 2, source: null },
                { id: 3, source: null }
            ],
            validator: val => val.length > 2
        }
    },
    data: () => ({
        index: 0,
        duration: 8000
    }),
    methods: {
        playClick: function() {
            const [cur, ind] = [].slice.call(arguments, 0, 2);
            this.$emit('emitPlayClick', cur, ind, this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
</style>


