<template>
    <lay-series class="page-result"
                :displayTitle="resultTitle"
                :toBottom="resultToBottom">
        <ser-weathers :weathers="resultWeathers"
        ></ser-weathers>
    </lay-series>
</template>

<script>
import jsonp from '../utils/domain-request';
import { WEATHER_URL } from '../config';
import ServiceWeathers from '../components/services/service-weathers.vue';
import LayoutSeries from '../components/layouts/layout-series.vue';

export default {
    components: {
        'ser-weathers': ServiceWeathers,
        'lay-series': LayoutSeries
    },
    data: () => ({
        curCity: null,
        resultToBottom: 0,
        resultWeathers: []
    }),
    computed: {
        resultTitle: cur => `${cur.curCity || ''}未来天气`
    },
    created: function() {
        this.refresh();
    },
    methods: {
        refresh: async function() {
            const city = this.$route.params.city; 
            let res;
            try {
                res = await jsonp({ url: WEATHER_URL, query: { city } });
            } catch(err) {
                if(!err.forecastable) throw err;
                return console.log(`查询${city}天气信息时出现错误，错误信息：${err.message}`);
            }
            const { weather, date } = res,
                today = new Date(date);
            this.curCity = res.city;
            res = (weather || []).map((cur, i) => ({
                id: i + 1,
                times: today.setDate(today.getDate() + (i ? 1 : 0)),
                report: cur.weather,
                temperature: cur.temp
            }));
            const rws = this.resultWeathers;
            rws.splice(0, rws.length, ...res);
        }
    },
    watch: {
        '$route': function() {
            this.refresh();
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);

.page-result {
    margin-top: 0.3125rem;
}
</style>
