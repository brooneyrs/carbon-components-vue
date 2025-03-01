<template>
  <div class="cv-text-input bx--form-item">
    <label
      :for="uid"
      :class="[
        'bx--label',
        {
          'bx--label--disabled': $attrs.disabled !== undefined && $attrs.disabled,
        },
      ]"
      >{{ label }}</label
    >
    <div v-if="isHelper" class="bx--form__helper-text" :class="{ 'bx--form__helper-text--disabled': $attrs.disabled }">
      <slot name="helper-text">{{ helperText }}</slot>
    </div>
    <div class="bx--text-input__field-wrapper" :data-invalid="isInvalid">
      <WarningFilled16 v-if="isInvalid" class="bx--text-input__invalid-icon" />
      <input
        :id="uid"
        class="bx--text-input"
        :class="{ 'bx--text-input--light': theme === 'light', 'bx--text-input--invalid': isInvalid }"
        v-bind="$attrs"
        :value="value"
        v-on="inputListeners"
        :data-toggle-password-visibility="isPassword"
        :type="dataType"
        ref="input"
      />
      <button
        v-if="isPassword"
        class="bx--text-input--password__visibility"
        :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
        @click="togglePasswordVisibility"
      >
        <ViewOff16 v-if="isPasswordVisible" class="bx--icon-visibility-off" />
        <View16 v-else class="bx--icon-visibility-off" />
      </button>
    </div>
    <div class="bx--form-requirement" v-if="isInvalid">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
import WarningFilled16 from '@rocketsoftware/icons-vue/es/warning--filled/16';
import View16 from '@rocketsoftware/icons-vue/es/view/16';
import ViewOff16 from '@rocketsoftware/icons-vue/es/view--off/16';

export default {
  name: 'CvTextInput',
  components: { WarningFilled16, View16, ViewOff16 },
  mixins: [uidMixin, themeMixin],
  inheritAttrs: false,
  props: {
    helperText: { type: String, default: null },
    invalidMessage: { type: String, default: null },
    label: String,
    passwordVisible: Boolean,
    theme: String,
    type: String,
    value: String,
  },
  data() {
    return {
      dataPasswordVisible: this.isPassword && this.passwordVisible,
      dataType: this.type,
    };
  },
  watch: {
    passwordVisible() {
      if (this.passwordVisible !== this.dataPasswordVisible) {
        this.togglePasswordVisibility();
      }
    },
    type() {
      this.dataType = this.type;
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
      return this.$slots['helper-text'] || (this.helperText && this.helperText.length);
    },
    isPassword() {
      return this.type === 'password';
    },
    isPasswordVisible() {
      return this.isPassword && this.dataPasswordVisible;
    },
  },
  methods: {
    togglePasswordVisibility() {
      const currentValue = this.$refs.input.value;
      this.dataPasswordVisible = !this.dataPasswordVisible;
      this.dataType = this.dataPasswordVisible ? 'text' : 'password';

      this.$nextTick(() => {
        this.$refs.input.value = currentValue;
      });
    },
  },
};
</script>
