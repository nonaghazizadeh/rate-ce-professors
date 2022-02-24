<template>
  <div class="container mt-3">
    <b-container>
      <b-row>
        <b-col class="mt-5" cols="6">
          <div class="table">
            <b-table
              :busy="loading"
              :items="items"
              :fields="fields"
              sticky-header="400px"
              style="height: 25rem"
              class="prof-table card-shadow"
              show-empty
            >
              <template #table-busy>
                <div class="loader-circle">
                  <span class="circle circle-1"></span>
                  <span class="circle circle-2"></span>
                  <span class="circle circle-3"></span>
                  <span class="circle circle-4"></span>
                  <span class="circle circle-5"></span>
                  <span class="circle circle-6"></span>
                  <span class="circle circle-7"></span>
                  <span class="circle circle-8"></span>
                </div>
              </template>
              <template #empty>
                <h4>هیج درخواستی وجود ندارد.</h4>
              </template>
            </b-table>
          </div>
        </b-col>
        <b-col class="add-card d-flex justify-content-center" cols="6">
          <div>
            <b-card
              title="افزودن استاد"
              tag="article"
              style="width: 30rem; height: 25rem"
              class="mb-2 card-shadow add-prof-card"
            >
              <b-card-body>
                <b-form>
                  <label class="sr-only" for="inline-form-input-name"
                    >نام استاد</label
                  >
                  <b-form-input
                    id="inline-form-input-name"
                    class="mb-2 mb-sm-0 add-form"
                    placeholder="نام استاد"
                    v-model="profName"
                  ></b-form-input>

                  <label class="sr-only" for="inline-form-input-image"
                    >آدرس عکس استاد</label
                  >
                  <b-form-input
                    id="inline-form-input-image"
                    class="mb-2 mb-sm-0 mt-3 add-form"
                    placeholder="آدرس عکس استاد"
                    v-model="profImageUrl"
                  ></b-form-input>

                  <label class="sr-only" for="inline-form-input-email"
                    >آدرس ایمیل استاد</label
                  >
                  <b-form-input
                    id="inline-form-input-email"
                    type="email"
                    class="mb-2 mb-sm-0 mt-3 add-form"
                    placeholder="آدرس ایمیل استاد"
                    v-model="profEmail"
                  ></b-form-input>
                  <b-form-textarea
                    id="textarea-default"
                    placeholder="توضیحات"
                    class="mt-3 add-form"
                    v-model="profInfo"
                  ></b-form-textarea>

                  <b-button class="mt-3 add-prof-btn btn-shadow" @click="addNewProfessor()"
                    >ثبت استاد</b-button
                  >
                </b-form>
              </b-card-body>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      items: [],
      fields: [
        {
          key: "نام استاد",
          sortable: false,
        },
        {
          key: "تعداد",
          sortable: true,
        },
      ],
      profName: "",
      profImageUrl: "",
      profEmail: "",
      profInfo: "",
      toastCount: 0,
    };
  },
  created() {
    this.getAddProfsReqsData();
  },
  methods: {
    getAddProfsReqsData() {
      axios
        .get(`https://617534a508834f0017c70b5c.mockapi.io/api/v1/add_prof_reqs`)
        .then((response) => {
          console.log(response.data);
          this.items = response.data;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addNewProfessor() {
      const data = {
        name: this.profName,
        image_url: this.profImageUrl,
        email: this.profEmail,
        info: this.profInfo,
      };
      axios
        .post("https://617534a508834f0017c70b5c.mockapi.io/api/v1/new/", data)
        .then(() => {
          this.makeSuccessToast()
        }).catch((e) => {
          console.error(e)
          this.makeFailToast()
        })
    },
    makeSuccessToast() {
      this.$bvToast.toast('افزودن استاد با موفقیت انجام شد.', {
        autoHideDelay: 5000,
        toaster: 'b-toaster-bottom-left',
        noCloseButton: true,
        bodyClass: 'right-text'
      });
    },
    makeFailToast() {
      this.$bvToast.toast('افزودن استاد ناموفق بود.', {
        autoHideDelay: 5000,
        toaster: 'b-toaster-bottom-left',
        noCloseButton: true,
        bodyClass: 'right-text'
      });
    }
  },
};
</script>

<style>
.add-card {
  margin-top: 82px;
}
.btn-shadow {
  box-shadow: 0 5px 10px -2px rgb(0 0 0 / 30%);
}
.card-shadow {
  box-shadow: 0 5px 10px -6px rgb(0 0 0 / 50%);
}
.add-prof-card {
  border-radius: 20px;
}
.add-prof-btn,
.add-prof-btn:hover {
  background-color: #274c77 !important;
  border-radius: 20px;
  width: 100px;
}
.add-form {
  background-color: #e9ecef;
  border-radius: 10px;
}
.card-title {
  color: #274c77;
}
.prof-table {
  border-radius: 20px;
  margin-top: 35px;
}
.table {
  background-color: white;
  color: #274c77 !important;
  border-color: #274c77;
  border-radius: 15px;
}
th {
  background-color: #274c77 !important;
  color: white !important;
}
.b-table-busy-slot td {
  border-style: hidden;
}
.loader-circle {
  margin-top: 25%;
}
.right-text {
  text-align: right;
}
.form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
</style>
