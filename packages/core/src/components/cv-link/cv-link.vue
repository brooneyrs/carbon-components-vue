<template>
  <component :is="tagType" v-on="$listeners" :to="to" :href="href" class="cv-link bx--link">
    <slot></slot>
  </component>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvLink',
  mixins: [LinkMixin],
};
</script>
