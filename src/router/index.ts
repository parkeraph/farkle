import { createRouter, createWebHistory } from 'vue-router';
import { Home, Game, ScoreBoard, GameNotFound } from '../views'

const routes = [
    { path: '/', name:'home', component: Home },
    { path: '/game/:gameKey', component: Game },
    { path: '/game', redirect: '/' },
    { path: '/gameNotFound', name: 'gameNotFound', component: GameNotFound },
    { path: '/scoreboard/:gameKey', name: 'scoreboard', component: ScoreBoard}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
