<template>
    <div class="common-carousel"
         :style="{ height: `${carouselHeight}rem` }">
        <div class="common-carousel-wrap">
            <ul class="common-carousel-context"
                ref="context"
                :style="{ 
                    width: `${contextWidth}px`,
                    left: `${contextLeft}px` 
                }">
                <li class="common-carousel-item"
                    v-for="cur in currents"
                    :key="cur.id"
                    :style="{ width: `${width}px` }"
                    @click.stop="itemClick(cur)">
                    <img class="common-carousel-item-scene" 
                         :src="cur.source"
                    />
                </li>
            </ul>
            <div class="common-carousel-preview"
                 ref="preview"
                 :style="{ left: `${previewLeft}px` }">
                <i class="common-carousel-preview-radius"
                   v-for="(_, i) in items"
                   :key="_.id"
                   :style="{ 'background-color': i === value ? focusColor : 'transparent' }"
                   @click.stop="radiusClick(i)"
                ></i>
            </div>
        </div>
    </div>
</template>

<script>
import ElSolution from 'element-solution';
import { FOCUS_COLOR } from '../../config';
import Velocity from 'velocity-animate';

export default {
    props: {
        carouselHeight: {
            type: Number,
            default: 1,
            validator: val => val > 0
        },
        duration: {
            type: Number,
            default: 6000,
            validator: val => val > 0
        },
        value: {
            type: Number,
            default: 0,
            validator: val => val >= 0
        },
        items: {
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
        timer: null,
        focusColor: FOCUS_COLOR,
        solution: null,
        width: 0,
        vector: 0,
        previewWidth: 0,
        animating: false
    }),
    mounted: function() {
        this.solution = new ElSolution(this.$el, 'touch-move', {
            progress: (cur, old) => {
                if(this.animating) return;
                clearTimeout(this.timer);
                const ctx = this.$refs.context;
                ctx.style.left = `${this.getValue(ctx, 'left') + cur[0] - old[0]}px`;
            },
            callback: cur => {
                if(this.animating) return;
                clearTimeout(this.timer);
                const offsetX = cur[0];
                if(!offsetX) return this.move();
                this.move(offsetX / Math.abs(offsetX), false);
            }
        });
        this.width = this.getValue(this.$el, 'width');
        this.previewWidth = this.getValue(this.$refs.preview, 'width');
        this.move();
    },
    destroyed: function() {
        clearTimeout(this.timer);
        this.solution.clean();
    },
    computed: {
        contextWidth: cur => cur.width * 3,
        contextLeft: cur => cur.vector * cur.width - cur.width,
        previewLeft: cur => (cur.width - cur.previewWidth) / 2,
        currents: cur => {
            const { items, value } = cur,
                len = items.length;
            return [
                items[(value - 1 < 0 ? len : value) - 1],
                items[value],
                items[value + 1 >= len ? 0 : (value + 1)]
            ];
        }
    },
    methods: {
        getValue: function(el, prop) {
            return parseFloat(getComputedStyle(el)[prop]);
        },
        move: async function(vector = -1, auto = true) {
            const { duration, width, $refs } = this;
            if(auto) await new Promise(res => 
                (this.timer = setTimeout(res, duration))
            );
            this.animating = true;
            if($refs.context) await Velocity.animate($refs.context, {
                left: -width + vector * width
            }, { duration: 350 });
            this.vector = vector;
            this.$nextTick(() => this.request(vector, auto));
        },
        request: function(vector, auto) {
            const { value, items } = this,
                len = items.length,
                index = value - vector;
            this.$emit('input', 
                index < 0 ? len - 1 : (index >= len ? 0 : index),
                auto, 
                this
            ); 
        },
        itemClick: function(cur) {
            const ind = this.items.indexOf(cur);
            this.$emit('emitItemClick', cur, ind, this);
        },
        radiusClick: function(index) {
            if(this.animating) return;
            clearTimeout(this.timer);
            this.request(this.value - index, false);
        }
    },
    watch: {
        value: function() {
            this.vector = 0;
            this.$nextTick(() => {
                this.animating = false;
                this.move();
            });
        },
        items: function() {
            this.$nextTick(() => (
                this.previewWidth = this.getValue(this.$refs.preview, 'width')
            ));
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/fill-mx.less);

.common-carousel {
    width: 100%;
    &-wrap {
        .fill-mx();
        position: relative;
        overflow: hidden;
    }

    &-context {
        position: absolute;
        height: 100%;
        list-style: none;
        top: 0;
    }

    &-item {
        float: left;
        height: 100%;
        &-scene {
            .fill-mx();
        }
    }

    &-preview {
        position: absolute;
        bottom: 0.5rem;
        max-width: @v-content-width;
        &-radius {
            float: left;
            width: 0.175rem;
            height: $width;
            border: solid 0.0375rem @v-sixth-color;
            border-radius: 50%;
            margin: 0.25rem;
        }
    }
}
</style>
