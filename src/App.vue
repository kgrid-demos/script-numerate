<template>
  <div>
    <!-- <navbar></navbar> -->
 	  <router-view></router-view>
    <!-- <div v-bind:is='currentOLView'  v-bind='request' v-if='showOverlay.show'></div> -->
  </div>
</template>
<script>
// import navbar from './components/navbar.vue';
// import login from './components/login';
// import confirmdialog from './components/confirmdialog'; // eslint-disable-line
// import objcreator from './components/objcreator';
// import objdeposit from './components/objdeposit';
// import ioviewer from './components/ioviewer';
// import codeviewer from './components/codeviewer';
// import objact from './components/objact';
// import libraryusers from './components/libraryusers.vue';
export default {
  name: 'app1',
  data: function () {
    return {

    };
  },
  created: function () {
    var self = this  // eslint-disable-line
    //Test code to set default user to bypass LOGIN
    // this.$store.commit('setuser',{username: 'Guest', password: 'none', first_name:'Guest', admin: true})
    this.$http.get("./static/json/druglist.json").then(response=> {
      self.$store.commit('setdruglist',response.data);
    }).catch(e=>{
      console.log(e)
    })
    // will move to objdetail and construct the tree using model children array
    // this.$http.get("./static/json/kotree.json").then(response=> {
    //   self.$store.commit('setkottree',response.data);
    // }).catch(e=>{
    //   console.log(e)
    // })

  },
  components: {

  },
	computed:{
    user:function(){
      return this.$store.getters.getuser
    }
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
