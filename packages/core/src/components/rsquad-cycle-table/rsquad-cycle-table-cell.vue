<template>
  <td :style="cellStyle">
    <div class="status__icon last_elem" v-if="this.$slots.default[0].text.includes('%')">
      <checkmark v-if="getStatus === 100" class="status__icon-color--green small" />
      <warn v-else-if="getStatus > 79" class="status__icon-color--yellow small" />
      <close v-else-if="getStatus" class="status__icon-color--red small" />
      <na v-else class="status__icon-color--na small" />
    </div>
    <slot />
  </td>
</template>

<script>
import checkmark from '../assets/images/checkmark--solid-small.svg';
import warn from '../assets/images/warning--solid-small.svg';
import close from '../assets/images/close--solid-small.svg';
import na from '../assets/images/help--glyph-small.svg';
export default {
  name: 'CvDataTableCell',
  props: {
    cellStyle: {},
    cycle: Object,
  },
  components: {
    checkmark,
    warn,
    close,
    na,
  },
  computed: {
    getStatus: function() {
      return parseInt(this.$slots.default[0].text.substring(0, this.$slots.default[0].text.length - 1));
    },
  },
};
</script>
