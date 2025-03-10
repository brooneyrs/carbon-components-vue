import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvInlineNotificationNotesMD from '@rocketsoftware/vue/src/components/cv-inline-notification/cv-inline-notification-notes.md';
import { CvInlineNotification } from '@rocketsoftware/vue/src';

const storiesDefault = storiesOf('Components/CvInlineNotification', module);
const storiesExperimental = storiesOf('Experimental/CvInlineNotification', module);

const preKnobs = {
  title: {
    group: 'attr',
    type: text,
    config: ['title', 'notification title'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: { name: 'title', type: String },
  },
  subtitle: {
    group: 'attr',
    type: text,
    config: [
      'subtitle',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: { name: 'sub-title', type: String },
  },
  events: {
    group: 'attr',
    value: `@close="doClose"`,
  },
};

const variants = [
  { name: 'default' },
  { name: 'error', extra: { kind: { group: 'attr', value: 'kind="error"' } } },
  { name: 'info', extra: { kind: { group: 'attr', value: 'kind="info"' } } },
  {
    name: 'success',
    extra: { kind: { group: 'attr', value: 'kind="success"' } },
  },
  {
    name: 'warning',
    extra: { kind: { group: 'attr', value: 'kind="warning"' } },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-inline-notification v-if="visible"${settings.group.attr}>
</cv-inline-notification>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other"><button @click="visible = true">Show if hidden</button></template>
    </sv-template-view>
  `;

      return {
        components: { CvInlineNotification, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            visible: true,
          };
        },
        methods: {
          actionClose: action('CV InlineNotification - close'),
          doClose(ev) {
            this.visible = false;
            this.actionClose(ev);
          },
        },
      };
    },
    {
      notes: { markdown: CvInlineNotificationNotesMD },
    }
  );
}
