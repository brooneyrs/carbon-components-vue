<template>
  <div
    class="cv-code-snippet-multiline bx--snippet bx--snippet--multi"
    :class="{ 'bx--snippet--expand': expanded }"
    data-code-snippet
  >
    <div class="bx--snippet-container" aria-label="Code Snippet Text">
      <pre>
        <slot></slot>
      </pre>
    </div>
    <cv-feedback-button feedback="Copied!" aria-label="Copy code" @click="$emit('copy-code')">
      <Copy16 class="bx--snippet__icon" />
    </cv-feedback-button>

    <cv-button type="button" kind="ghost" small class="bx--snippet-btn--expand" @click="toggleExpand">
      <span class="bx--snippet-btn--text">{{ expandButtonText }}</span>
      <ChevronDown16 class="bx--icon-chevron--down" />
    </cv-button>
  </div>
</template>

<script>
import CvFeedbackButton from './_cv-feedback-button';
import CvButton from '../cv-button/cv-button';

import Copy16 from '@rocketsoftware/icons-vue/es/copy/16';
import ChevronDown16 from '@rocketsoftware/icons-vue/es/chevron--down/16';

export default {
  name: 'CvCodeSnippetMultiline',
  components: {
    CvButton,
    CvFeedbackButton,
    Copy16,
    ChevronDown16,
  },
  props: {
    lessText: { type: String, default: 'Show less' },
    moreText: { type: String, default: 'Show more' },
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    expandButtonText() {
      return this.expanded ? this.lessText : this.moreText;
    },
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
  },
};
</script>
