<template>
  <cv-wrapper :tag-type="formItem ? 'div' : ''" class="cv-search bx--form-item">
    <div class="bx--search" :class="[searchClasses, { 'cv-search': !formItem }]" role="search" ref="search">
      <label :for="uid" class="bx--label">{{ label }}</label>

      <input
        :id="uid"
        class="bx--search-input"
        v-bind="$attrs"
        v-model="internalValue"
        v-on="inputListeners"
        type="text"
        role="search"
        ref="input"
        :placeholder="placeholder"
        :aria-labelledby="uid"
        @blur="checkFocus"
      />

      <button
        type="button"
        v-if="isToolbarKind"
        class="bx--toolbar-search__btn"
        aria-label="Toolbar search"
        @click="toggleActive(true)"
        @blur="checkFocus"
      >
        <Search16 class="bx--search-magnifier" />
      </button>
      <Search16 v-if="!isToolbarKind" class="bx--search-magnifier" />
      <button
        type="button"
        class="bx--search-close"
        :class="{ 'bx--search-close--hidden': !clearVisible }"
        title="Clear search input"
        aria-label="Clear search input"
        @click="onClearClick"
      >
        <Close16 />
      </button>
    </div>
  </cv-wrapper>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
import Search16 from '@rocketsoftware/icons-vue/es/search/16';
import Close16 from '@rocketsoftware/icons-vue/es/close/16';
import CvWrapper from '../cv-wrapper/_cv-wrapper';

export default {
  name: 'CvSearch',
  mixins: [uidMixin, themeMixin],
  components: { Close16, Search16, CvWrapper },
  inheritAttrs: false,
  props: {
    formItem: { type: Boolean, default: true },
    kind: { type: String, default: null },
    label: String,
    small: Boolean,
    large: {
      type: Boolean,
      default: null,
      validator(val) {
        if (process.env.NODE_ENV === 'development') {
          if (val !== null) {
            console.warn('The larger search input is now the default.');
          }
        }
        return true;
      },
    },
    value: String,
    placeholder: { type: String, default: 'Search' },
  },
  data() {
    return {
      clearVisible: this.value ? this.value.length : false,
      internalValue: this.value,
      toolbarActive: false,
    };
  },
  watch: {
    value() {
      this.clearVisible = this.value ? this.value.length : false;
      this.internalValue = this.value;
    },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
      };
    },
    searchClasses() {
      const themeClass = this.theme.length ? `bx--search--${this.theme}` : '';
      const sizeClass = `bx--search--${this.small ? 'sm' : 'xl'}`;
      let toolbarClasses = '';
      if (this.isToolbarKind) {
        toolbarClasses = this.toolbarActive ? 'bx--toolbar-search bx--toolbar-search--active' : 'bx--toolbar-search';
      }
      return `${themeClass} ${sizeClass} ${toolbarClasses}`;
    },
    closeHiddenClass() {
      return this.clearVisible ? '' : 'bx--search-close--hidden';
    },
    isToolbarKind() {
      return this.kind === 'toolbar';
    },
  },
  methods: {
    onClearClick() {
      this.internalValue = '';
      this.clearVisible = false;
      this.$emit('input', this.internalValue);
    },
    onInput() {
      this.clearVisible = this.internalValue.length > 0;
      return this.$emit('input', this.internalValue);
    },
    toggleActive(force) {
      if (typeof force === 'boolean') {
        this.toolbarActive = force;
      } else {
        this.toolbarActive = !this.toolbarActive;
      }
      if (this.toolbarActive) {
        this.$refs.input.focus();
      }
    },
    checkFocus(ev) {
      if (this.isToolbarKind) {
        if (!this.$el.contains(ev.relatedTarget)) {
          this.toolbarActive = false;
        }
      }
    },
  },
};
</script>
<style lang="scss">
.cv-search {
  .bx--search-magnifier {
    pointer-events: none;
  }
}
</style>
