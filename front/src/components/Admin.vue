<template>
  <div>
    <div>
      <b-navbar toggleable="expand-lg" class="navbar-color">
        <b-navbar-brand>سایت اساتید دانشکده مهندسی کامپیوتر</b-navbar-brand>
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
      <b-tabs
        class=""
        active-nav-item-class="font-weight-bold text-danger bg-light bg-gradient"
        justified
      >
        <b-tab title="بررسی احراز هویت‌ها" title-link-class="text-dark" active
          ><authentication :authentications="authentications"
        /></b-tab>
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
    return {
      authentications: [
        {
          id: 1,
          firstname: "نونا",
          lastname: "قاضی زاده",
          student_number: "۹۸۱۷۱۰۰۷",
          code_meli: "۰۴۴۰۹۷۹۶۵۱",
        },
        {
          id: 2,
          firstname: "شایان",
          lastname: "محمدی زاده",
          student_number: "۹۸۱۰۲۲۷۳",
          code_meli: "۰۴۴۰۹۷۹۶۵۱",
        },
      ],
    };
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
a,
a:hover {
  color: #274c77;
  text-decoration: none;
}
.navbar-btn {
  background-color: #e7ecef !important;
  color: #274c77;
}
</style>
