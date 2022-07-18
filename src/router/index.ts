import { createRouter, createWebHistory } from 'vue-router';
import { Home, Game, Jumbotron, GameNotFound } from '../views'

const routes = [
    { path: '/', name:'home', component: Home },
    { path: '/game/:gameKey', component: Game },
    { path: '/game', redirect: '/' },
    { path: '/gameNotFound', name: 'gameNotFound', component: GameNotFound },
    { path: '/jumbotron/:gameKey', name: 'jumbotron', component: Jumbotron}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
