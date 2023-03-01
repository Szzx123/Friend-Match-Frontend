import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLogPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue"
import TeamUpdatePage from "../pages/TeamUpdatePage.vue"
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue"
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue"

const routes = [
    { path: '/', component: Index },
    { path: '/team', title: 'Find Team', component: Team },
    { path: '/team/add', title: 'Create Team', component: TeamAddPage },
    { path: '/team/update', title: 'Update Team', component: TeamUpdatePage },
    { path: '/user', title: 'Personal Information', component: UserPage },
    { path: '/search', title: 'Find Partners', component: SearchPage },
    { path: '/user/list', title: 'User List', component: SearchResultPage },
    { path: '/user/edit', title: 'Edit Information', component: UserEditPage },
    { path: '/user/login', title: 'Login', component: UserLoginPage },
    { path: '/user/update', title: 'Update Information', component: UserUpdatePage },
    { path: '/user/team/join', title: 'Join Team', component: UserTeamJoinPage },
    { path: '/user/team/create', title: 'Create Team', component: UserTeamCreatePage },
]

export default routes;