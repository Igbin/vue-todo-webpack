<template>
  <div class="user-info">
    <p>{{ user.name }}</p>
    <p>{{ user.email }}</p>
    <p>{{ user.phone }}</p>
    <p>{{ user.website }}</p>
    <p>{{ user.company.name }}</p>
    <span>{{ user.address.city }}, </span><span>{{ user.address.street }}, </span><span>{{ user.address.suite }}</span>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data: () => {
    return {
      user: {},
    }
  },
  beforeMount() {
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }
}
</script>

<style scoped>

p, span {
  color: #ffffff;
}

</style>
