<template>
  <div>
    <div>
      <b-navbar toggleable="expand-lg" class="navbar-color" fixed="top">
        <b-navbar-brand>
          <router-link :to="{ path: '/' }" replace
            >اساتید دانشکده مهندسی کامپیوتر</router-link
          >
        </b-navbar-brand>
      </b-navbar>
    </div>
    <div class="container h-100 register-container">
      <div class="d-flex justify-content-center">
        <b-card
          title=" ثبت نام کاربر"
          tag="article"
          style="width: 40rem"
          class="mb-2 card-shadow"
        >
          <b-card-body>
            <b-form>
              <label class="sr-only" for="inline-form-input-name">نام</label>
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="نام"
              ></b-form-input>

              <label class="sr-only" for="inline-form-input-lastname"
                >نام خانوادگی</label
              >
              <b-form-input
                id="inline-form-input-lastname"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3"
                placeholder="نام خانوادگی"
              ></b-form-input>

              <label class="sr-only" for="inline-form-input-stid"
                >شماره دانشجویی</label
              >
              <b-form-input
                id="inline-form-input-stid"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3"
                placeholder="شماره دانشجویی"
              ></b-form-input>

              <label class="sr-only" for="inline-form-input-code">کد ملی</label>
              <b-form-input
                id="inline-form-input-code"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3"
                placeholder="کد ملی"
              ></b-form-input>
              <p class="check-text mt-3">
                قبلا ثبت‌نام کرده‌اید؟
                <router-link class="route-text" :to="{ path: '/login' }" replace
                  >ورود به سایت</router-link
                >
              </p>
              <b-button class="mt-3 signup-btn" type="submit">ثبت نام</b-button>
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
.register-container {
  padding-top: 10%;
  margin-top: auto;
  margin-bottom: auto;
}
.check-text {
  text-align: left;
  color: #8b8c89;
}
.card-shadow {
  box-shadow: 0 5px 10px -6px rgb(0 0 0 / 15%);
}
.signup-btn {
  background-color: #274c77 !important;
}
.card-title {
  color: #274c77;
}
.route-text,
.route-text:hover {
  color: #6096ba !important;
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
</style>
