<template>
  <div>
    <div ref="editor"></div>
    <div v-html="testHtml"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Editor from '@toast-ui/editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

const editor = ref(null);
const editorInstance = ref(null);
const testHtml = ref('');

onMounted(() => {
  editorInstance.value = new Editor({
    el: editor.value,
    height: '500px',
    initialEditType: 'wysiwyg',
    events: {
      change: () => emit('update:modelValue', editorInstance.value.getMarkdown()),
    },
  });
});

const testValid = () => {
  testHtml.value = editorInstance.value.getHTML();
};

onUnmounted(() => {
  if (editorInstance.value) {
    editorInstance.value.destroy();
  }
});
</script>

<style scoped></style>
