# cv-modal

A Vue implementation of a Carbon Components modal

http://www.carbondesignsystem.com/components/modal/code

## Usage

```html
<cv-modal
  @modal-beingshown="actionBeforeShown"
  @modal-shown="actionShown"
  @modal-beinghidden="actionBeforeHidden"
  @modal-hidden="actionHidden"
>
  <template slot="label"
    >label</template
  >
  <template slot="title"
    >A Title</template
  >
  <template slot="content"
    ><p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
    </p></template
  >
  <template slot="secondary-button"
    >Help</template
  >
  <template slot="primary-button"
    >OK</template
  >
</cv-modal>
```

### Initial focus

When the modal dialog is shown focus is set to the first interactive element found in the following list:

1. To the first element with a 'data-modal-primary-focus' attribute.
2. To the primary button if shown
3. To the secondary button if shown
4. To the close button

This is done after the modal transitions into its visible state, which is triggered by either changing the visible property to true or mounting with the visible property set to true.

## Attributes

- kind: 'danger' other wise default modal.
- visible: visibility of modal dialog

## slots

- label: optional
- title:
- content:
- primary-button: optional, no primary button if not specified
- secondary-button: optional, no secondary button if not specified

### NOTE: primary and secondary buttons

1. If no primary or secondary button is specified then no footer is shown.
2. If no listener is created for 'primary-click' or 'secondary-click' the associated event will cause the modal to close

## Methods

- show
- hide

## events

- modal-beingshown
- modal-shown
- modal-beinghidden
- modal-hidden
- primary-click
- secondary-click
