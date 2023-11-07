<script setup lang="ts">
import { onMounted, type Ref, ref, watch, onUnmounted } from 'vue';

import Editor from '@toast-ui/editor';
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const props = defineProps({
    modelValue: {
        type: String,
        required: false,
        default: '',
    }
})

const emit = defineEmits(['update:modelValue'])
const editor = ref()
const editorValid = ref()
const testHtml = ref()

//페이지가 마운트될 때 editor 생성
onMounted(() => {
    editorValid.value = new Editor({
        el: editor.value,
        height: '500px',
        initialEditType: 'wysiwyg',
        events: {
            change: () => emit('update:modelValue', editorValid.value.getMarkdown()),
        }
    })
})

//작성한 내용 불러와서 html 적용
const testValid = (e: any) => {
    testHtml.value = editorValid.value.getHTML()
}
</script>

<template>
    <div ref="editor"></div>
    <div v-html="testHtml.value"></div>
</template>

<style scoped></style>
