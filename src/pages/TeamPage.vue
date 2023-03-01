<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="Search Teams" @search="onSearch" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="Public" name="public" />
      <van-tab title="Private" name="private" />
    </van-tabs>
    <div style="margin-bottom: 16px" />
    <van-button type="primary" class="add-button" icon="plus"  @click="doJoinTeam"></van-button>
    <team-card-list :teamList="teamList" />
    <van-empty v-if="teamList?.length < 1" description="Data is null"/>
  </div>

</template>

<script setup>

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
const searchText = ref('');
const router  = useRouter();
const active = ref('public');
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const onTabChange = (name) => {
  // 查公开
  if (name === 'public') {
    listTeam(searchText.value, 0);
  } else {
    // 查加密
    listTeam(searchText.value, 2);
  }
}


const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showToast('Failed to load the team, please refresh and try again');
  }
}



const teamList = ref([]);
// 页面加载时只触发一次
onMounted( () => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
};

</script>

<style scoped>
#teamPage {

}
</style>