<template>
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <a class="navbar-brand" href="#page-top"><h2 style="margin-top: 0px">CodeVQL</h2></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="my-navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="hidden"><a href="#page-top"></a></li>
                <li><a href="https://www.overleaf.com/read/rndyhqhtwgfj">About</a></li>
                <!--li><a href="#under">Under the Hood</a></li-->
                <li><a href="#">Publications</a></li>
                <li><a href="https://github.com/ntu-SRSLab">People</a></li>
            </ul>
            </div>
        </div>
    </nav>   
</template>
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
