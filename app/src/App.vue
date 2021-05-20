<template>
  <div id="app">
    <div class="container">
      <NavHeader  ></NavHeader>
      <router-view></router-view>
      <BotFooter> </BotFooter>
    </div>
  </div>
</template>

<script>
import BotFooter from "./components/BotFooter";
import NavHeader from "./components/NavHeader";
export default {
  name: "App",
  components: {
    BotFooter,
    NavHeader,
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
