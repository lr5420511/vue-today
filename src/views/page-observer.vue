<template>
    <lay-default>
        <template slot="title">
            <i class="page-observer-return iconfont iconreturn"
               @click="routerReturn"
            ></i>
            <span class="page-observer-title">
            场景查看器
            </span>
        </template>
        <div class="page-observer-paper">
            <div class="page-observer-content">
                <ser-scene :picture="observerPicture"
                           :comment="sceneComment"
                           :date="publishDate"
                ></ser-scene>
            </div>
        </div>
    </lay-default>
</template>

<script>
import '../assets/icons/iconfont.css';
import LayoutDefault from '../components/layouts/layout-default.vue';
import ServiceScene from '../components/services/service-scene.vue';

export default {
    components: {
        'lay-default': LayoutDefault,
        'ser-scene': ServiceScene
    },
    computed: {
        observerPicture: cur => cur.$route.params.url,
        sceneComment: cur => cur.$route.params.comment,
        publishDate: cur => {
            const format = (cur.$route.params.date.match(/^(\d{4})(\d{2})(\d{2})$/) || [])
                .slice(1).join('-');
            return format ? Date.parse(format) : 0;
        }
    },
    methods: {
        routerReturn: function() {
            history.length > 1 && (this.$router.go(-1));
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);
@import url(../assets/less/mixins/flex-mx.less);
@import url(../assets/less/mixins/width-mx.less);

.page-observer-return, 
.page-observer-title {
    float: left;
    margin: 0.3rem 0;
}

.page-observer-title {
    text-indent: 3.225rem;
    font-size: @v-font-size * 1.5;
    width: 9.25rem;
    line-height: 0.825rem;
}

.page-observer-paper {
    .flex-mx(100%);
    background-color: @v-sixth-color;
    margin-top: 0.3125rem;
}

.page-observer-content {
    .width-mx(@v-content-width, 0);
    overflow: hidden;
}
</style>
