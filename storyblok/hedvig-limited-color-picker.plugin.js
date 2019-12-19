// In case you need to add the color picker - this is the code you add to the plugin editor

const Fieldtype = {
  mixins: [window.Storyblok.plugin],
  template: `
  <div>
  <select class="uk-width-1-1" v-model="model.color">
    <option value="standard">Standard</option>
    <option value="standard-inverse">Standard (inverse)</option>
    <option value="blue">Blue</option>
    <option value="blue-inverse">Blue (inverse)</option>
    <option value="blue-dark">Blue (dark)</option>
    <option value="blue-dark-inverse">Blue (dark) (inverse)</option>
    <option value="pink-light">Pink (light)</option>
    <option value="pink-light-inverse">Pink (light) (inverse)</option>
    <option value="pink-dark">Pink (dark)</option>
    <option value="pink-dark-inverse">Pink (dark) (inverse)</option>
    <option value="off-white">Off white</option>
    <option value="off-white-inverse">Off white (inverse)</option>
    <option value="off-black">Off black</option>
    <option value="off-black-inverse">Off black (inverse)</option>
    <option value="off-black-dark">Off black (dark)</option>
    <option value="off-black-dark-inverse">Off black (dark) (inverse)</option>
    <option value="green">Green</option>
    <option value="green-inverse">Green (inverse)</option>
    <option value="green-dark">Green (dark)</option>
    <option value="green-dark-inverse">Green (dark) (inverse)</option>
    <option value="purple">Purple</option>
    <option value="purple-inverse">Purple (inverse)</option>
    <option value="yellow-light">Yellow (light)</option>
    <option value="yellow-light-inverse">Yellow (light) (inverse)</option>
    <option value="yellow-dark">Yellow (dark)</option>
    <option value="yellow-dark-inverse">Yellow (dark) (inverse)</option>
    <option value="pink-deviation-100">Pink deviation 100</option>
    <option value="pink-deviation-100-inverse">Pink deviation 100 (inverse)</option>
    <option value="pink-deviation-100-inverse">Pink deviation 100 (inverse)</option>
    <option value="pink-deviation-200-black">Pink deviation 200 (black)</option>
    <option value="pink-deviation-200-black-inverse">Pink deviation 200 (black + inverse)</option>
    <option value="pink-deviation-200-white">Pink deviation 200 (white)</option>
    <option value="pink-deviation-200-white-inverse">Pink deviation 200 (white/inverse)</option>
    <option value="yellow-deviation-100-black">Yellow deviation 100 (black)</option>
    <option value="yellow-deviation-100-black-inverse">Yellow deviation 100 (black + inverse)</option>
    <option value="yellow-deviation-100-white">Yellow deviation 100 (white)</option>
    <option value="yellow-deviation-100-white-inverse">Yellow deviation 100 (white/inverse)</option>
    <option value="blue-deviation-100">Blue deviation 100</option>
    <option value="blue-deviation-100-inverse">Blue deviation 100 (inverse)</option>
    <option value="purple-deviation-100">Purple deviation 100</option>
    <option value="purple-deviation-100-inverse">Purple deviation 100 (inverse)</option>
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
