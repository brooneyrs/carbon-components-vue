<template>
  <li class="bx--side-nav__menu-item">
    <component
      :is="tagType"
      v-on="$listeners"
      :to="to"
      :href="href"
      class="bx--side-nav__link"
      v-bind="$attrs"
      :class="{ 'bx--side-nav__link--current': active }"
      role="menuitem"
    >
      <cv-side-nav-link-text>
        <slot />
      </cv-side-nav-link-text>
    </component>
  </li>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';
import CvSideNavLinkText from './_cv-side-nav-link-text';

export default {
  name: 'CvSideNavMenuItem',
  inheritAttrs: false,
  mixins: [LinkMixin],
  components: { CvSideNavLinkText },
  props: {
    active: Boolean,
  },
};
</script>

<style lang="scss"></style>
