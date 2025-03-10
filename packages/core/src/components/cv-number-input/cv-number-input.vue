<template>
  <cv-wrapper :tag-type="formItem ? 'div' : ''" class="cv-number-input bx--form-item">
    <div
      data-numberinput
      class="bx--number"
      :class="{
        'bx--number--light': theme === 'light',
        'bx--number--helpertext': isHelper,
        'cv-number-input': !formItem,
      }"
      :data-invalid="isInvalid"
    >
      <label :for="uid" class="bx--label">{{ label }}</label>
      <div class="bx--form__helper-text" v-if="isHelper">
        <slot name="helper-text">{{ helperText }}</slot>
      </div>
      <div class="bx--number__input-wrapper">
        <input :id="uid" type="number" v-model="internalValue" v-bind="$attrs" v-on="inputListeners" />
        <WarningFilled16 v-if="isInvalid" class="bx--number__invalid" />
        <div class="bx--number__controls">
          <button class="bx--number__control-btn up-icon" @click="doUp" type="button">
            <CaretUpGlyph />
          </button>
          <button class="bx--number__control-btn down-icon" @click="doDown" type="button">
            <CaretDownGlyph />
          </button>
        </div>
      </div>
      <div class="bx--form-requirement" v-if="isInvalid">
        <slot name="invalid-message">{{ invalidMessage }}</slot>
      </div>
    </div>
  </cv-wrapper>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
import CaretDownGlyph from '@rocketsoftware/icons-vue/es/caret--down/index';
import CaretUpGlyph from '@rocketsoftware/icons-vue/es/caret--up/index';
import WarningFilled16 from '@rocketsoftware/icons-vue/es/warning--filled/16';
import CvWrapper from '../cv-wrapper/_cv-wrapper';

export default {
  name: 'CvNumberInput',
  mixins: [uidMixin, themeMixin],
  components: { CaretDownGlyph, CaretUpGlyph, WarningFilled16, CvWrapper },
  inheritAttrs: false,
  props: {
    formItem: { type: Boolean, default: true },
    helperText: { type: String, default: null },
    invalidMessage: { type: String, default: null },
    label: String,
    value: String,
    invalid: /* deprecate */ {
      type: Boolean,
      default: undefined,
      validator(val) {
        if (val !== undefined) {
          console.warn('CvNumberInput: invalid prop deprecated in favour of invalidMessage');
        }
        return true;
      },
    },
  },
  data() {
    return {
      internalValue: this.value,
    };
  },
  watch: {
    value() {
      this.internalValue = this.value;
    },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: () => this.$emit('input', this.internalValue),
      });
    },
    internalIntValue() {
      let intVal = parseInt(this.internalValue, 10);

      if (isNaN(intVal)) {
        intVal = 0;
      }
      return intVal;
    },
    isInvalid() {
      return this.$slots['invalid-message'] !== undefined || (this.invalidMessage && this.invalidMessage.length);
    },
    isHelper() {
      return this.$slots['helper-text'] !== undefined || (this.helperText && this.helperText.length);
    },
  },
  methods: {
    doUp() {
      this.internalValue = `${this.internalIntValue + 1}`;
      this.$emit('input', this.internalValue);
    },
    doDown() {
      this.internalValue = `${this.internalIntValue - 1}`;
      this.$emit('input', this.internalValue);
    },
  },
};
</script>
