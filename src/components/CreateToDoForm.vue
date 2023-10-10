<template>
  <div class="wrapper">
    <h3>Create ToDo</h3>
    <form @submit.prevent="onSubmit">
      <input
        v-model:value.trim="userId"
        type="text"
        placeholder="User ID"
        @keydown="toNumber($event)"
      >
      <input
        v-model:value.trim="title"
        placeholder="Title"
        @keydown="toLetters($event)"
      >
      <button
        type="submit"
        :disabled="!userId || !title"
      >
        Add
      </button>
    </form>
  </div>
</template>

<script>
import { toLetters, toNumber } from "../helpers/formatters";

export default {
  name: 'CreateToDoForm',
  data: () => {
    return {
      title: '',
      userId: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addToDo', this.title, this.userId);
      this.title = '';
      this.userId = '';
    },
    toLetters,
    toNumber
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 200px;
  padding: 20px;
  background: #c3c3c3;
  border-radius: 5px;

  h3 {
    margin: 0 0 5px 0;
  }
}
</style>
