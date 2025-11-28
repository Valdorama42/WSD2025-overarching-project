import { browser } from "$app/environment";
import { readHomePagePosts } from "$lib/apis/postsApi.js";

let homePageState = $state([]);

const initHomePage = async () => {
    if (!browser) {
        return;
    }
    homePageState = await readHomePagePosts();
};

const useHomePageState = () => {
    return {
        get posts() {
            return homePageState;
        },
        initHomePage,
    };
};

export { useHomePageState, initHomePage };
