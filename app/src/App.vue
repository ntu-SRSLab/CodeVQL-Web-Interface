<template>
  <div id="app">
    <!-- <div class="container">
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="pingServer()">Ping Server</button>
  </div> -->
    <div class="container">
      <NavHeader  ></NavHeader>
      <Home> </Home>
      <BotFooter> </BotFooter>
    </div>
  </div>
</template>

<script>

// console.log(this.$socket);
import BotFooter from "./components/BotFooter";
import NavHeader from "./components/NavHeader";
import Home from "./components/tabs/Home";
export default {
  name: "App",
  components: {
    BotFooter,
    NavHeader,
    Home
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
