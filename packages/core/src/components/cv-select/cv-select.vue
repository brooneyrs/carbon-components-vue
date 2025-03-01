<template>
  <cv-wrapper :tag-type="formItem ? 'div' : ''" class="cv-select bx--form-item">
    <div
      :data-test="value"
      class="bx--select"
      :class="{
        'cv-select': !formItem,
        'bx--select--inline': inline,
        'bx--select--light': theme === 'light',
        'bx--select--invalid': isInvalid,
        'bx--select--disabled': $attrs.disabled,
      }"
    >
      <label
        :for="uid"
        class="bx--label"
        :class="{ 'bx--visually-hidden': hideLabel, 'bx--label--disabled': $attrs.disabled }"
        >{{ label }}</label
      >

      <div v-if="!inline && isHelper" class="bx--form__helper-text">
        <slot name="helper-text">{{ helperText }}</slot>
      </div>

      <cv-wrapper :tag-type="inline ? 'div' : ''" class="bx--select-input--inline__wrapper">
        <div class="bx--select-input__wrapper" :data-invalid="isInvalid">
          <select
            v-bind="$attrs"
            :id="uid"
            class="bx--select-input"
            v-on="inputListeners"
            ref="select"
            :value="internalValue"
          >
            <slot></slot>
          </select>
          <chevron-down-glyph class="bx--select__arrow" />
          <warning-filled-16 v-if="isInvalid" class="bx--select__invalid-icon" />
        </div>

        <div v-if="isInvalid" class="bx--form-requirement">
          <slot name="invalid-message">{{ invalidMessage }}</slot>
        </div>
        <!-- cv-wrapper div bx--select-input--inline__wrapper -->
      </cv-wrapper>

      <div v-if="inline && isHelper" class="bx--form__helper-text">
        <slot name="helper-text">{{ helperText }}</slot>
      </div>
    </div>
    <!-- cv-wrapper div bx--form-item -->
  </cv-wrapper>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
import CvWrapper from '../cv-wrapper/_cv-wrapper';
import ChevronDownGlyph from '@rocketsoftware/icons-vue/es/chevron--down/index';
import WarningFilled16 from '@rocketsoftware/icons-vue/es/warning--filled/16';

export default {
  name: 'CvSelect',
  inheritAttrs: false,
  components: { CvWrapper, ChevronDownGlyph, WarningFilled16 },
  mixins: [uidMixin, themeMixin],
  props: {
    inline: Boolean,
    invalidMessage: { type: String, default: null },
    helperText: { type: String, default: null },
    formItem: { type: Boolean, default: true },
    hideLabel: Boolean,
    label: { type: String, required: true },
    // *********************
    // declare here to prevent the following from being added to the select
    // *********************
    // multiple does not work with styling from carbon-components 9.20
    multiple: {
      type: String,
      validator: () => {
        console.warn('property multiple not supported in CvSelect');
        return false;
      },
    },
    value: { type: String, default: null },
  },
  beforeCreate() {
    // *********************
    // delete here to prevent the following from being added to the select
    // *********************
    // multiple does not work with styling from carbon-components 9.20
    delete this.$attrs.multiple;
  },
  data() {
    return { dataValue: null };
  },
  mounted() {
    // this is needed to ensure selected for an option when no value is supplied
    if (this.value === null) {
      let options = this.$el.querySelectorAll('option');
      for (let i = 0; i < options.length; i++) {
        if (options[i].attributes.selected) {
          this.dataValue = options[i].value;
        }
      }
    }
  },
  watch: {
    value() {
      // this is needed to ensure selected for an option when no value is supplied
      if (this.value === null) {
        let options = this.$el.querySelectorAll('option');
        for (let i = 0; i < options.length; i++) {
          if (options[i].attributes.selected) {
            this.dataValue = options[i].value;
          }
        }
      }
    },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value),
      };
    },
    isInvalid() {
      return this.$slots['invalid-message'] !== undefined || (this.invalidMessage && this.invalidMessage.length);
    },
    isHelper() {
      return this.$slots['helper-text'] !== undefined || (this.helperText && this.helperText.length);
    },
    internalValue() {
      return this.dataValue ? this.dataValue : this.value;
    },
  },
};
</script>
