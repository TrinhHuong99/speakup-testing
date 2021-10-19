<template>
    <div>
        <quill-editor style="height: 300px" v-model="writingContent" :options="editorOption">
            <div id="toolbar" slot="toolbar">
                <!-- Add a bold button -->
                <button class="ql-bold">Bold</button>
                <button class="ql-italic">Italic</button>
                <select class="ql-header">
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                    <option value="4">Heading 4</option>
                    <option value="5">Heading 5</option>
                    <option value="6">Heading 6</option>
                    <option value="">Normal</option>
                </select>
            </div>
        </quill-editor>
    </div>
</template>

<script>
export default {
    props: {
    },
    data() {
        return {
            editorOption: {
                modules: {
                    toolbar: '#toolbar'
                },
                // placeholder: 'Your new placeholder!'
            },
            writingContent: '',
        }
    },
    created() {
        console.log(this.$store.getters['getWritingOfPart'])
        this.writingContent = this.$store.getters['getWritingOfPart']
    },
    watch: {
        writingContent(value) {
            this.$store.commit('SET_WRITING', value)
        }
    }
}
</script>

<style>
    .quill-editor {
        background-color: #fff;
    }

    .ql-container {
        background-color: white;
    }
</style>