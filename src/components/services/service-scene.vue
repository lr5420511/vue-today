<template>
    <div class="service-scene">
        <img class="service-scene-picture" 
             :src="picture" 
        />
        <div class="service-scene-comment">
        {{comment}}<br/>发表于：{{publishDate}}
        </div>
    </div>
</template>

<script>
import { dateTranslater } from '../../utils/utils';

export default {
    props: {
        picture: {
            type: String,
            default: null,
            validator: val => val.length > 0
        },
        comment: {
            type: String,
            default: 'SERVICE-SCENE-COMMENT'
        },
        date: {
            type: Number,
            default: 0,
            validator: val => val >= 0
        }
    },
    computed: {
        publishDate: cur => dateTranslater(cur.date, function() {
            const [y, m, d] = [...arguments];
            return `${y}年${m}月${d}日`;
        })
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.service-scene {
    .flex-mx(100%);
    &-picture {
        width: 100%;
        height: 6.25rem;
    }
    &-comment {
        padding: 0.1875rem;
        line-height: 0.6875rem;
        text-align: center;
    }
}
</style>
