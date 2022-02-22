<template>
  <div class="container h-100 register-container">
    <div class="d-flex justify-content-center">
      <b-card
        title="ورود"
        tag="article"
        style="width: 40rem"
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

            <label class="sr-only" for="inline-form-input-code">کد ملی</label>
            <b-form-input
              id="inline-form-input-code"
              class="mb-2 mr-sm-2 mb-sm-0 mt-3"
              placeholder="کد ملی"
            ></b-form-input>
            <p class="check-text mt-3">
              قبلا ثبت‌نام نکرده‌اید؟
              <router-link
                class="route-text"
                :to="{ path: '/register' }"
                replace
                >ثبت‌نام</router-link
              >
            </p>
            <b-button class="mt-3 signin-btn" type="submit">ثبت نام</b-button>
          </b-form>
        </b-card-body>
      </b-card>
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
.route-text {
  color: #6096ba !important;
}
</style>
