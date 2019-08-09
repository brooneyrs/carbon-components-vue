<template>
  <td :style="cellStyle">
    <cv-tag
      v-if="filts.includes(this.$slots.default[0].text)"
      :id="this.$slots.default[0].text + '-active'"
      kind="cool-gray"
      :value="this.$slots.default[0].text"
      :label="this.$slots.default[0].text"
    ></cv-tag>
    <slot v-else/>

  </td>
</template>

<script>
import CvTag from "../cv-tag/cv-tag";
export default {
  name: 'CvDataTableCell',
  props: {
    cellStyle: {},
    filts: {
      type: [String, String, String, String, String, String],
      default: ["passed", "xpassed", "failed", "xfailed", "error", "skipped"]
    }
  },
  components: {
    CvTag
  }
};
</script>
