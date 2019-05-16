<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-4">
      <table class="table">
        <thead>
          <tr>
            <th>訂購人姓名</th>
            <th>Email</th>
            <th>收件人電話</th>
            <th>收件人地址</th>
            <th>總金額</th>
            <th>付款狀態</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order) in orders" :key="order.id">
            <td>{{order.user.name}}</td>
            <td>{{order.user.email}}</td>
            <td>{{order.user.tel}}</td>
            <td>{{order.user.address}}</td>
            <td>{{order.total}}</td>
            <td>
              <span v-if="order.is_paid">已付款</span>
              <span v-else>未付款</span>
            </td>
            <td>
              <button class="btn btn-primary" @click.prevent="openmodal(order)">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="editorder">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">編輯訂單</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form">
              <div class="form-group">
                <label for="name">訂購人姓名</label>
                <input type="text" id="name" v-model="order.user.name" class="form-control">
              </div>
              <div class="form-group">
                <label for="email">訂購人信箱</label>
                <input type="email" id="email" v-model="order.user.email" class="form-control">
              </div>
              <div class="form-group">
                <label for="tel">訂購人電話</label>
                <input type="number" id="tel" v-model="order.user.tel" class="form-control">
              </div>
              <div class="form-group">
                <label for="address">訂購人地址</label>
                <input type="text" id="address" v-model="order.user.address" class="form-control">
              </div>
              <div class="form-group">
                <label for="total">總金額</label>
                <input type="number" id="total" v-model="order.total" class="form-control">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary" @click.prevent="modifyorder(order.id)">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      orders: [],
      isLoading: false,
      order: {
        user:{},
      }
    };
  },
  methods: {
    getorders(page = 1) {
      const api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        console.log(response.data);
        vm.orders = response.data.orders;
        console.log(vm.orders);
        vm.isLoading = false;
      });
    },
    openmodal(item) {
      this.order = Object.assign({}, item);
      $("#editorder").modal("show");
    },
    modifyorder(id) {
      const api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/admin/order/${id}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.put(api,{data:vm.order}).then(response => {
        console.log(response.data);
        if(response.data.success){
           $("#editorder").modal("hide");
           vm.getorders();
        }else{
          $("#editorder").modal("hide");
          alert('編輯失敗')
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getorders();
  }
};
</script>
