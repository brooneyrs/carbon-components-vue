<template>
  <component
    :is="tagType"
    v-on="$listeners"
    :to="to"
    :href="href"
    class="cv-switcher-item-link bx--switcher__item-link"
    :class="{ 'bx--switcher__item-link--selected': selected }"
  >
    <slot />
  </component>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvSwitcherItemLink',
  mixins: [LinkMixin],
  props: {
    selected: Boolean,
  },
};
</script>

<style lang="scss"></style>
