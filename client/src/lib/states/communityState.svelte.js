import { browser } from "$app/environment";
import * as communitiesApi from "$lib/apis/communitiesApi.js";

let communityState = $state([]);

const initCommunities = async () => {
    if (browser) {
        communityState = await communitiesApi.readCommunities();
    }
};

const initCommunity = async (id) => {
    if (browser) {
        const community = await communitiesApi.readCommunity(id);
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

export { useCommunityState, initCommunities, initCommunity };
