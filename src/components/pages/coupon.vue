<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-4 text-right">
      <button class="btn btn-primary" @click.prevent="openmodal(true)">新增優惠卷</button>
    </div>
    <div class="containter mt-4">
      <table class="table">
        <thead>
          <tr>
            <th >名稱</th>
            <th width="140">優惠碼</th>
            <th width="140g">優惠趴數</th>
            <th width="140">是否啟用</th>
            <th width="200">到期日</th>
            <th width="160" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="coupon in coupons" :key="coupon.id">
              <td>{{coupon.title}}</td>
              <td>{{coupon.code}}</td>
              <td>{{coupon.percent}}%</td>
              <td>
                <span v-if="coupon.is_enabled === 1">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>{{coupon.due_date}}</td>
             <td>
               <div class="btn-group">
                <button class="btn btn-outline-primary" @click.prevent="openmodal(false,coupon)">編輯</button>
                <button class="btn btn-outline-danger" @click.prevent="deletecoupon(coupon)">刪除</button>
               </div>
             </td>
            </tr>
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"  @click.prevent="getcoupons(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active': pagination.current_page} === page">
          <a class="page-link" href="#" @click.prevent="getcoupons(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}" >
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getcoupons(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="addcoupon">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增優惠卷</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form">
              <div class="form-group">
                <label for="title">優惠卷名稱</label>
                <input type="text" id="title" class="form-control" v-model="coupon.title">
              </div>
              <div class="form-group">
                <label for="percent">優惠趴數</label>
                <input type="number" id="percent" class="form-control" v-model="coupon.percent">
              </div>
              <div class="form-group">
                <label for="data">到期日</label>
                <input type="number" id="date" class="form-control" v-model="coupon.due_date">
              </div>
              <div class="form-group">
                <label for="code">優惠卷編號</label>
                <input type="text" id="code" class="form-control" v-model="coupon.code">
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value id="defaultCheck1" v-model="coupon.is_enabled" :true-value="1" :false-value="0">
                <label class="form-check-label" for="defaultCheck1">是否啟用</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="addcoupon">確認</button>
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
      coupons: [],
      coupon: {},
      isLoading: false,
      pagination: {},
      isNew:false,
    };
  },
  methods: {
    getcoupons(page = 1) {
      const api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        console.log(response.data);
        vm.coupons = response.data.coupons;
        console.log(vm.coupons);
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    openmodal(isNew,item){
      if(isNew){
         this.coupon = {}
         this.isNew = true
      }else{
         this.coupon = Object.assign({},item)
         this.isNew = false
      }
      $('#addcoupon').modal('show')
    },
    addcoupon() {
      let api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/admin/coupon`;
      let httpmethods = "post"
      const vm = this;
      vm.isLoading = true;
      if (!vm.isNew) {
          api = `${process.env.APIPATH}api/${
          process.env.CUSTOMPATH
        }/admin/coupon/${vm.coupon.id}`;
        httpmethods = "put";
      }
      console.log(vm.coupon);
      vm.$http[httpmethods](api,{data:vm.coupon}).then(response => {
        console.log(response.data);
        vm.isLoading = false
        if(response.data.success){
        $('#addcoupon').modal('hide')
        vm.getcoupons();
        ;
        }else{
        $('#addcoupon').modal('hide');
        alert('新增失敗');
        }
      });
    },
    deletecoupon(item){
      const api = `${process.env.APIPATH}api/${
        process.env.CUSTOMPATH
      }/admin/coupon/${item.id}`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      vm.$http.delete(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        if (response.data) {
          vm.getcoupons();
        } else {
          vm.getcoupons();
          alert("刪除失敗");
        }
      });
    }
  },
  created() {
    this.getcoupons();
  }
};
</script>
