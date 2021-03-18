<template>
  <div class="fs-debug-home container-fluid">
    <div class="row">
      <div class="col-sm">
        <v-select
          multiple
          placeholder="Select picker sources"
          label="fromSources"
          @input="setConfigValue('fromSources', $event)"
          :value="getConfigValue('fromSources')"
          :options="sources"
        />
      </div>
    </div>
     <div class="row">
      <div class="col-sm">
        <label for="i-accept" class="form-label">accept</label>
        <input
          type="text"
          class="form-control"
          id="i-accept"
          placeholder="Accept mimetypes"
          :value="getConfigArray('accept')"
          @input="setConfigArray('accept', $event.target.value)"
          trim
        />
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <label for="i-max-size" class="form-label">maxSize</label>
        <input
          type="text"
          class="form-control"
          id="i-max-size"
          placeholder="Max file size"
          :value="getConfigValue('maxSize')"
          @input="setConfigValue('maxSize', $event.target.value)"
          trim
        />
      </div>
    </div>
    <div class="row">
       <div class="col-sm">
        <label for="i-min-files" class="form-label">minFiles</label>
        <input
          type="text"
          class="form-control"
          id="i-max-size"
          placeholder="Min files clount"
          :value="getConfigValue('minFiles')"
          @input="setConfigValue('minFiles', $event.target.value)"
          trim
        />
      </div>
      <div class="col-sm">
        <label for="i-max-files" class="form-label">maxFiles</label>
        <input
          type="text"
          class="form-control"
          id="i-max-files"
          placeholder="Max files count"
          :value="getConfigValue('maxFiles')"
          @input="setConfigValue('maxFiles', $event.target.value)"
          trim
        />
      </div>
    </div>
    <div class="row">
       <div class="col-sm">
        <label for="i-concurrency" class="form-label">concurrency</label>
        <input
          type="text"
          class="form-control"
          id="i-concurrency"
          placeholder="Upload concurrency"
          :value="getConfigValue('concurrency')"
          @input="setConfigValue('concurrency', $event.target.value)"
          trim
        />
      </div>
      <div class="col-sm">
        <label for="i-errorsTimeout" class="form-label">errorsTimeout</label>
        <input
          type="text"
          class="form-control"
          id="i-errorsTimeout"
          placeholder="Errors timeout in ms"
          :value="getConfigValue('errorsTimeout')"
          @input="setConfigValue('errorsTimeout', $event.target.value)"
          trim
        />
      </div>
    </div>
    <div class="row">
       <div class="col-sm">
        <label for="i-supportEmail" class="form-label">supportEmail</label>
        <input
          type="text"
          class="form-control"
          id="i-supportEmail"
          placeholder="Email displayed to user on error"
          :value="getConfigValue('supportEmail')"
          @input="setConfigValue('supportEmail', $event.target.value)"
          trim
        />
       </div>
       <div class="col-sm">
         <label for="i-lang" class="form-label">lang</label>
          <v-select
            placeholder="Language"
            id="i-lang"
            label="Lang"
            @input="setConfigValue('lang', $event)"
            :value="getConfigValue('lang')"
            :options="langs"
          />
       </div>
       <div class="col-sm">
         <label for="i-viewType" class="form-label">viewType</label>
          <v-select
            id="i-viewType"
            placeholder="View type for picker list"
            label="viewType"
            @input="setConfigValue('viewType', $event)"
            :value="getConfigValue('viewType')"
            :options="['list', 'grid']"
          />
       </div>
    </div>
    <div class="row pt-5">
      <div class="col-sm">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            @input="setConfigValue('hideModalWhenUploading', $event.target.value)"
            :checked="getConfigValue('hideModalWhenUploading')"
            id="hideModalWhenUploading"
          />
          <label class="form-check-label" for="hideModalWhenUploading">
            hideModalWhenUploading
          </label>
        </div>
      </div>

      <div class="col-sm">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            @input="setConfigValue('uploadInBackground', $event.target.checked)"
            :checked="getConfigValue('uploadInBackground')"
            id="uploadInBackground"
          />
          <label class="form-check-label" for="uploadInBackground">
            uploadInBackground
          </label>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            @input="setConfigValue('allowManualRetry', $event.target.checked)"
            :checked="getConfigValue('allowManualRetry')"
            id="allowManualRetry"
          />
          <label class="form-check-label" for="allowManualRetry">
            allowManualRetry
          </label>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            @input="setConfigValue('disableThumbnails', $event.target.checked)"
            :checked="getConfigValue('disableThumbnails')"
            id="disableThumbnails"
          />
          <label class="form-check-label" for="disableThumbnails">
            disableThumbnails
          </label>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            @input="setConfigValue('disableStorageKey', $event.target.checked)"
            :checked="getConfigValue('disableStorageKey')"
            id="disableStorageKey"
          />
          <label class="form-check-label" for="disableStorageKey">
            disableStorageKey
          </label>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            @input="setConfigValue('disableTransformer', $event.target.checked)"
            :checked="getConfigValue('disableTransformer')"
            id="disableTransformer"
          />
          <label class="form-check-label" for="disableTransformer">
            disableTransformer
          </label>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-sm">
        <div class="form-check">
          <h5>Transformations</h5>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            @input="setConfigValue('transformations.crop', $event.target.checked)"
            :checked="!!getConfigValue('transformations.crop')"
            id="t-crop"
          />
          <label class="form-check-label" for="t-crop">
            crop
          </label>
        </div>
      </div>
      <div class="col-sm"  v-if="!!getConfigValue('transformations.crop')">
          <input
            type="text"
            class="form-control"
            id="i-aspect-ratio"
            placeholder="Aspect ratio"
            :value="getConfigValue('transformations.crop.aspectRatio')"
            @input="setConfigValue('transformations.crop.aspectRatio', $event.target.value)"
            trim
          />
      </div>
      <div class="col-sm" v-if="!!getConfigValue('transformations.crop')">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            @input="setConfigValue('transformations.crop.force', $event.target.checked)"
            :checked="getConfigValue('transformations.crop.force')"
            id="t-crop-force"
          />
          <label class="form-check-label" for="t-crop-force">
            crop.force
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            @input="setConfigValue('transformations.circle', $event.target.checked)"
            :checked="getConfigValue('transformations.circle')"
            id="t-circle"
          />
          <label class="form-check-label" for="t-circle">
            circle
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            @input="setConfigValue('transformations.rotate', $event.target.checked)"
            :checked="getConfigValue('transformations.rotate')"
            id="t-rotate"
          />
          <label class="form-check-label" for="t-rotate">
            rotate
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class';

@Component
export default class General extends Vue {

  @State('picker') picker: any;

  @Getter('picker/getConfigKey') getConfigKey: any;
  @Getter('picker/sources') sources: any;
  @Getter('picker/langs') langs: any;

  // eslint-disable-next-line
  @Mutation('picker/setConfigKey') setConfigKey: ({
    key,
    value,
  }: {
    key: string;
    value: any;
  }) => {};

  public getConfigValue(key: string) {
    return this.getConfigKey(key);
  }

  public setConfigValue(key: string, value: any) {
    return this.setConfigKey({ key, value });
  }

  public setConfigArray(key: string, value: string) {
    return this.setConfigKey({ key, value: value.split(',') });
  }

  public getConfigArray(key: string) {
    const val = this.getConfigKey(key);

    if (Array.isArray(val)) {
      return val.join(',');
    }

    return val;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
