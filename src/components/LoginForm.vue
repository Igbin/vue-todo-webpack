<template>
  <div class="wrapper">
    <form @submit.prevent="onSubmit">
      <input
        v-model:value.trim="userName"
        type="text"
        placeholder="Username"
        @keydown="toLetters($event)"
      >
      <input
        v-model:value.trim="phone"
        placeholder="Phone Number"
        @keydown="toNumber($event)"
      >
      <button
        type="submit"
        :disabled="!phone || !userName"
      >
        Register
      </button>
    </form>
    <p class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { toLetters, toNumber } from '../helpers/formatters.js';

export default {
  name: 'LoginForm',
  props: ['errorMessage'],
  data: () => {
    return {
      userName: '',
      phone: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.userName, this.phone);
    },
    toLetters,
    toNumber
  }
}

</script>

<style scoped lang="scss">

.wrapper {
  max-width: 400px;
  margin: 25% auto;
  padding: 20px;
  position: relative;
  background: #c3c3c3;
  border-radius: 5px;

  .error {
    position: absolute;
    margin: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: -8px;
    color: #DC143C;
  }
}


</style>
