<template>
  <th :aria-sort="sortOrder">
    <button type="button" v-if="sortable" :class="['bx--table-sort', orderClass]" @click="onSortClick">
      <span class="bx--table-header-label">{{ heading }}</span>
      <ArrowDown16 class="bx--table-sort__icon" />
      <Arrows16 class="bx--table-sort__icon-unsorted" />
    </button>
    <span v-else class="bx--table-header-label">
      <div v-if="heading.substring(0, cycle.name.length) === cycle.name" class="cycleHeader">
        <router-link
          :to="{ name: 'cycles', params: { releaseID: releaseID, projectID: projectID, cycleID: cycle.id } }"
        >
          {{ heading.substring(0, cycle.name.length) }} </router-link
        >{{ heading.substring(cycle.name.length) }}
      </div>
      <p v-else>{{ heading }}</p>

      <div class="status__icon datatable" v-if="heading.substring(0, cycle.name.length) === cycle.name">
        <checkmark v-if="cycle.status === 100" class="status__icon-color--green" />
        <warn v-else-if="cycle.status > 79" class="status__icon-color--yellow" />
        <close v-else-if="cycle.status" class="status__icon-color--red" />
        <na v-else class="status__icon-color--na" />
        {{ cycle.status }}%
      </div>
    </span>
  </th>
</template>

<script>
import ArrowDown16 from '@carbon/icons-vue/es/arrow--down/16';
import Arrows16 from '@carbon/icons-vue/es/arrows/16';

import checkmark from '@rocketsoftware/icons-vue/es/checkmark--filled/16';
import warn from '@rocketsoftware/icons-vue/es/warning--filled/16';
import close from '@rocketsoftware/icons-vue/es/close--filled/16';
import na from '@rocketsoftware/icons-vue/es/help--filled/16';

const nextSortOrder = {
  ascending: 'descending',
  descending: 'none',
  none: 'ascending',
};

export default {
  name: 'CvDataTableHeading',
  components: { ArrowDown16, Arrows16, checkmark, warn, close, na },
  props: {
    projectID: [Number, String],
    releaseID: [Number, String],
    cycle: Object,
    heading: { type: String, required: true },
    sortable: Boolean,
    order: { type: String, default: 'none' },
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
