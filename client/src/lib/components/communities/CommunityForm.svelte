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
    <form 
        class="mx-auto mt-10 p-6 rounded-3xl shadow-xl
               bg-white/70 backdrop-blur-lg border border-gray-700
               animate-fade-in"
        onsubmit="{addCommunity}"
    >
        <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Create a New Community
        </h2>

        <!-- Community Name -->
        <div class="relative mb-6">
            <input 
                type="text" 
                id="name" 
                name="name"
                placeholder=" "  
                class="peer w-full bg-white/60 border border-gray-300 
                       text-gray-900 rounded-xl px-4 py-3
                       focus:outline-none focus:ring-4 focus:ring-indigo-200 
                       focus:border-indigo-500 transition"
            />
            <label 
                for="name"
                class="absolute text-gray-500 text-sm left-4 top-3 
                       transition-all duration-200
                       peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400
                       peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
                       bg-white/70 px-1 rounded"
            >
                Community Name
            </label>
        </div>

        <!-- Description -->
        <div class="relative mb-6">
            <textarea 
                id="description" 
                name="description" 
                placeholder=" "
                class="peer w-full bg-white/60 border border-gray-300 
                       text-gray-900 rounded-xl px-4 py-3 h-28
                       focus:outline-none focus:ring-4 focus:ring-indigo-200 
                       focus:border-indigo-500 transition resize-none"
            ></textarea>

            <label 
                for="description"
                class="absolute text-gray-500 text-sm left-4 top-3 
                       transition-all duration-200
                       peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400
                       peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-600
                       bg-white/70 px-1 rounded"
            >
                Description
            </label>
        </div>

        <!-- Submit Button -->
        <button 
            type="submit"
            class="w-full py-3 rounded-xl text-white font-semibold
                   bg-linear-to-r from-indigo-600 to-purple-600
                   hover:from-indigo-700 hover:to-purple-700
                   transition-all shadow-md active:scale-[0.98]"
        >
            Add Community
        </button>
    </form>
{/if}
