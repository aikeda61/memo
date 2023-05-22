//1.ページを構成するコンポーネントを定義（他のファイルからインポートすることもできます）
const Home = {
    template: `
    <div class="main">
    <h1>This is Home!</h1>
    </div>
    `
}
const About =  {
    template: `
    <div class="main">
    <h1>This is an About page</h1>
    </div>
    `
}
    
//2.ルートを定義（3.で routes に指定）
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
]
    
//3.ルーターを作成する際に、2.で定義したルート（routes）を渡します
const router = VueRouter.createRouter({
  //4.history オプションを指定（ここでは簡単にするためにハッシュ history を使用）
    history: VueRouter.createWebHashHistory(),
  routes, // routes オプションを指定（routes: routes の短縮表記）
})
    
//5.Vue のインスタンスを生成
const app = Vue.createApp({})
//6.Vue にルーターをインストールして有効化
app.use(router)
//7.Vue のインスタンスをマウント
app.mount('#app')

