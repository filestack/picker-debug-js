<template>
  <div class="fs-debug-picker-runner container-fluid">
    <div id="picker-demo"></div>
  
    <b-modal
      id="download-link"
      title="Report download link"
      hide-footer
    >
      Please download file from 
      <a :download="`debug-log-for-${clientConfig.apikey}.json`" :href="downloadLink">[link]</a> 
      and send it to filestack support.
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Filestack } from 'filestack-js';
import { Getter, State } from 'vuex-class';
import { LoggerInstance } from './../logger';

@Component
export default class PickerOptions extends Vue {

  private downloadLink = '';

  @State('picker') picker: any;
  @Getter('clientConfig') clientConfig: any;

  mounted() {

    const config = this.clientConfig;
    const options: any = {};

    if (
      config.security &&
      config.security.policy &&
      config.security.signature &&
      config.security.policy.length &&
      config.security.signature.length
    ) {
      options.security = config.security;
    }

    if (config.cname && config.cname.length) {
      options.cname = config.cname;
    }

    LoggerInstance.setApikey(this.clientConfig.apikey);
    LoggerInstance.setConfig(config);
    LoggerInstance.setRuncode(this.picker.runCode)
  
    // @ts-ignore
    const debugDoneCallback = this.onUploadDone;

    try {
      // sandbox picker from application
      (function(t) {
        // @ts-ignore
        const client = Filestack(config.apikey, options);
        client.on('upload.error', LoggerInstance.addException.bind(LoggerInstance))
        eval(t.picker.runCode);
      })(this);
    } catch (e) {
      LoggerInstance.addException(e);
      console.error();
    }
  }

  onUploadDone(res: any) {
    LoggerInstance.addLog('UploadDone', res);
    
    this.downloadLink = LoggerInstance.getDownloadLink();
    console.log(this.downloadLink);
    this.$bvModal.show('download-link')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#picker-demo {
  width: 50vw;
  height: 50vh;
  min-height: 400px;
  min-width: 400px;
}
</style>
