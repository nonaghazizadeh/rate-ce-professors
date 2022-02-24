<template>
  <div>
    <loader v-if="loading" />
    <div v-if="!loading" class="container mt-3">
      <div v-if="authentications.length === 0">
        درخواستی وجود ندارد.
      </div>
      <div v-if="authentications.length !== 0">
        <b-card
          bg-variant="light"
          class="card-shadow mb-3 auth-card"
          text-variant="dark"
          v-for="auth in authentications"
          :key="auth.id"
        >
          <b-row>
            <div class="card-title col-4">
              <h4>تایید شماره دانشجویی و کد ملی</h4>
            </div>
            <div class="card-btn col-8">
              <i
                @click="rejectAuth(auth.id)"
                class="fa-solid fa-xmark fa-2x pointer reject-auth-icon"
              ></i>
              <i
                @click="acceptAuth(auth.id)"
                class="fa-solid fa-check fa-2x pointer accept-auth-icon"
              ></i>
            </div>
          </b-row>
          <b-card-text>
            <p>
              <span>نام: </span> <span>{{ auth.firstname }}</span>
            </p>
            <p>
              <span>نام خانوادگی: </span> <span>{{ auth.lastname }}</span>
            </p>
            <p>
              <span>شماره دانشجویی: </span>
              <span>{{ auth.student_number }}</span>
            </p>
            <p>
              <span>کد ملی: </span> <span>{{ auth.code_meli }}</span>
            </p>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader.vue";
import axios from "axios";
export default {
  components: { Loader },
  name: "Authentication",
  data() {
    return {
      loading: true,
      authentications: [],
    };
  },
  created() {
    this.getPendingStudents();
  },
  methods: {
    rejectAuth(id) {
      this.loading = true;
      const data = {
        id: id,
        accept: false,
      };
      axios
        .put("http://192.168.1.239:8080/students/accept", data)
        .then((response) => {
          this.authentications = response.data;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    acceptAuth(id) {
      this.loading = true;
      const data = {
        id: id,
        accept: true,
      };
      axios
        .put("http://192.168.1.239:8080/students/accept", data)
        .then((response) => {
          this.authentications = response.data;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getPendingStudents() {
      axios
        .get("http://192.168.1.239:8080/students/pendings")
        .then((response) => {
          this.authentications = response.data;
          this.loading = false;
        });
    },
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
.auth-card {
  border-radius: 20px;
}
.auth-card .card-body {
  padding-bottom: 0.3rem !important;
}
.pointer {
  cursor: pointer;
}
.card-shadow {
  box-shadow: 0 5px 10px -6px rgb(0 0 0 / 50%);
}
.reject-auth-icon {
  color: #bb435d;
}
.accept-auth-icon {
  color: #274c77;
  margin-right: 10px;
}
</style>
