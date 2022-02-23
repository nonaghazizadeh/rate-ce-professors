<template>
  <div class="container mt-3">
    <div>
      <b-card
        bg-variant="light"
        class="card-shadow mb-3"
        text-variant="dark"
        title="تایید شماره دانشجویی و کدملی"
        v-for="auth in authentications"
        :key="auth.id"
      >
        <b-card-text>
          <p>
            <span>نام:</span> <span>{{ auth.firstname }}</span>
          </p>
          <p>
            <span>نام خانوادگی:</span> <span>{{ auth.lastname }}</span>
          </p>
          <p>
            <span>شماره دانشجویی:</span> <span>{{ auth.student_number }}</span>
          </p>
          <p>
            <span>کد ملی:</span> <span>{{ auth.code_meli }}</span>
          </p>
        </b-card-text>
        <div class="card-btn">
          <i
            @click="rejectAuth()"
            class="fa-solid fa-xmark fa-2x pointer reject-auth-icon"
          ></i>
          <i
            @click="acceptAuth()"
            class="fa-solid fa-check fa-2x pointer accept-auth-icon"
          ></i>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authentication",
  props: {
    authentications: Array,
  },
  methods: {
    rejectAuth() {},
    acceptAuth() {},
  },
};
</script>

<style scoped>
.card-title {
  text-align: right;
  color: #274c77;
}
.card-text {
  text-align: right;
}
.card-btn {
  text-align: left;
}
.pointer {
  cursor: pointer;
}
.card-shadow {
  box-shadow: 0 5px 10px -6px rgb(0 0 0 / 15%);
}
.reject-auth-icon {
  color: #bb435d;
}
.accept-auth-icon {
  color: #274c77;
  margin-right: 10px;
}
</style>
