const Fieldtype = {
    mixins: [window.Storyblock.plugin],
    template: `
    <div>
        <label for="show">Show?</label>
        <input name="show" type="checkbox" v-model="model.show>

        <label for="title">Title</label>
        <input name="title" type="text" v-model="model.title">

        <label for="style">Style</label>
        <select name="style" v-model="model.style">
            <option value="filled">Filled</option>
            <option value="outlined">Outlined</option>
            <option value="plain">Plain</option>
        </select>

        <label for="deep-link">Deep Link</label>
        <input name="deep-link type="checkbox" v-model="model.deepLink>

        <label for="color">Color</label>
        <input 
    </div>
    `
}