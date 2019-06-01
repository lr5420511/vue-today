<template>
    <div id="root">
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import url(./assets/less/variables.less);
@import url(./assets/less/mixins/devices-mx.less);
@import url(./assets/less/mixins/flex-mx.less);

.devices-mx(@v-devices, @v-rem-percent);

body {
  .flex-mx(100%);
  margin: 0;
  background-color: @v-fifth-color;
  font-size: @v-font-size;
  font-family: @v-font-family;
  color: @v-third-color;
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  a {
    color: @v-third-color;
    text-decoration: none;
  }
}
</style>

<style lang="less" scoped>
@import url(./assets/less/mixins/flex-mx.less);

#root {
  .flex-mx(100%);
}
</style>
