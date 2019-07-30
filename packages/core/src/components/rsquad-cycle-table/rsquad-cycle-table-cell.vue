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
import checkmark from '@carbon/icons-vue/es/checkmark--filled/16';
import warn from '@carbon/icons-vue/es/warning--filled/16';
import close from '@carbon/icons-vue/es/close--filled/16';
import na from '@carbon/icons-vue/es/help--filled/16';
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
