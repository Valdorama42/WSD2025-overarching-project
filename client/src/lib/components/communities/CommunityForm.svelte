<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte";

    let communityState = useCommunityState();
    let authState = useAuthState();

    const addCommunity = (e) => {
        e.preventDefault();

        const community = Object.fromEntries(new FormData(e.target));
        communityState.addCommunity(community);
        e.target.reset();
    };

</script>

{#if authState.user}
    <form class="max-w-md mx-auto mt-6" onsubmit="{addCommunity}">
        <h2 class="text-2xl mb-4">Create a New Community</h2>
        <div class="mb-4">
            <label>Community Name:
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Community name"
                    class="w-full" 
                />
            </label>
        </div>
        <div class="mb-4">
            <label>Description:
                <textarea 
                    id="description" 
                    name="description" 
                    placeholder="Community description"
                    class="w-full"></textarea>
            </label>
        </div>
        <button 
            type="submit"
            class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            Add Community
        </button>
    </form>
{/if}