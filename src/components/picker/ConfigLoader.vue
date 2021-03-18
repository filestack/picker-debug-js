<template>
  <div class="fs-debug-config-loader">
    <codemirror ref="cm" v-model="model" class="import-config-editor" :options="cmOptions"></codemirror>
    <b-button class="mt-2" variant="primary" block @click="save">Save</b-button>
    <b-button class="mt-2" variant="outline-warning" block @click="close">Cancel</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/display/autorefresh.js';

// linter
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/javascript-lint.js';

@Component({
  components: {
    codemirror
  }
})
export default class ConfigLoader extends Vue {
  
  @Getter('picker/runCode') runcode: string;
  @Mutation('picker/setRunCode') setRunCode: any;

  public model = '';

  public cmOptions = {
    tabSize: 2,
    styleActiveLine: true,
    autofocus: true,
    autoRefresh:true,
    lineNumbers: true,
    line: true,
    foldGutter: true,
    styleSelectedText: true,
    mode: 'text/javascript',
    matchBrackets: true,
    theme: 'monokai',
    gutters: ['CodeMirror-lint-markers'],
    lint: {
      esversion: 6
    }
  };

  mounted() {
    this.model = this.runcode;
  }

  close() {
    this.$bvModal.hide('import-configuration');
  }

  save() {
    this.setRunCode(this.model);

    this.$bvModal.hide('import-configuration');
    this.$bvToast.toast('Settings saved', {
      title: `Importer`,
      variant: 'success',
      solid: true
    });
  }
}
</script>

<style lang="scss">
  .CodeMirror-lint-tooltip {
    z-index:999999
  }

  .import-config-editor {
    font-size: 1.2rem;
    line-height: 1.2rem;
  }
</style>
