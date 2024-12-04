<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <CustomPage  to="/custom" msg="Welcome to Your Vue.js App"/> -->
  <ExpensesApp  to="/custom" msg="Welcome to Your Vue.js App"/>


</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import CustomPage from './components/CustomPage.vue'
import ExpensesApp from './components/ExpensesApp.vue'


export default {
  name: 'App',
  components: {
    // HelloWorld,
    ExpensesApp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
