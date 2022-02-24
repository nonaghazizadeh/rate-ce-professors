<template>
  <div>
    <b-navbar toggleable="expand-lg" class="navbar-color" fixed="top">
      <b-navbar-brand>
        <router-link :to="{ path: '/' }" replace
          >اساتید دانشکده مهندسی کامپیوتر</router-link
        >
      </b-navbar-brand>
    </b-navbar>
    <div class="container h-100 login-container">
      <div class="d-flex justify-content-center">
        <b-card
          title="ورود کاربر"
          tag="article"
          style="width: 40rem"
          class="mb-2 card-shadow login-card"
        >
          <b-card-body>
            <b-form>
              <label class="sr-only" for="inline-form-input-stid"
                >شماره دانشجویی</label
              >
              <b-form-input
                id="inline-form-input-stid"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3 login-form"
                placeholder="شماره دانشجویی"
              ></b-form-input>

              <label class="sr-only" for="inline-form-input-code">کد ملی</label>
              <b-form-input
                id="inline-form-input-code"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3 login-form"
                placeholder="کد ملی"
              ></b-form-input>
              <b-button class="mt-3 signin-btn btn-shadow" type="submit">ورود</b-button>
              <p class="check-text mt-3">
                <router-link
                  class="route-text"
                  :to="{ path: '/register' }"
                  replace
                  >قبلا ثبت‌نام نکرده‌اید؟</router-link
                >
              </p>
            </b-form>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.login-container {
  padding-top: 13%;
  margin-top: auto;
  margin-bottom: auto;
}
.login-card {
  border-radius: 20px;
}
.login-card .card-body {
  padding-bottom: 0.3rem !important;
}
.card-shadow {
  box-shadow: 0 5px 10px -6px rgb(0 0 0 / 50%);
}
.btn-shadow {
  box-shadow: 0 5px 10px -2px rgb(0 0 0 / 30%);
}
.signin-btn {
  background-color: #274c77 !important;
  border-radius: 20px;
  width: 100px;
}
.card-title {
  color: #274c77;
}
.check-text {
  text-align: left;
  color: #274c77;
}
.route-text,
.route-text:hover {
  color: #274c77 !important;
}
.navbar-color {
  background-color: #274c77 !important;
}
.professors-container {
  margin-top: 5rem !important;
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
.login-form {
  background-color: #e9ecef;
  border-radius: 10px;
}
.form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
</style>
