<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="Search Team" @search="onSearch" />
    <van-button type="primary" @click="doJoinTeam">Create a Team</van-button>
    <team-card-list :teamList="teamList" />
    <van-empty v-if="teamList?.length < 1" description="Data is null"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast, Toast} from "vant";

const router = useRouter();
const searchText = ref('');

// 跳转到加入队伍页
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showToast('Failed to load the team, please refresh and try again');
  }
}


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
