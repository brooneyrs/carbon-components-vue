<template>
  <th :aria-sort="sortOrder">
    <button type="button" v-if="sortable" :class="['bx--table-sort', orderClass]" @click="onSortClick">
      <cv-wrapper :tag-type="headingLabelTag" class="bx--table-header-label">{{ heading }}</cv-wrapper>
      <ArrowDown16 class="bx--table-sort__icon" />
      <Arrows16 class="bx--table-sort__icon-unsorted" />
    </button>
    <cv-wrapper v-else-if="heading === 'Result' && filtered" :tag-type="headingLabelTag" class="bx--table-header-label"
      >Result <filt
    /></cv-wrapper>
    <cv-wrapper v-else :tag-type="headingLabelTag" class="bx--table-header-label">{{ heading }}</cv-wrapper>
  </th>
</template>

<script>
import ArrowDown16 from '@rocketsoftware/icons-vue/es/arrow--down/16';
import Arrows16 from '@rocketsoftware/icons-vue/es/arrows/16';
import CvWrapper from '../cv-wrapper/_cv-wrapper';
import filt from '@rocketsoftware/icons-vue/es/filter/16';

const nextSortOrder = {
  ascending: 'descending',
  descending: 'none',
  none: 'ascending',
};

export default {
  name: 'CvDataTableHeading',
  components: { ArrowDown16, Arrows16, CvWrapper, filt },
  props: {
    filtered: { type: Boolean, default: false },
    heading: { type: String, required: true },
    sortable: Boolean,
    order: { type: String, default: 'none' },
    skeleton: Boolean,
  },
  computed: {
    sortOrder() {
      if (this.order !== 'ascending' && this.order !== 'descending') {
        return 'none';
      } else {
        return this.order;
      }
    },
    sortText() {
      return this.sortOrder !== 'descending'
        ? 'Sort rows by this header in descending order'
        : 'Sort rows by this header in ascending order';
    },
    orderClass() {
      let result = '';
      if (this.sortOrder === 'descending') {
        result = 'bx--table-sort--active';
      } else if (this.sortOrder === 'ascending') {
        result = 'bx--table-sort--active bx--table-sort--ascending';
      }
      return result;
    },
    headingLabelTag() {
      return this.heading.length === 0 || !this.skeleton ? 'span' : '';
    },
  },
  model: {
    event: 'sort',
    prop: 'order',
  },
  methods: {
    onSortClick() {
      this.$emit('sort', nextSortOrder[this.sortOrder]);
    },
  },
};
</script>
