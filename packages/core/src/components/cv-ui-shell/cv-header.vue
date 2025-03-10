<template>
  <header class="cv-header bx--header" role="banner" data-header>
    <slot />
    <div v-if="$slots['header-global']" class="bx--header__global">
      <slot name="header-global" />
    </div>
    <slot name="left-panels" />
    <slot name="right-panels" />
  </header>
</template>

<script>
export default {
  name: 'CvHeader',
  created() {
    // add these on created otherwise cv:mounted is too late.
    this.$on('cv:panel-control-mounted', this.onCvPanelControlMounted);
    this.$on('cv:panel-control-beforeDestroy', this.onCvPanelControlBeforeDestroy);
    this.$on('cv:panel-control-toggle', this.onCvPanelControlToggle);
    this.$on('cv:panel-control-focusout', this.onCvPanelControlFocusout);
    this.$on('cv:panel-mounted', this.onCvPanelMounted);
    this.$on('cv:panel-beforeDestroy', this.onCvPanelBeforeDestroy);
    this.$on('cv:panel-focusout', this.onCvPanelFocusout);
  },
  data() {
    return {
      panelControllers: [],
      panels: [],
    };
  },
  computed: {
    isCvHeader() {
      return true;
    },
  },
  methods: {
    onCvPanelControlMounted(srcComponent) {
      this.panelControllers.push(srcComponent);
    },
    onCvPanelControlBeforeDestroy(srcComponent) {
      const index = this.panelControllers.findIndex(item => item.id === srcComponent.id);
      if (index > -1) {
        this.panelControllers.splice(index, 1);
      }
    },
    onCvPanelControlToggle(srcComponent, force) {
      const foundIndex = this.panels.findIndex(item => item.id === srcComponent.ariaControls);
      if (foundIndex > -1) {
        const newValue = force !== undefined ? force : !srcComponent.internalActive;

        for (let index in this.panels) {
          this.panels[index].internalExpanded = false;
        }
        for (let index in this.panelControllers) {
          this.panelControllers[index].internalActive = false;
        }

        srcComponent.internalActive = newValue;
        this.panels[foundIndex].internalExpanded = newValue;
      }
    },
    onCvPanelControlFocusout(srcComponent, srcEvent) {
      const found = this.panels.find(item => item.id === srcComponent.ariaControls);

      if (found && found.$el !== srcEvent.relatedTarget && !found.$el.contains(srcEvent.relatedTarget)) {
        this.onCvPanelControlToggle(srcComponent, false);
      }
    },
    onCvPanelMounted(srcComponent) {
      this.panels.push(srcComponent);
    },
    onCvPanelBeforeDestroy(srcComponent) {
      const index = this.panels.findIndex(item => item.id === srcComponent.id);
      if (index > -1) {
        this.panels.splice(index, 1);
      }
    },
    onCvPanelFocusout(srcComponent, srcEvent) {
      const found = this.panelControllers.find(item => item.ariaControls === srcComponent.id);
      if (
        srcComponent.$el !== srcEvent.relatedTarget &&
        !srcComponent.$el.contains(srcEvent.relatedTarget) &&
        found &&
        found.$el !== srcEvent.relatedTarget
      ) {
        this.onCvPanelControlToggle(found, false);
      }
    },
  },
};
</script>
