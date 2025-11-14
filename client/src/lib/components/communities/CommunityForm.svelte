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
    <form onsubmit="{addCommunity}">
        <div>
            <label>Community Name:
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Community name" 
                />
            </label>
        </div>
        <div>
            <label>Description:
                <textarea 
                    id="description" 
                    name="description" 
                    placeholder="Community description">
                </textarea>
            </label>
        </div>
        <button type="submit">Add Community</button>
    </form>
{/if}