<template>
  <sv-view
    class="sv-template-view"
    :class="{
      'sv-template-view--margin': svMargin,
      'sv-template-view--alt-back': svAltBack,
    }"
  >
    <section class="sv-template-view__component" :style="style">
      <cv-inline-notification
        v-if="underConstruction"
        class="sv-under-construction"
        title="Under review"
        :sub-title="
          `This component isn't quite ready. ${
            underConstruction !== true
              ? underConstruction
              : 'Hopefully no features will get broken but this cannot be guarenteed'
          }`
        "
        kind="warning"
      />
      <slot name="component"></slot>
    </section>
    <section class="sv-template-view__other" :style="otherStyle">
      <h2 class="sv-template-view__label">Sample interaction</h2>
      <slot name="other"></slot>
    </section>
    <section class="sv-template-view__code" :style="otherStyle">
      <h2 class="sv-template-view__label">Sample code</h2>
      <pre v-highlightjs="svSource">
        <code class="html"></code>
      </pre>
      <h2 class="sv-template-view__label">Sample props</h2>
      <pre v-highlightjs="propsJSON">
        <code class="json"></code>
      </pre>
      <button @click="sourceToClipboard" title="Copy to clipboard" class="sv-template-view__copy" ref="copyButton">
        <svg width="18" height="24" viewBox="0 0 18 24" fill-rule="evenodd">
          <path d="M13 5V0H0v19h5v5h13V5h-5zM2 17V2h9v3H5v12H2zm14 5H7V7h9v15z" />
          <path d="M9 9h5v2H9zM9 12h5v2H9zM9 15h3v2H9z" />
        </svg>
      </button>
      <textarea class="sv-template-view__clippy" aria-hidden="true" ref="clippy"></textarea>
    </section>
  </sv-view>
</template>

<script>
import Vue from 'vue';
import SvView from './sv-view.vue';
import { CvInlineNotification } from '@rocketsoftware/vue/src';

export default {
  name: 'SvTemplateView',
  components: {
    SvView,
    CvInlineNotification,
  },
  props: {
    svMargin: { type: Boolean, default: true },
    svSource: String,
    svAltBack: { type: Boolean, default: true },
    svPosition: String, // flex position
    svExtraMargin: { type: String, default: '20px' },
    svPadding: String,
    underConstruction: { type: [Boolean, String], default: false },
  },
  data() {
    return {
      propsJSON: '',
    };
  },
  computed: {
    otherStyle() {
      return {
        marginLeft: this.svExtraMargin,
      };
    },
    style() {
      return {
        padding: this.svPadding,
        alignItems: this.svPosition && this.svPosition.length ? this.svPosition : 'flex-start',
        marginLeft: this.svExtraMargin,
      };
    },
  },
  mounted() {
    this.propsJSON = JSON.stringify(this.$vnode.context.$options.propsData, null, 2);
  },
  updated() {
    this.propsJSON = JSON.stringify(this.$vnode.context.$options.propsData, null, 2);
  },
  methods: {
    sourceToClipboard() {
      this.$refs.copyButton.classList.remove('sv-template-view__copy--copied');
      this.$refs.clippy.value = this.svSource;
      this.$refs.clippy.select();
      document.execCommand('copy');
      Vue.nextTick(this.$refs.copyButton.classList.add('sv-template-view__copy--copied'));
    },
    method(methodName) {
      const result = this.$slots.component[0].componentInstance[methodName];
      if (!result) {
        // console.dir(this.$slots.component[0].componentInstance);
        return () => {
          console.warn(`sv-template-view: Method ${methodName} does not exist.`);
        };
      }
      return result;
    },
  },
};
</script>

<style lang="scss">
@import '~highlight.js/styles/default.css';

$back-color: #f5f7fa;
$back-color-exp: #f3f3f3;
$alt-back-color: #fff;
$border: 1px solid #dfe3e6;
$component-padding: 20px;

.sv-template-view {
  border: 1px solid transparent;
  background-color: $back-color-exp;
}

.sv-template-view__component {
  display: flex;
  flex-direction: column;
  border: $border;
  background-color: $back-color-exp;

  .carbon & {
    background-color: $back-color;
  }

  .sv-template-view--margin & {
    position: relative; // needed to keep modal components on top
    z-index: 999; // needed to keep modal components on top
    margin: $component-padding;
    padding: $component-padding * 2;
  }

  .sv-template-view--alt-back & {
    background-color: $alt-back-color;
  }

  > .bx--form .bx--form-item {
    // only for
    margin-bottom: 2rem;
  }
}

.sv-template-view__other {
  .sv-template-view--margin & {
    margin: $component-padding;
  }
}

.sv-template-view__code {
  position: relative;

  .sv-template-view--margin & {
    margin: $component-padding;
  }

  .html {
    padding: $component-padding * 2;
  }

  .hljs {
    border: $border;
    background-color: $alt-back-color;
  }
}

@keyframes copied {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.sv-template-view__copy {
  position: absolute;
  top: 39px;
  left: 0;

  &.sv-template-view__copy--copied::after {
    content: 'Copied!';
    display: block;
    position: absolute;
    top: 8px;
    left: $component-padding * 2;
    animation: copied 1s linear;
    opacity: 0;
  }
}

.sv-template-view__clippy {
  position: absolute;
  opacity: 0;
}

.sv-template-view__label {
  margin-bottom: 1em;
  font-size: 24px;
}

.sv-template-view__code {
  .sv-template-view__label {
    margin: 0;
  }
}

/* stylelint-disable-next-line selector-class-pattern */
.sv-under-construction .bx--inline-notification__close-button {
  display: none;
}

.sb-show-main {
  margin: 0;
}
</style>
