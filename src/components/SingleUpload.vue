<template>
    <div class="rounded-lg hover:shadow-xl bg-gray-50 mb-6">
        <div class="m-4">
            <label class="inline-block mb-2 text-gray-500 mb-4">Upload Thumbnail</label>
            <div class="flex items-center justify-center w-full">
                <label
                    class="mb-4 flex flex-col w-full h-32 border-4 border-green-200 border-dashed hover:bg-green-100 hover:border-green-300 cursor-pointer"
                    :class="{ 'bg-green-100 border-green-400': is_dragover }"
                    @drag.prevent.stop
                    @dragstart.prevent.stop
                    @dragend.prevent.stop="is_dragover = false"
                    @dragover.prevent.stop="is_dragover = true"
                    @dragenter.prevent.stop="is_dragover = true"
                    @dragleave.prevent.stop="is_dragover = false"
                    @drop.prevent.stop="upload($event)"
                >
                    <div class="flex flex-col items-center justify-center pt-7">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <p
                            class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
                        >Attach a Photo</p>
                    </div>
                    <vee-field
                        name="photo"
                        class="hidden"
                        type="file"
                        accept="image/*"
                        @change="upload($event)"
                    />
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// ================== Variables ====================
const is_dragover = ref(false)
const emits = defineEmits(["alert"])

// ============== Functions ==================

const showAlert = () => {
    alert("not an image")
}

const upload = ($event) => {
    is_dragover.value = false
    const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];

    if (files[0].type !== 'image/jpeg' && files[0].type !== 'image/png') {
        console.log("not correct file type")
        showAlert()
        return
    } else {

        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
            var base64str = reader.result
            console.log(base64str,'this is basestr');
        }
        reader.onerror = (err) => {
            console.log(err, 'something wrong went wrong');
        }

    }

}




</script>

<style lang="scss" scoped>
</style>