import Index from "@/components/index/Index.vue";
import Sslx from "@/components/sslx/Sslx.vue";
import Wyzx from "@/components/Wyzx.vue";
import Fgly from "@/components/Fgly.vue";
import Intro from "@/components/intro/Intro.vue";
import { markRaw } from "vue";

export const FGLY = 'fgly';
export const SSLX = 'sslx';
export const WYZX = 'wyzx';
export const INDEX = 'index';
export const INTRO = 'intro';

export const DEFAULT_MENU = INDEX;

export const MENU_LIST = [
    {
        name: '主页',
        key: INDEX,
    },
    {
        name: '乌有之乡',
        key: WYZX,
    },
    {
        name: '随思乱想',
        key: SSLX,
    },
    {
        name: '浮光掠影',
        key: FGLY,
    },
];

export const COMPONENT_MAP = new Map([
    [INDEX, markRaw(Index)],
    [SSLX, markRaw(Sslx)],
    [WYZX, markRaw(Wyzx)],
    [FGLY, markRaw(Fgly)],
    [INTRO, markRaw(Intro)]
]);