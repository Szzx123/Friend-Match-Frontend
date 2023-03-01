<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="Team Name"
            placeholder="Please enter team name"
            :rules="[{ required: true, message: 'Please enter team name' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="Team Description"
            type="textarea"
            placeholder="Please enter a team description"
        />
        <van-field
            v-model="addTeamData.expireTime"
            is-link
            readonly
            name="datePicker"
            label="Expiration time"
            :placeholder="addTeamData.expireTime ?? 'Click to select the expiration date'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              @confirm="onConfirm"
              type="datetime"
              title="Please select the expiration date"
              :min-date="minDate"
          />
        </van-popup>
        <van-field name="radio" label="Team Status">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">Public</van-radio>
              <van-radio name="1">Private</van-radio>
              <van-radio name="2">Encrypted</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="Password"
            placeholder="Please enter the team password"
            :rules="[{ required: true, message: 'Please fill in the password' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          Submit
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast, Toast} from "vant";

const router = useRouter();
const route = useRoute();

// 展示日期选择器
const showPicker = ref(false);

const minDate = new Date();

const id = route.query.id;

// 需要用户填写的表单数据
const addTeamData = ref({})
// const addTeamData = ref({...initFormData})
// 获取之前的队伍信息
onMounted(async () => {
  if (id <= 0) {
    Toast.fail('Failed to load queue');
    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id,
    }
  });
  if (res?.code === 0) {
    addTeamData.value = res.data;
  } else {
    Toast.fail('Failed to load the team, please refresh and try again');
  }}
)

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data){
    showToast('Update successfully');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    showToast('Update Failure');
  }
}

const onConfirm = ({ selectedValues }) => {
  addTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
  //console.log(initFormData.expireTime);
};
</script>

<style scoped>
#teamPage {

}
</style>
