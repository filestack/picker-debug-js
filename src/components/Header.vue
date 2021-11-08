<template>
  <div class="fs-debug-header">
    <div class="fs-ribbon"></div>
    <div class="fs-head-menu">
      <div class="fs-logo">
        <router-link to="/"><img src="https://static.filestackapi.com/filestack.svg" /></router-link>
      </div>
    </div>
    <div class="fs-bottom-ribbon"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class Header extends Vue {
  @Getter('fingerprint') fp: any;

  copyFingerprint(e: any) {
    try {
      e.target.select();
      document.execCommand('copy');
      console.log('copy');
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style scoped lang="scss">
  .fs-debug-header {
    margin-bottom: 2rem;

    .fs-ribbon {
      background: HSL(257, 32%, 11%);
      width: 100%;
      height: 1rem;
      padding: 0 5rem;
    }

    .fs-bottom-ribbon{
      background: HSL(11, 86%, 54%);
      width: 100%;
      height: 1rem;
      padding: 0 5rem;
    }

    .fs-head-menu {
      height: 5rem;
      padding: 0 1.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
