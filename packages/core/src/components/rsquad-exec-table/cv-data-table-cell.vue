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
export default {
  name: 'CvDataTableCell',
  data() {return {filts: ["passed", "xpassed", "failed", "xfailed", "error", "skipped"]}},
  props: {
    cellStyle: {}
  },
};
</script>
