<template>
  <component :is="tagType" v-on="$listeners" :to="to" :href="href" class="cv-skip-to-content bx--skip-to-content">
    <slot>Skip to main content</slot>
  </component>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvSkipToContent',
  mixins: [LinkMixin],
};
</script>
