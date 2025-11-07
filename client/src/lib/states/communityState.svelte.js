import { browser } from "$app/environment";
import * as communitiesApi from "$lib/apis/communitiesApi.svelte";

let communityState = $state([]);

const initCommunities = async () => {
    if (browser) {
        communityState = await communitiesApi.readCommunities();
    }
};

const initComminty = async (id) => {
    if (browser) {
        const community = await communitiesApi.readComminity(id);
        if (community && !communityState.find((c) => c.id === community.id)) {
            communityState.push(community);
        }
    }
};

const useCommunityState = () => {
    return {
        get communities() {
            return communityState;
        },
        getOne: (id) => {
            return communityState.find((c) => c.id === id);
        },
        addCommunity: (community) => {
            communitiesApi.createCommunity(community).then((newCommunity) => {
                communityState.push(newCommunity);
            });
        },
        removeCommunity: (id) => {
            communitiesApi.deleteCommunity(id).then(() => {
                communityState = communityState.filter((c) => c.id !== id);
            });
        },
        updateCommunity: (community) => {
            const index = communityState.findIndex((c) => c.id === community.id);
            if (index !== -1) {
                communityState[index] = community;
            }
        },
    };
};

export { useCommunityState, initCommunities, initComminty };
