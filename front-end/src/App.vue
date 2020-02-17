<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    const user = {
      userId: 233,
      username: 'shiroha',
    }
    localStorage.setItem("user", JSON.stringify(user))
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.tabBar {
  position: fixed;
  bottom: 0;
}
</style>
