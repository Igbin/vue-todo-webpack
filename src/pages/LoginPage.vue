<template>
  <div>
    <login-form @submit="onSubmit" :error-message="errorMessage" />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: { LoginForm },
  data: () => {
    return {
      users: [],
      errorMessage: ''
    }
  },
  methods: {
    async onSubmit(userName, phone) {
      this.errorMessage = '';

      if (!this.users.length) {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await res.json();

        users.forEach(user => this.users.push(user));
      }

      const matchedUser = this.users.find(user => user.name === userName && user.phone === phone);

      if (matchedUser) {
        this.$router.push({ name: `ListPage` });
        localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      } else {
        this.errorMessage = 'login error';
      }
    }
  }
}
</script>

<style scoped>

</style>
