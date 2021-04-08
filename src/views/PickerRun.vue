<template>
  <div class="fs-debug-picker-runner container-fluid">
    <div v-if="!this.$route.params.msgpack">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">Sharable URL:</h2>
              <input ref="encodedUrl" type="text" class="w-100" readonly :value="getEncodedUrl()" />
              <div class="d-flex justify-content-center mt-2">
                <b-button variant="success" class="mr-2" @click="copyEncodedUrl()">Copy</b-button>
                <b-button variant="success" @click="showQRModal()">Show QR Code</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <div class="card">
          <div class="card-body d-flex justify-content-center">
            <div id="picker-demo"></div>
          </div>
        </div>
      </div>
    </div>
  
    <b-modal id="download-link" title="Report download link" hide-footer modal-class="b-modal">
      Please download file from
      <a
        :download="`debug-log-for-${clientConfig.apikey}.json`"
        :href="downloadLink"
        >[link]</a
      >
      and send it to filestack support.
    </b-modal>

    <b-modal id="qr-code" @shown="generateQRCode" title="QR Code" hide-footer modal-class="b-modal">
      <div class="d-flex justify-content-center">
        <canvas ref="qrCanvas" style="width:400px;height:400px"></canvas>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import QRCode from 'qrcode';
import { Component, Vue } from 'vue-property-decorator';
import { Filestack } from 'filestack-js';
import { Getter, State } from 'vuex-class';
import msgpack from 'tiny-msgpack';
import { LoggerInstance } from './../logger';

@Component
export default class PickerOptions extends Vue {
  private downloadLink = '';

  @State('picker') picker: any;
  @Getter('clientConfig') clientConfig: any;

  mounted() {
    const packedParam = this.$route.params.msgpack;
    let config = this.clientConfig;
    let runcode = this.picker.runCode;

    if (packedParam) {
      const decoded = msgpack.decode(this.base64ToArrayBuffer(packedParam));
  
      if (decoded && decoded.runcode && decoded.config) {
        console.log(decoded);
        runcode = decoded.runcode;
        config = decoded.config;
      }
    }

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
    LoggerInstance.setRuncode(this.picker.runCode);

    // @ts-ignore
    const debugDoneCallback = this.onUploadDone;

    try {
      // sandbox picker from application
      (function(runcode) {
        // @ts-ignore
        const client = Filestack(config.apikey, options);
        client.on(
          'upload.error',
          LoggerInstance.addException.bind(LoggerInstance)
        );
        eval(runcode);
      })(runcode);
    } catch (e) {
      LoggerInstance.addException(e);
      console.error();
    }
  }

  getEncodedUrl() {
    const config = this.clientConfig;
    const runcode = this.picker.runCode;

    const encoded: Uint8Array = msgpack.encode({ config, runcode });
    const path = this.$router.resolve({
      name: 'picker-runner-param',
      params: {
        msgpack: this.arrayBufferToBase64(encoded),
      },
    }).href;

    return `${window.location.origin}${path}`;
  }

  showQRModal() {
    this.$bvModal.show('qr-code');
  }

  generateQRCode() {
    QRCode.toCanvas(this.$refs.qrCanvas, this.getEncodedUrl(), { width: 400, height: 400 }, (error: any) =>  {
      if (error) {
        console.error(error)
      }
    });
  }

  copyEncodedUrl() {
    const encodedUrl = this.getEncodedUrl();
    // @ts-ignore
    this.$clipboard(encodedUrl);
    this.$bvToast.toast('URL has been copied to your clipboard', { variant: 'success' });
  }

  onUploadDone(res: any) {
    LoggerInstance.addLog('UploadDone', res);

    this.downloadLink = LoggerInstance.getDownloadLink();
    this.$bvModal.show('download-link');
  }

  private arrayBufferToBase64(buffer: Uint8Array) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  private base64ToArrayBuffer(base64: string) {
    const binnaryString = window.atob(base64);
    const len = binnaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binnaryString.charCodeAt(i);
    }
    return bytes;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#qr-code___BV_modal_outer_,
#download-link___BV_modal_outer_ {
  z-index:11111111111!important;
}
#picker-demo {
  width: 50vw;
  height: 50vh;
  min-height: 400px;
  min-width: 400px;
}
</style>
