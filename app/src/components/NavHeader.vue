<template>
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <a class="navbar-brand"><h2 style="margin-top: 0px">CodeVQL</h2></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="my-navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/language">Language</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/publication">Publication</router-link></li>
                <li><router-link to="/people">People</router-link></li>
            </ul>
            </div>
        </div>
    </nav>   
</template>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<script>
    export default {
    name: "NavHeader",
    props: {
        msg: String
    }
    };
</script>
<style scoped lang="scss">
.navbar /deep/ {
  @import "~bootstrap-vue/dist/bootstrap-vue";
}
</style>
