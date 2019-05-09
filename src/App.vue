<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <span class="badge badge-primary">Primary</span>
    <span class="badge badge-secondary">Secondary</span>
    <span class="badge badge-success">Success</span>
    <span class="badge badge-danger">Danger</span>
    <span class="badge badge-warning">Warning</span>
    <span class="badge badge-info">Info</span>
    <span class="badge badge-light">Light</span>
    <span class="badge badge-dark">Dark</span>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',
  created(){
    const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products`;
    console.log(process.env.APIPATH,process.env.CUSTOMPATH)
    this.$http.get(api).then((response)=>{
      console.log(response.data)
    })
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
