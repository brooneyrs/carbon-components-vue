<template>
  <td :style="cellStyle">
    <div class="status__icon last_elem" v-if="this.$slots.default[0].text.includes('%')">
      <checkmark v-if="getStatus === 100" class="status__icon-color--green small" />
      <warn v-else-if="getStatus > 79" class="status__icon-color--yellow small" />
      <close v-else-if="getStatus" class="status__icon-color--red small" />
      <na v-else class="status__icon-color--na small" />
      <slot />
    </div>
    <div v-else-if="colIndex === 0 && cycle.executions[0].publish_method === 'taf' && this.$slots.default[0].text.length">
      <router-link
        :to="{
          name: 'executions',
          params: {
            releaseID: releaseID,
            projectID: projectID,
            cycleID: cycle.id,
            executionID: getID(),
          },
        }"
        >{{ this.$slots.default[0].text }}</router-link
      >
    </div>
    <slot v-else />
  </td>
</template>

<script>
import checkmark from '@rocketsoftware/icons-vue/es/checkmark--filled/16';
import warn from '@rocketsoftware/icons-vue/es/warning--filled/16';
import close from '@rocketsoftware/icons-vue/es/close--filled/16';
import na from '@rocketsoftware/icons-vue/es/help--filled/16';
export default {
  name: 'CvDataTableCell',
  props: {
    cellStyle: {},
    cycle: Object,
    colIndex: Number,
    projectID: [Number, String],
    releaseID: [Number, String],
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
  methods: {
    getID: function() {
      console.log(this.cycle.executions.filter(execution => execution.name === this.$slots.default[0].text)[0].id);
      return this.cycle.executions.filter(execution => execution.name === this.$slots.default[0].text)[0].id;
    },
  },
};
</script>
