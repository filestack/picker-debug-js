<template>
  <div id="filestack-debug" class="fs-debug-page">
    <Header />
    <div class="fs-debug-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';

@Component({
  components: { Header }
})
export default class App extends Vue {

  created() {
    window.localStorage.debug = 'fs:*';
    // @ts-ignore
    if (!window.JSHINT) window.JSHINT = require('jshint').JSHINT


  }
}
</script>

<style scoped lang="scss">
  .fs-debug-page {
    display: flex;
    flex-direction: column;

    .fs-debug-content {
      flex: auto;
    }
  }
</style>
