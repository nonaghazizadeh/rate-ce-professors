<template>
  <div>
    <div>
      <b-navbar toggleable="expand-lg" class="navbar-color">
        <b-navbar-brand
          ><router-link :to="{ path: '/' }" replace
            >اساتید دانشکده مهندسی کامپیوتر</router-link
          ></b-navbar-brand
        >
        <b-navbar-nav class="mr-auto">
          <b-nav-form>
            <b-button size="sm" class="m-2 my-sm-0 px-3 navbar-btn"
              ><router-link :to="{ path: '/register' }" replace
                >خروج</router-link
              ></b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div>
      <b-tabs class="" active-nav-item-class="bg-light bg-gradient" justified>
        <b-tab title="بررسی احراز هویت‌ها" title-link-class="text-dark" active>
          <authentication />
        </b-tab>
        <b-tab title="بررسی درخواست‌ افزودن استاد" title-link-class="text-dark">
          <add-prof />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import AddProf from "./AddProf.vue";
import Authentication from "./Authentication.vue";
export default {
  components: { Authentication, AddProf },
  data() {
    return {};
  },
};
</script>

<style>
body {
  background: #e7ecef;
}
.navbar-color {
  background-color: #274c77 !important;
}
.navbar-btn a,
.nabar-btn a:hover {
  color: #274c77 !important;
  text-decoration: none !important;
}
.navbar-btn {
  background-color: #e7ecef !important;
  color: #274c77;
}
.navbar-brand {
  color: white !important;
}
a,
a:hover {
  color: white !important;
  text-decoration: none !important;
}
</style>
