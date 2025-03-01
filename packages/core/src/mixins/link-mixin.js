export default {
  props: {
    to: String,
    href: String,
  },
  computed: {
    tagType() {
      // if to is used and not href then user wanted a router-link
      return this.to && !this.href ? 'router-link' : 'a';
    },
  },
};
