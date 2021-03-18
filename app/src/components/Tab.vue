<template>
  <div>
    <b-card>
      <b-tabs v-model="tabIndex" card>
        <b-tab title="HOME" :title-link-class="linkClass(0)" active><Home></Home></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>


<script>
import Home from "./tabs/Home";


export default {
  name: "Tab",
  components: {
    Home
  },
  data() {
      return {
        tabIndex: 1,
        network: "fisco-bcos"
      }
    },
    created: function(){
         this.$socket.on('customEmit', function(data){ console.log(data)});
    },
    methods: {
      linkClass(idx) {
        if (this.tabIndex === idx) {
          return ['bg-primary', 'text-light']
        } else {
          return ['bg-light', 'text-info']
        }
      },
      OnSelectnetwork(){
        this.$fsmservice.network = this.network;
        console.log(this.$fsmservice);
      }
    }
};
</script>

<style scoped lang="scss">
  .container /deep/ {
    @import "~bootstrap-vue/dist/bootstrap-vue";
    @import "~bootstrap/dist/css/bootstrap";
  }
</style>