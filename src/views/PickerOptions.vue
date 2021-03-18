<template>
  <div class="fs-debug-picker-options container-fluid">
    <div class="row pb-3">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Display Mode</h5>
            <div class="card-text">
              <select
                class="form-select mb-3"
                :value="getConfigValue('displayMode')"
                @input="setSelectConfigValue('displayMode', $event)"
                aria-label="Default select example"
              >
                <option value="inline">Inline</option>
                <option value="overlay">Overlay</option>
                <option value="dropPane">DropPane</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pb-3">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">General Options</h5>
            <div class="card-text"><General /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="picker.config.displayMode === 'dropPane'">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">DropPane</h5>
            <div class="card-text"><DropPane /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Store Options</h5>
            <div class="card-text"><Store /></div>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Upload Options</h5>
            <div class="card-text"><Upload /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class';
import General from './../components/picker/General.vue';
import Store from './../components/picker/Store.vue';
import Upload from './../components/picker/Upload.vue';
import DropPane from './../components/picker/DropPane.vue';

@Component({
  components: { General, Store, Upload, DropPane },
})
export default class PickerOptions extends Vue {
  @State('picker') picker: any;

  @Getter('picker/getConfigKey') getConfigKey: any;
  // eslint-disable-next-line
  @Mutation('picker/setConfigKey') setConfigKey: ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => {};

  public getConfigValue(key: string) {
    return this.getConfigKey(key);
  }

  public setConfigValue(key: string, value: string) {
    console.log(key, value);
    return this.setConfigKey({ key, value });
  }

  public setSelectConfigValue(key: string, e: any) {
    if(e.target.options.selectedIndex > -1) {
      this.setConfigValue(key, e.target.options[e.target.options.selectedIndex].value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
