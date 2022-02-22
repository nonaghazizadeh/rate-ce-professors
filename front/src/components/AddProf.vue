<template>
  <div class="container mt-3">
    <b-container>
      <b-row>
        <b-col class="mt-5" cols="6">
          <div class="table">
            <b-table
              :items="items"
              :fields="fields"
              sticky-header="400px"
              class="prof-table"
            ></b-table>
          </div>
        </b-col>
        <b-col class="add-card d-flex justify-content-center" cols="6">
          <div>
            <b-card
              title="افزودن استاد"
              tag="article"
              style="width: 30rem"
              class="mb-2 card-shadow"
            >
              <b-card-body>
                <b-form>
                  <label class="sr-only" for="inline-form-input-name"
                    >نام استاد</label
                  >
                  <b-form-input
                    id="inline-form-input-name"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="نام استاد"
                  ></b-form-input>

                  <label class="sr-only" for="inline-form-input-image"
                    >آدرس عکس استاد</label
                  >
                  <b-form-input
                    id="inline-form-input-image"
                    class="mb-2 mr-sm-2 mb-sm-0 mt-3"
                    placeholder="آدرس عکس استاد"
                  ></b-form-input>

                  <label class="sr-only" for="inline-form-input-email"
                    >آدرس ایمیل استاد</label
                  >
                  <b-form-input
                    id="inline-form-input-email"
                    type="email"
                    class="mb-2 mr-sm-2 mb-sm-0 mt-3"
                    placeholder="آدرس ایمیل استاد"
                  ></b-form-input>
                  <b-form-textarea
                    id="textarea-default"
                    placeholder="توضیحات"
                    class="mt-3"
                  ></b-form-textarea>

                  <b-button class="mt-3 add-prof-btn" type="submit"
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
export default {
  data() {
    return {
      items: [
        { "نام استاد": "دکتر رهبان", "تعداد": "۳" },
        { "نام استاد": "دکتر عیسی زاده", "تعداد": "۲" },
        { "نام استاد": "دکتر معینی", "تعداد": "۳" },
        { "نام استاد": "دکتر خرازی", "تعداد": "۴" },
        { "نام استاد": "دکتر جعفری", "تعداد": "۴" },
        { "نام استاد": "دکتر جهانگیر", "تعداد": "۳" },
        { "نام استاد": "دکتر حسنی", "تعداد": "۶" },
        { "نام استاد": "دکتر یابی", "تعداد": "۳" },
        { "نام استاد": "دکتر راسنکی", "تعداد": "۳" },
        { "نام استاد": "دکتر ضارب", "تعداد": "۳" },
        { "نام استاد": "دکتر آبام", "تعداد": "۳" },
      ],
      fields: ["نام استاد", "تعداد"],
    };
  },
};
</script>

<style>
.add-card {
  margin-top: 82px;
}
.card-shadow {
  box-shadow: 0 5px 10px -6px rgb(0 0 0 / 15%);
}
.add-prof-btn,
.add-prof-btn:hover {
  background-color: #274c77 !important;
}
.card-title {
  color: #274c77;
}
.table {
  background-color: #e7ecef;
  color: #274c77 !important;
  border-color: #274c77;
}
th {
  background-color: #274c77 !important;
  color: white !important;
}
</style>
