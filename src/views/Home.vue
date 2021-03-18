<template>
  <div class="fs-debug-home container-fluid">
    <div class="row mb-4">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Picker Debug Page</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">How to use:</h4>
            <ol>
              <li>Fill needed fields (apikey is required)</li>
              <li>Import your picker code implementation (It`s important to use <code>debugDoneCallback</code> inside your code after file upload)</li>
              <li>Upload problematic files - after upload report will be generated</li>
              <li>Send generated report to our support <a href="mailto:support@filestack.com">support@filestack.com</a></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Apikey</h4>
            <input
              v-b-tooltip="'Filestack Apikey for problematic application'"
              type="text"
              class="form-control"
              id="i-apikey"
              placeholder="Your apikey"
              :value="clientConfig.apikey"
              @input="setApikey"
              trim
            />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Cname</h4>
            <input
              type="text"
              v-b-tooltip="'Your cname. Leave empty if not used'"
              class="form-control"
              id="i-cname"
              placeholder="Your cname"
              :value="clientConfig.cname"
              @input="setCname"
              trim
            />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Security and Plolicy</h4>
            <input
              type="text"
              v-b-tooltip="'Your picker policy. Leave empty if not used'"
              class="form-control mb-2"
              id="i-policy"
              placeholder="Policy"
              :value="clientConfig.security.policy"
              @input="setPolicy"
              trim
            />
            <input
              type="text"
              class="form-control"
              v-b-tooltip="'Your picker sugnature. Leave empty if not used'"
              id="i-signature"
              placeholder="Signature"
              :value="clientConfig.security.signature"
              @input="setSignature"
              trim
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body text-center">
            <b-button
              v-b-tooltip="'Insert your picker configuration with code editor'"
              v-b-modal.import-configuration
              variant="primary"
              >2. Import configuration</b-button
            >
          </div>
        </div>
      </div>
      <!-- <div class="col">
        <div class="card">
          <div class="card-body text-center">
            <b-button v-b-tooltip="'Use configuration wizzard to setup picker'" v-b-modal.configuration-wizzard variant="primary">Configuration Wizzard</b-button>
          </div>
        </div>
      </div> -->
      <div class="col">
        <div class="card">
          <div class="card-body text-center">
            <router-link
              v-b-tooltip="
                'Start uploading files. When finished logs will be send to filestack'
              "
              :to="{ name: 'picker-runner' }"
              class="btn btn-primary"
              >3. Start debuging</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="import-configuration"
      size="xl"
      title="Import configuration"
      hide-footer
      hide-header
      ><ConfigLoader
    /></b-modal>
    <!-- <b-modal id="configuration-wizzard" size="xl" title="Picker Configuration" hide-footer hide-header><PickerOptions /></b-modal> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import ConfigLoader from './../components/picker/ConfigLoader.vue';
import PickerOptions from './PickerOptions.vue';

@Component({
  components: {
    ConfigLoader,
    PickerOptions,
  },
})
export default class Home extends Vue {
  @Getter('clientConfig') clientConfig: any;
  @Getter('fingerprint') fp: any;

  @Mutation('setClientConfig') setClientConfig: any;

  setApikey(e: any) {
    this.setClientConfig({
      ...this.clientConfig,
      ...{
        apikey: e.target.value,
      },
    });
  }

  setPolicy(e: any) {
    this.setClientConfig({
      ...this.clientConfig,
      ...{
        security: {
          policy: e.target.value,
        },
      },
    });
  }

  setSignature(e: any) {
    this.setClientConfig({
      ...this.clientConfig,
      ...{
        security: {
          signature: e.target.value,
        },
      },
    });
  }

  setCname(e: any) {
    this.setClientConfig({
      ...this.clientConfig,
      ...{
        cname: e.target.value,
      },
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fp-info {
  font-size: 50%;
}

.fs-debug-home .row .col .card {
  height: 100%;
}
</style>
