<template>
<lay-main>
    <template slot="view">
        <router-view></router-view>
    </template>
    <ser-navigation :perWidth="navWidth"
                    @routeChanged="route"
    ></ser-navigation>
</lay-main>
</template>

<script>
import LayoutMain from "../components/layouts/layout-main.vue";
import ServiceNavigation from "../components/services/service-navigation.vue";

export default {
    components: {
        "lay-main": LayoutMain,
        "ser-navigation": ServiceNavigation
    },
    data: () => ({
        navWidth: 5
    }),
    methods: {
        route: function() {
            const [cur, router, len] = [
                arguments[0], this.$router, window.history.length
            ];
            switch(cur.id) {
                case 0: { (len ? router.replace : router.push).call(router, '/main/default'); }; break;
                case 1: { (len ? router.replace : router.push).call(router, '/main/news'); }; break;
            }
        }  
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);
</style>
