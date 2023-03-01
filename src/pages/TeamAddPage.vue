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
        <van-field name="stepper" label="Maximum Size">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>
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
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
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

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast, Toast} from "vant";

const router = useRouter();
// 展示日期选择器
const showPicker = ref(false);

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": "",
  "maxNum": 3,
  "password": "",
  "status": '0',
}

const minDate = new Date();

// 需要用户填写的表单数据
const addTeamData = ref({...initFormData})


const onConfirm = ({ selectedValues }) => {
  addTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
  //console.log(initFormData.expireTime);
};
// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  //console.log(postData);
  // todo 前端参数校验
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data){
    showToast('Add Successfully');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    showToast('Add Failure');
  }
}
</script>

<style scoped>
#teamPage {

}
</style>
