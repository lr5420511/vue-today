<template>
    <div class="common-mark"
         @click="markClick">
        <div class="common-mark-block">
        {{formatDate}}
        </div>
        <div class="common-mark-block common-mark-core">
            {{report}}
            <i v-for="(cur, i) in reportIcons"
               :key="i" 
               :class="`iconfont ${cur}`"
            ></i>
        </div>
        <div class="common-mark-block">
         {{temperature}}
        </div>
    </div>
</template>

<script>
import '../../assets/icons/iconfont.css';
import { dateTranslater, weatherToIcons } from '../../utils/utils';  

export default {
    props: {
        times: {
            type: Number,
            default: 0,
            validator: val => val >= 0
        },
        report: {
            type: String,
            default: '',
            validator: val => val.length >= 0
        },
        temperature: {
            type: String,
            default: '',
            validator: val => val.length >= 0
        }
    },
    computed: {
        formatDate: cur => {
            return dateTranslater(cur.times, function() {
                const [y, m, d, dd] = [...arguments];
                let day;
                switch(dd) {
                    case 1: { day = '一'; }; break;
                    case 2: { day = '二'; }; break;
                    case 3: { day = '三'; }; break;
                    case 4: { day = '四'; }; break;
                    case 5: { day = '五'; }; break;
                    case 6: { day = '六'; }; break;
                    case 0: { day = '日'; }; break;
                }
                return `${m}月${d}日  星期${day}`;
            });
        },
        reportIcons: cur => {
            return weatherToIcons(cur.report);
        }
    },
    methods: {
        markClick: function() {
            this.$emit('emitMarkClick', this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.common-mark {
    .flex-mx(100%);
    border-top: dashed 1px @v-fifth-color;
    padding: 0.1875rem 0;
    &-block {
        float: left;
        width: 30%;
        line-height: @v-unit-height;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        i {
            font-size: 0.25rem;
            margin-left: 0.0625rem;
            color: @v-first-color;
        }
    }
    &-core {
        width: 40%;
    }
}
</style>
