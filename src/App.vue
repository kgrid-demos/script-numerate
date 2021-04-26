<template>
  <div id="app">
    <home/>
  </div>
</template>
<script>
  import home from './components/home.vue';

export default {
  name: 'App',
  data: function () {
    return {};
  },
  components: {
    home
  },
  created: function () {
    document.title = "RxPattern";
    var self = this  // eslint-disable-line
    this.$http.get("./json/config.json").then(response=> {
      self.$store.commit('setpaths',response.data);
    }).catch(e=>{
      console.log(e)
    })
  }
};
</script>
<style src='bootstrap/dist/css/bootstrap.css'></style>
<style>
@import '../public/css/Kgrid-default.css';
@import '../public/css/theme-kglibrary.css';
@import '../public/css/style.css';
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #777;
  margin-top: 0px;
}
</style>
