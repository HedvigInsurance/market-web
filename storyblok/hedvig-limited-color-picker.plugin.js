// In case you need to add the color picker - this is the code you add to the plugin editor

const Fieldtype = {
  mixins: [window.Storyblok.plugin],
  template: `
  <div>
  <select class="uk-width-1-1" v-model="model.color">
    <option value="standard">Standard</option>
    <option value="blue">Blue</option>
    <option value="blue-dark">Blue (dark)</option>
    <option value="pink-light">Pink (light)</option>
    <option value="off-white">Off white</option>
    <option value="off-black">Off black</option>
    <option value="off-black-dark">Off black (dark)</option>
    <option value="green">Green</option>
    <option value="purple">Purple</option>
  </select>
  </div>
  `,
  methods: {
    initWith() {
      return {
        plugin: 'hedvig_limited_color_picker',
        color: 'standard'
      }
    },
    pluginCreated() {
      console.log('plugin:created')
    }
  },
  watch: {
    'model': {
      handler: function (value) {
        this.$emit('changed-model', value);
      },
      deep: true
    }
  }
}
