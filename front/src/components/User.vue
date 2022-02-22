<template>
  <div>
    <div>
      <b-navbar toggleable="expand-lg" class="navbar-color" fixed="top">
        <b-navbar-brand>
          <router-link :to="{ path: '/' }" replace
            >اساتید دانشکده مهندسی کامپیوتر</router-link
          >
        </b-navbar-brand>
        <b-navbar-nav class="mr-auto">
          <b-nav-form>
            <b-button size="sm" class="m-2 my-sm-0 px-3 navbar-btn"
              ><router-link :to="{ path: '/register' }"
                >خروج</router-link
              ></b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class="container mt-5">
      <div class="row mt-3">
        <div class="col-4 info-part">
          <b-card
            title="اطلاعات کاربری"
            tag="article"
            style="width: 20rem"
            class="mb-2 card-shadow"
          >
            <b-card-body>
              <div class="card-body text-center user-card-body">
                <p class="text-right">
                  <span>نام کاربری: </span>
                  <span class="info-content">نونا قاضی زاده </span>
                </p>
                <p class="text-right">
                  <span>شماره دانشجویی: </span>
                  <span class="info-content">۹۸۱۷۱۰۰۷</span>
                </p>
                <p class="text-right">
                  <span>وضعیت احراز هویت: </span
                  ><span class="info-content"> تایید نشده </span>
                </p>
              </div>
            </b-card-body>
          </b-card>
          <b-card
            title="احراز هویت مجدد"
            tag="article"
            style="width: 20rem"
            class="mb-2 card-shadow"
          >
            <b-card-body>
              <b-form>
                <label class="sr-only" for="inline-form-input-stid"
                  >شماره دانشجویی</label
                >
                <b-form-input
                  id="inline-form-input-stid"
                  class="mb-2 mr-sm-2 mb-sm-0 mt-3"
                  placeholder="شماره دانشجویی"
                ></b-form-input>

                <label class="sr-only" for="inline-form-input-code"
                  >کد ملی</label
                >
                <b-form-input
                  id="inline-form-input-code"
                  class="mb-2 mr-sm-2 mb-sm-0 mt-3"
                  placeholder="کد ملی"
                ></b-form-input>
                <b-button class="mt-3 auth-btn" type="submit">ثبت </b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </div>

        <div class="col-5 info-part">
          <b-card
            title="ثبت درخواست افزودن استاد"
            tag="article"
            style="width: 40rem"
            class="mb-2 card-shadow"
          >
            <b-card-body>
              <b-form>
                <label class="sr-only" for="inline-form-input-pname"
                  >نام استاد</label
                >
                <b-form-input
                  id="inline-form-input-pname"
                  class="mb-2 mr-sm-2 mb-sm-0 mt-3"
                  placeholder="نام استاد"
                ></b-form-input>
                <b-button class="mt-3 req-btn" type="submit"
                  >ثبت درخواست</b-button
                >
              </b-form>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style>
.user-card .card .card-title {
  color: #274c77 !important;
}
.user-card-body {
  padding-top: 20px !important;
}

body {
  background: #e7ecef;
}
.info-part {
  margin-top: 20px;
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
.navbar-brand a {
  color: white !important;
}
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
.info-content {
  margin-right: 10px;
}
.auth-btn,
.req-btn {
  background-color: #274c77 !important;
}
</style>
