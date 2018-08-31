<template>
  <div>
 	  <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'app1',
  data: function () {
    return {};
  },
  created: function () {
    var self = this  // eslint-disable-line
    this.$http.get("./static/json/config.json").then(response=> {
      self.$store.commit('setpaths',response.data);
    }).catch(e=>{
      console.log(e)
    })
  }
};
</script>
<style src='bootstrap/dist/css/bootstrap.css'></style>
<style>
@import '../static/css/Kgrid-default.css';
@import '../static/css/theme-kglibrary.css';
@import '../static/css/style.css';
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #777;
  margin-top: 0px;
}
</style>
