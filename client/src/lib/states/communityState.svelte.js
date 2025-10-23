import { browser } from "$app/environment";

const COMMUNITIES_KEY = "communities";
let initialCommunities = [];

if (browser && localStorage.getItem(COMMUNITIES_KEY) != null) {
    initialCommunities = JSON.parse(localStorage.getItem(COMMUNITIES_KEY));
}

let communityState = $state(initialCommunities);

const saveCommunities = () => {
    localStorage.setItem(COMMUNITIES_KEY, JSON.stringify(communityState));
}

const useCommunityState = () => {
    return {
        get communities() {
            return communityState;
        },
        getOne: (id) => {
            return communityState.find((c) => c.id === id);
        },
        addCommunity: (name, description) => {
            communityState.push({id: communityState.length + 1, name, description});
            saveCommunities();
        },
        removeCommunity: (id) => {
            communityState = communityState.filter((c) => c.id !== id);
            saveCommunities();
        },
    };
};

export { useCommunityState };
