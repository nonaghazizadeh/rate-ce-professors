<template>
  <div>
    <b-navbar toggleable="expand-lg" class="navbar-color" fixed="top">
      <b-navbar-brand>
        <router-link :to="{ path: '/' }" replace
          >اساتید دانشکده مهندسی کامپیوتر</router-link
        >
      </b-navbar-brand>
    </b-navbar>
    <div class="container h-100 register-container">
      <div class="d-flex justify-content-center">
        <b-card
          title="ورود مدیر"
          tag="article"
          style="width: 40rem"
          class="mb-2 card-shadow"
        >
          <b-card-body>
            <b-form>
              <label class="sr-only" for="inline-form-input-username"
                >نام کاربری</label
              >
              <b-form-input
                id="inline-form-input-username"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3"
                placeholder="نام کاربری"
              ></b-form-input>

              <label class="sr-only" for="inline-form-input-password">رمز عبور</label>
              <b-form-input
                id="inline-form-input-password"
                class="mb-2 mr-sm-2 mb-sm-0 mt-3"
                placeholder="رمز عبور"
              ></b-form-input>
              <b-button class="mt-3 signin-btn" type="submit">ورود</b-button>
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
.signin-btn {
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
