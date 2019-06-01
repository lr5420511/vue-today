<template>
<ul class="common-group">
    <li class="common-group-item" 
        v-for="(cur, i) in items" 
        :key="cur.id" 
        :style="{ 
            width: `${blockWidth}rem`, 
            color: i === value ? focusColor : oldColor
        }" 
        @click.stop="itemClick(i, $event)">
            <i :class="`iconfont ${cur.icon}`"></i>
            <br> {{cur.text}}
    </li>
    <li class="common-group-block" 
        :style="{ 
            width: `${blockWidth}rem`, 
            height: `${itemHeight}px`,
            top: `${blockPosition.top}px`,
            left: `${blockPosition.left}px` 
        }"
    ></li>
</ul>
</template>

<script>
import "../../assets/icons/iconfont.css";
import { FOCUS_COLOR } from "../../config";

export default {
    props: {
        blockWidth: {
            type: Number,
            default: 5,
            validator: val => val > 0
        },
        value: {
            type: Number,
            default: 0,
            validator: val => val > -1
        },
        items: {
            type: Array,
            default: () => [{
                    id: 1,
                    icon: "iconhome",
                    text: "MAIN"
                },
                {
                    id: 2,
                    icon: "iconhistory",
                    text: "HISTORY"
                }
            ],
            validator: val => val.length > 0
        }
    },
    data: () => ({
        currentItem: null,
        itemHeight: 0,
        focusColor: FOCUS_COLOR,
        oldColor: null
    }),
    computed: {
        blockPosition: cur => {
            const { currentItem } = cur;
            return {
                left: currentItem ? currentItem.offsetLeft : 0,
                top: currentItem ? currentItem.offsetTop : 0
            };
        }
    },
    mounted: function () {
        const { $el, value, items, getValue } = this,
            child = value ? $el.firstElementChild : (
                $el.children[1] || $el.firstElementChild
            ),
            len = items.length,
            curItem = this.currentItem = $el.children[Math.min(value, len - 1)];
        this.itemHeight = ['height', 'paddingTop', 'paddingBottom'].reduce((res, prop) =>
            res + getValue(child, prop), 0
        );
        this.oldColor = getComputedStyle(child).color;
        curItem.click();
    },
    methods: {
        itemClick: function (index, ev) {
            this.$emit("input", index, this, ev);
        },
        getValue: function(el, prop) {
            return parseFloat(getComputedStyle(el)[prop]);
        }
    },
    watch: {
        value: function (val) {
            this.currentItem = this.$el.children[val];
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);

.common-group {
    position: relative;
    list-style: none;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;

    &-item {
        float: left;
        padding: 0.075rem 0;
        overflow: hidden;
    }

    &-block {
        position: absolute;
        background-color: @v-third-color;
        opacity: 0.2;
        transition: all 0.3s;
    }
}
</style>
