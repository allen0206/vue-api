<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <router-link to="home">飽飽飽</router-link>
      <div class="text-right dropdown" style="position:relative">
        <a href="#" id="dropdown" data-toggle="dropdown" style="position:relative">
          <i class="fas fa-shopping-cart fa-2x"></i>
          <span class="badge badge-secondary h4" style="position:absolute; left:0px ;top:-15px">1</span>
        </a>
        <div class="dropdown-menu" style="position:absolute; left:auto ;right:0;">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>
