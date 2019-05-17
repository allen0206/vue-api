<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <router-link to="home">飽飽飽</router-link>
      <div class="text-right" style="position:relative">
        <a href="#" id="dropdown" data-toggle="dropdown" style="position:relative">
          <i class="fas fa-shopping-cart fa-2x"></i>
          <span class="badge badge-secondary h4" style="position:absolute; left:0px ;top:-15px">{{length}}</span>
        </a>
        <div class="dropdown-menu" style="position:absolute; left:auto ;right:0;width:400px;">
          <table class="table">
            <thead>
              <tr>
              <th>刪除</th>
              <th>名稱</th>
              <th>價錢</th>
              <th>數量</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart) in carts.carts" :key="cart.id">
                <td><button class="btn" @click.prevent="deletecart(cart.id)"><i class="fas fa-trash"></i></button></td>
                <td>{{cart.product.title}}</td>
                <td>{{cart.final_total}}</td>
                <td>{{cart.qty}}{{cart.product.unit}}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-right mr-3">
            <router-link class="btn btn-primary" to="/home/information">結帳去</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: {},
      length:''
    };
  },
  methods: {
    getcart() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        console.log(response.data);
        vm.carts = response.data.data;
        vm.length = vm.carts.carts.length
        vm.isLoading = false;
        console.log(vm.carts);
      });
    },
    deletecart(id) {
      const api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/cart/${id}`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http.delete(api).then(response => {
        console.log(response.data);
        vm.getcart();
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getcart();
  }
};
</script>
