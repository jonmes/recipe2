<template>
    <form
        @submit.prevent="sendFile"
        enctype="multipart/form-data"
        class="rounded-lg hover:shadow-xl bg-gray-50 mb-6"
    >
        <div class="m-4">
            <label class="inline-block mb-2 text-gray-500 mb-4">Upload Profile</label>
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
                    <input
                        multiple
                        name="photos"
                        class="hidden"
                        type="file"
                        accept="image/*"
                        @change="selectFile($event)"
                    />
                </label>
            </div>
        </div>
        <div class="ml-10">
            <div
                v-for="(file, index) in filesHolder"
                :key="index"
                class="flex justify-between w-80 mb-4"
            >
                <div class="text-black" :class="{ 'text-red': file.invalidMessage }">
                    <span v-if="index == 0">Thumbnail &nbsp;</span>
                    {{ file.name }}
                </div>
                <div>
                    <button
                        @click.prevent="filesHolder.splice(index, 1); uploadFiles.splice(index, 1)"
                    >
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="red"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.22676 4.22676C4.5291 3.92441 5.01929 3.92441 5.32163 4.22676L12 10.9051L18.6784 4.22676C18.9807 3.92441 19.4709 3.92441 19.7732 4.22676C20.0756 4.5291 20.0756 5.01929 19.7732 5.32163L13.0949 12L19.7732 18.6784C20.0756 18.9807 20.0756 19.4709 19.7732 19.7732C19.4709 20.0756 18.9807 20.0756 18.6784 19.7732L12 13.0949L5.32163 19.7732C5.01929 20.0756 4.5291 20.0756 4.22676 19.7732C3.92441 19.4709 3.92441 18.9807 4.22676 18.6784L10.9051 12L4.22676 5.32163C3.92441 5.01929 3.92441 4.5291 4.22676 4.22676Z"
                                fill="#030D45"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <button type="submit">Upload</button>
    </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import _ from 'lodash'
import axios from 'axios'

// ================== Variables ====================
const emits = defineEmits(["imgFiles"])
const is_dragover = ref(false)
const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
const base64str = ref()
const filesHolder = ref([])
const uploadFiles = ref([])
const toBeSent = ref([])
// ============== Functions ==================


const validate = (file) => {

    if (!allowedTypes.includes(file.type)) {
        alert("not an image")
        return "Not an Image!"
    }

    return "";
}

const selectFile = ($event) => {
    is_dragover.value = false

    const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];


    uploadFiles.value = [...uploadFiles.value, files]

    toBeSent.value = uploadFiles.value.flat(2)

    filesHolder.value = [
        ...filesHolder.value,
        ..._.map(files, file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            invalidMessage: validate(file)
        }))
    ]
}

console.log('before sending');


const sendFile = async () => {
    let imgData = []
    _.forEach(toBeSent.value, file => {
        if (validate(file) === "") {
            imgData.push({url: file})
        }
    })
    console.log(imgData, 'image data');
    emits("imgFiles", imgData)

        toBeSent.value = []
        filesHolder.value = []
        uploadFiles.value = []
}




</script>

<style lang="scss" scoped>
</style>