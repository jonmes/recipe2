<template>
  <div class="flex justify-center mt-20">
    <h1 class="text-4xl">
      Create
      <span
        class="before:block before:absolute before:-inset-1 hover:shadow-xl hover:before:-skew-y-1 before:-skew-y-6 before:bg-green-100 relative inline-block"
      >
        <span class="relative text-green">Your Own &nbsp;</span>
      </span>&nbsp;Recipe
    </h1>
  </div>
  <div
    class="flex flex-wrap justify-center px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24 z-0 bg-gradient-to-br from-transparent to-green-100"
  >
    <Form
      v-slot="{ values }"
      class="relative md:m-10 md:2-1/2 w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit="handleSubmit"
    >
      <!-- ================================== PROCESSES ================================================== -->
      <div class="w-full py-6">
        <div class="flex justify-center">
          <div class="w-1/4">
            <div class="relative mb-2">
              <div
                class="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center"
              >
                <span class="text-center text-white w-full flex justify-center">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z"
                    />
                    <path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" />
                  </svg>
                </span>
              </div>
            </div>

            <div class="text-xs text-center md:text-base">Add Recipes Description</div>
          </div>

          <div class="w-1/4">
            <div class="relative mb-2">
              <div
                class="absolute flex align-center items-center align-middle content-center"
                style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
              >
                <div
                  class="w-0 py-1 rounded"
                  style="width: 100%;"
                  :class="[process >= 2 ? 'bg-green-300' : 'bg-gray-300']"
                ></div>
              </div>

              <div
                class="w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center"
                :class="[process >= 2 ? 'bg-green-500' : 'bg-gray-300']"
              >
                <span class="text-center text-white w-full flex justify-center">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    enable-background="new 0 0 314.862 314.862"
                    width="30"
                    height="30"
                  >
                    <g>
                      <path
                        d="m10.667 15.28c0.08 1.02 1.08 1.7 2.054 1.408 0.846 -0.254 1.328 -1.145 1.075 -1.991 -0.429 -1.435 -1.237 -4.282 -2.984 -6.595l0.25 -0.641 0.044 -0.656 0.061 -0.032c0.36 -0.191 0.615 -0.529 0.699 -0.928l0.208 -0.994c0.058 -0.281 0.028 -0.569 -0.088 -0.831l-1.209 -2.756c-0.426 -0.973 -1.558 -1.415 -2.531 -0.988l-7.097 3.113c-0.973 0.426 -1.415 1.558 -0.989 2.531l2.219 5.061c0.425 0.97 1.561 1.414 2.531 0.988l4.817 -2.113c0.656 2.091 0.778 3.077 0.938 5.425zm-1.035 -10.391l-0.139 0.074c-0.422 0.223 -0.694 0.641 -0.726 1.119l-0.058 0.855 -0.36 0.924 -3.971 1.742 -1.85 -4.217 6.253 -2.743 0.894 2.038 -0.044 0.209z"
                      />
                      <path
                        d="m28.85 7.346l-7.096 -3.113c-0.97 -0.425 -2.106 0.017 -2.531 0.988l-1.209 2.758c-0.115 0.262 -0.145 0.55 -0.086 0.83l0.208 0.992c0.084 0.4 0.339 0.74 0.7 0.931l0.06 0.032 0.044 0.656 0.268 0.685c-2.931 3.803 -3.184 6.905 -3.208 7.005h-9.686c-0.658 0 -1.191 0.534 -1.191 1.191 0 2.929 1.405 5.537 3.583 7.204h-0.241c-0.658 0 -1.191 0.534 -1.191 1.191s0.534 1.191 1.191 1.191h11.715c0.658 0 1.191 -0.534 1.191 -1.191s-0.534 -1.191 -1.191 -1.191h-0.241c2.177 -1.667 3.583 -4.277 3.583 -7.204 0 -0.658 -0.534 -1.191 -1.191 -1.191h-3.144c0.15 -1.825 0.377 -3.527 1.073 -5.303l4.835 2.12c0.97 0.425 2.106 -0.017 2.531 -0.988l2.219 -5.061c0.426 -0.973 -0.015 -2.105 -0.989 -2.531zm-7.822 14.145c-0.572 3.14 -3.362 5.53 -6.709 5.53s-6.137 -2.39 -6.709 -5.53h13.419zm4.595 -7.931l-3.971 -1.742 -0.36 -0.924 -0.058 -0.853c-0.032 -0.47 -0.309 -0.898 -0.726 -1.12l-0.139 -0.074 -0.044 -0.209 0.894 -2.038 6.253 2.743 -1.85 4.217z"
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div class="text-xs text-center md:text-base">Add Ingredients</div>
          </div>

          <div class="w-1/4">
            <div class="relative mb-2">
              <div
                class="absolute flex align-center items-center align-middle content-center"
                style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
              >
                <div
                  class="w-0 py-1 rounded"
                  style="width: 100%;"
                  :class="[process >= 3 ? 'bg-green-300' : 'bg-gray-300']"
                ></div>
              </div>

              <div
                class="w-10 h-10 mx-auto border-2 border-gray-200 rounded-full text-lg text-white flex items-center"
                :class="[process >= 3 ? 'bg-green-500' : 'bg-gray-300']"
              >
                <span class="text-center text-green-600 w-full flex justify-center items-center">
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 30 30"
                    id="icons"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.842 21.168c-1.325 0 -2.402 -0.479 -3.21 -1.429S3.293 17.378 2.984 15.326c-0.455 -3.024 -0.004 -5.573 1.27 -7.177 0.75 -0.945 1.734 -1.491 2.846 -1.579 0.952 -0.076 2.375 0.31 3.75 2.578 0.861 1.42 1.515 3.307 1.796 5.176h0c0.339 2.256 0.087 3.918 -0.772 5.077 -0.682 0.921 -1.731 1.492 -3.118 1.699A6.238 6.238 0 0 1 7.842 21.168Z"
                    />
                    <path
                      d="M10.137 29.063c-0.774 0 -1.559 -0.248 -2.265 -0.724a4.675 4.675 0 0 1 -1.964 -2.965c-0.167 -0.859 -0.067 -1.542 0.306 -2.088 0.605 -0.888 1.692 -1.087 2.841 -1.3 0.121 -0.022 0.244 -0.045 0.369 -0.069 0.265 -0.05 0.536 -0.117 0.798 -0.182 0.983 -0.243 2 -0.494 2.84 0.103 0.562 0.398 0.879 1.076 0.974 2.07h0c0.108 1.147 -0.138 2.291 -0.693 3.223 -0.597 1.003 -1.492 1.665 -2.52 1.867A3.574 3.574 0 0 1 10.137 29.063Z"
                    />
                    <path
                      d="M22.158 15.543a6.251 6.251 0 0 1 -0.914 -0.07c-1.386 -0.205 -2.435 -0.776 -3.117 -1.699 -0.859 -1.16 -1.113 -2.82 -0.772 -5.077 0.281 -1.871 0.933 -3.756 1.79 -5.171 1.368 -2.26 2.793 -2.652 3.75 -2.583 1.109 0.081 2.091 0.619 2.842 1.559 1.283 1.604 1.737 4.16 1.281 7.198 -0.309 2.051 -0.832 3.454 -1.647 4.413S23.483 15.543 22.158 15.543Z"
                    />
                    <path
                      d="M19.863 23.438a3.574 3.574 0 0 1 -0.684 -0.066c-1.029 -0.202 -1.924 -0.864 -2.52 -1.867 -0.555 -0.932 -0.801 -2.076 -0.693 -3.223h0c0.094 -0.996 0.41 -1.671 0.974 -2.07 0.84 -0.596 1.857 -0.345 2.84 -0.102 0.263 0.064 0.533 0.131 0.798 0.182l0.369 0.069c1.15 0.212 2.237 0.41 2.842 1.299 0.373 0.547 0.473 1.23 0.306 2.088a4.675 4.675 0 0 1 -1.964 2.965C21.42 23.19 20.635 23.438 19.863 23.438Z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div class="text-xs text-center md:text-base">Add Steps</div>
          </div>

          <div class="w-1/4">
            <div class="relative mb-2">
              <div
                class="absolute flex align-center items-center align-middle content-center"
                style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
              >
                <div
                  class="w-0 py-1 rounded"
                  style="width: 100%;"
                  :class="[process === 4 ? 'bg-green-300' : 'bg-gray-300']"
                ></div>
              </div>

              <div
                class="w-10 h-10 mx-auto border-2 border-gray-200 rounded-full text-lg text-white flex items-center"
                :class="[process >= 4 ? 'bg-green-500' : 'bg-gray-300']"
              >
                <span class="text-center text-green-600 w-full flex justify-center items-center">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.92308 7.89744C8.92308 8.46388 8.46388 8.92308 7.89744 8.92308C7.33099 8.92308 6.8718 8.46388 6.8718 7.89744C6.8718 7.33099 7.33099 6.8718 7.89744 6.8718C8.46388 6.8718 8.92308 7.33099 8.92308 7.89744Z"
                      fill="#030D45"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 3.53846C9.83082 3.53846 6.86615 3.73753 5.01495 3.88095C4.40616 3.92811 3.92811 4.40616 3.88095 5.01495C3.73753 6.86615 3.53846 9.83082 3.53846 12C3.53846 13.7395 3.66648 15.9906 3.79116 17.7688L10.7281 12.2192C12.5558 10.7571 15.165 10.8013 16.942 12.3245L20.3628 15.2566C20.4208 14.1261 20.4615 12.9816 20.4615 12C20.4615 9.83082 20.2625 6.86615 20.1191 5.01495C20.0719 4.40616 19.5938 3.92811 18.985 3.88095C17.1338 3.73753 14.1692 3.53846 12 3.53846ZM21.8094 16.8932C21.9111 15.2951 22 13.4766 22 12C22 9.76547 21.7964 6.74819 21.6529 4.89612C21.5472 3.53141 20.4686 2.45281 19.1039 2.34708C17.2518 2.2036 14.2345 2 12 2C9.76547 2 6.74819 2.2036 4.89612 2.34708C3.53141 2.45281 2.45281 3.53141 2.34708 4.89612C2.2036 6.74819 2 9.76547 2 12C2 14.2345 2.2036 17.2518 2.34708 19.1039C2.45281 20.4686 3.53141 21.5472 4.89612 21.6529C6.74819 21.7964 9.76547 22 12 22C14.2345 22 17.2518 21.7964 19.1039 21.6529C20.4686 21.5472 21.5472 20.4686 21.6529 19.1039C21.7013 18.4796 21.7565 17.7228 21.8084 16.9083C21.8088 16.9033 21.8091 16.8982 21.8094 16.8932ZM20.2487 17.1851L15.9408 13.4926C14.7249 12.4504 12.9397 12.4202 11.6892 13.4206L4.08589 19.5032C4.07529 19.5117 4.06454 19.5199 4.05364 19.5277C4.25321 19.8594 4.60434 20.0872 5.01495 20.1191C6.86615 20.2625 9.83082 20.4615 12 20.4615C14.1692 20.4615 17.1338 20.2625 18.985 20.1191C19.5938 20.0719 20.0719 19.5938 20.1191 18.985C20.1597 18.4601 20.2049 17.8456 20.2487 17.1851Z"
                      fill="#030D45"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div class="text-xs text-center md:text-base">Add Photo</div>
          </div>
        </div>
      </div>

      <transition name="slide" mode="out-in">
        <div v-show="process === 1">
          <!-- =========================== title =============================================== -->
          <hr mt-10 mb-10 />
          <div class="flex w-full items-center mt-5 mb-5">
            <label class="w-2/12">Name</label>
            <Field
              as="input"
              name="title"
              type="text"
              class="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="title"
              rules="required|max:20"
            />
            <ErrorMessage class="text-red ml-4" name="title" />
          </div>
          <!-- =========================== CATEGORY ======================= -->
          <hr mt-10 mb-10 />
          <div class="flex w-full items-center mt-5 mb-5">
            <label class="w-2/12">Category</label>
            <Field
              as="select"
              name="category"
              class="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rules="required"
            >
              <option value="Soup">Soup</option>
              <option value="Juice">Juice and Coctail</option>
              <option value="Seafoods">Frozen Seafoods</option>
              <option value="Meats">Raw Meat</option>
              <option value="Fruits_and_Vegetables">Fruits and Vegetables</option>
              <option value="Breads_and_Sweets">Breads and Sweets</option>
            </Field>
            <ErrorMessage class="text-red ml-4" name="category" />
          </div>
          <!-- ================================== PREPARATION TIME ====================================  -->
          <hr mt-10 mb-10 />
          <div class="flex w-full items-center mt-5 mb-5">
            <label class="w-2/12">Preparation Time</label>
            <Field
              as="input"
              name="prep_time"
              type="number"
              rules="required|integer"
              class="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage class="text-red ml-4" name="prep_time" />
          </div>
          <!-- ============================= CALORIES   ===================================== -->
          <hr mt-10 mb-10 />
          <div class="flex w-full items-center mt-5 mb-5">
            <label class="w-2/12">Calories</label>
            <Field
              as="input"
              name="calories"
              type="number"
              class="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rules="required|integer"
            />
            <ErrorMessage class="text-red ml-4" name="calories" />
          </div>
          <!-- ============================= SERVING   ===================================== -->
          <hr mt-10 mb-10 />
          <div class="flex w-full items-center mt-5 mb-5">
            <label class="w-2/12">Serving</label>
            <Field
              as="input"
              name="serving"
              type="number"
              class="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rules="required|integer"
            />
            <ErrorMessage class="text-red ml-4" name="serving" />
          </div>

          <!-- ============================= DESCRIPTION   ===================================== -->
          <hr mt-10 mb-10 />
          <div class="flex w-full items-center mt-5 mb-5">
            <label class="w-2/12">Description</label>
            <Field
              as="textarea"
              name="description"
              type="text"
              rows="5"
              cols="60"
              class="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rules="required|max:100"
              placeholder="Description..."
            ></Field>
            <ErrorMessage class="text-red ml-4" name="description" />
          </div>
        </div>
      </transition>

      <transition name="slide" mode="out-in">
        <div v-show="process === 2">
          <!-- ================================= INGREDIANTS ==================================== -->

          <hr mt-10 mb-10 />

          <div class="w-full mt-10 mb-10 items-center">
            <Field
              as="input"
              name="ingredients[0].name"
              type="text"
              class="hidden"
              rules="required"
            />

            <Field
              as="input"
              name="ingredients[0].amount"
              type="text"
              class="hidden"
              rules="required"
            />
            <div v-for="(m, index) in values.ingredients" :key="index">
              <div class="w-full flex mb-10 items-center">
                <label class="w-1/12">Ingredient</label>
                <Field
                  as="input"
                  :name="`ingredients[${index}].name`"
                  type="text"
                  class="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-5"
                  rules="required"
                />
                <ErrorMessage class="text-red" :name="`ingredients[${index}].name`">
                <p class="text-red">Ingredient Required</p>
                </ErrorMessage>

                <label class="w-1/12 ml-20">Amount</label>

                <Field
                  as="input"
                  :name="`ingredients[${index}].amount`"
                  type="text"
                  class="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-3"
                  rules="required"
                />
                <ErrorMessage class="text-red ml-4" :name="`ingredients[${index}].amount`">
                <p class="text-red ml-4">Amount Required</p>
                </ErrorMessage>

                <button
                  class="uppercase ml-4 p-3 flex items-center border border-red-300 hover:border-red-600 text-red-500 hover:text-white hover:bg-red-600 max-w-max shadow-sm hover:shadow-lg rounded-full w-12 h-12"
                  type="button"
                  @click="removeIng(index, values)"
                >
                  <svg
                    width="32"
                    height="32"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                    style="transform: rotate(360deg)"
                  >
                    <path d="M12 12h2v12h-2z" fill="currentColor" />
                    <path d="M18 12h2v12h-2z" fill="currentColor" />
                    <path
                      d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z"
                      fill="currentColor"
                    />
                    <path d="M12 2h8v2h-8z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button
            class="bg-green hover:bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-full mb-5"
            @click="addIngredient(values)"
          >+ Add Ingredient</button>
        </div>
      </transition>

      <transition name="slide" mode="out-in">
        <div v-show="process === 3">
          <!-- ========================== STEPS ============================================ -->
          <hr mt-10 mb-10 />

          <div class="w-full mt-10 mb-10 items-center">
            <Field
              as="textarea"
              name="steps[0].step"
              type="text"
              class="hidden absolute"
              rules="required"
            ></Field>
            <div v-for="(step, index) in values.steps" :key="index">
              <div class="w-full flex mb-10 items-center">
                <label class="w-1/12">Step {{ index + 1 }}</label>
                <Field
                  as="textarea"
                  :name="`steps[${index}].step`"
                  type="text"
                  rows="5"
                  cols="6"
                  class="shadow appearance-none border rounded w-6/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rules="required"
                ></Field>
                <ErrorMessage class="text-red ml-3" :name="`steps[${index}].step`">
                <P class="text-red ml-3">Step Required</P>
                </ErrorMessage>
                <button
                  class="uppercase ml-4 p-3 flex items-center border border-red-300 hover:border-red-600 text-red-500 hover:text-white hover:bg-red-600 max-w-max shadow-sm hover:shadow-lg rounded-full w-12 h-12"
                  type="button"
                  @click="removeStep(index, values)"
                >
                  <svg
                    width="32"
                    height="32"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                    style="transform: rotate(360deg)"
                  >
                    <path d="M12 12h2v12h-2z" fill="currentColor" />
                    <path d="M18 12h2v12h-2z" fill="currentColor" />
                    <path
                      d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z"
                      fill="currentColor"
                    />
                    <path d="M12 2h8v2h-8z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button
            class="bg-green hover:bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-full mb-5"
            @click="addSteps(values)"
          >+ Add Step</button>
        </div>
      </transition>

      <transition name="slide" mode="out-in">
        <div v-show="process === 4" class="w-full">
          <!-- <SingleUpload class="col-span-2"/>
          <div></div>-->
          <MulUpload class="col-span-3" @imgFiles="imgFiles" />
          <Field
            as="input"
            name="image"
            v-model="imgTxt"
            type="text"
            class="hidden"
            rules="required"
          />
          <ErrorMessage class="text-red ml-4" name="image" />
        </div>
      </transition>

      <div class="form-group flex justify-between">
        <button
          v-if="process !== 1"
          type="button"
          class="text-white font-bold py-2 px-4 rounded-full"
          :class="isDisabled ? 'bg-red-300': 'bg-red hover:bg-gradient-to-r from-red-400 to-green-500'"
          :disabled="isDisabled"
          @click="processor('-')"
        >&#60; Back</button>
        <div></div>

        <button
          v-if="process < 4"
          type="button"
          class="bg-green hover:bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-full"
          @click="processor('+')"
        >Next</button>

        <p class="mr-52" v-if="isDisabled"><RotateSquare2/> Loading . . .</p>

        <button
          v-if="process === 4"
          type="submit"
          class="text-white font-bold py-2 px-4 rounded-full"
          :class="isDisabled ? 'bg-green-300' : 'bg-green hover:bg-gradient-to-r from-green-400 to-blue-500'"
          :disabled="isDisabled"
        >Finish</button>
      </div>
      <!-- <div v-if="Object.keys(errors).length !== 0">
        <b>You have to feel this fields:</b>
        <pre>{{ errors }}</pre>
      </div> -->
    </Form>
  </div>
</template>



<script setup>
import { routeGuard } from '../auth'
import { onMounted, ref } from 'vue'
import fetch from 'isomorphic-fetch';
import { useRouter } from 'vue-router'
import { configure, Form, Field, defineRule, ErrorMessage } from 'vee-validate';
import { email, required, min, integer, max } from '@vee-validate/rules';
import { RotateSquare2 } from '@dgknca/vue-loading-spinner'
import { useHead } from '@vueuse/head'
useHead({
  title: 'Recipe',
  style: [
    {
      children: `body {}`,
    },
  ],
});



// ========================================= VARIABLES ========================================
const router = useRouter()
const userId = localStorage.getItem('user')
const token = localStorage.getItem('token')
const process = ref(1)
const base64str = ref(null)
let imgs = []
const imgTxt = ref('')
const isDisabled = ref(false)
// ======================================= FUNCTIONS  ===========================================

onMounted(() => {
  configure({
    validateOnInput: true,
  })

  // rules
  defineRule("required", required);
  defineRule("min", min);
  defineRule("max", max);
  defineRule("email", email);
})

const addIngredient = (values) => {
  values.ingredients = (values.ingredients || []).concat([{}])
}

const removeIng = (i, values) => {
  const v = values.ingredients.filter((_, index) => {
    return i !== index
  })

  values.ingredients = v
}

const addSteps = (values) => {
  values.steps = (values.steps || []).concat([{}])
}

const removeStep = (i, values) => {
  const v = values.steps.filter((_, index) => {
    return i !== index
  })
  values.steps = v
}

const imgFiles = (datas) => {
  datas.forEach(ele => {
    imgTxt.value = datas
    const reader = new FileReader()
    reader.readAsDataURL(ele.url)
    reader.onloadend = () => {
      imgs.push({ url: reader.result })
    }
    reader.onerror = (err) => {
      console.log(err, 'something NEW went wrong');
      return
    }
  });
}

const handleSubmit = (values) => {

  const temp = {
    images: imgs,
    user_id: userId
  }
  Object.assign(values, temp)
  alert(JSON.stringify(values, null, 2))
  console.log(values);
  delete values.image

  const variables = values
  const url = 'http://localhost:8080/v1/graphql'
  const RECIPE_UPLOAD_MUTATION = `
  mutation($title: String!, $category: String!, $prep_time: Int!, $calories: Int!, $serving: Int!, $description: String!, $user_id: String!, $images: [InsertRecipeOneDerivedImagesInsertInput!]!, $steps: [InsertRecipeOneDerivedStepsInsertInput!]!, $ingredients:[InsertRecipeOneDerivedIngredientInsertInput!]!){
  InsertRecipeOneDerived(title:$title, 
    category: $category, 
    prep_time:$prep_time,
    calories:$calories,
    serving:$serving,
    description: $description,
    user_id:$user_id,
    images: $images,
    steps: $steps,
    ingredients: $ingredients
  ){
    title
  }
}`


  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + token,
      "x-hasura-use-backend-only-permissions": "true",
    },
    body: JSON.stringify({
      query: RECIPE_UPLOAD_MUTATION,
      variables: variables
    })
  }

  fetch(url, options)
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        console.log(res.errors, 'something went wrong from front end');
      } else {
        alert('Recipe Uploaded Successfully!')
        console.log('recipe uploaded successfully!');
        router.push({ name: 'Browse' })
      }
    })
    isDisabled.value = true
}

const processor = (val) => {
  if (val == '+') {
    if (process.value <= 4) {
      process.value++
    }
  } else if (val == '-') {
    if (process.value > 1) {
      process.value--
    }
  }
}


// beforeEnter: (to, from, next) => {
//   // ...
// }



</script>

<route>
{
  name: "Cook",
  meta: {
    requiresAuth: true
  },
}
</route>

<style  scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}
.spinner {
    background-color: transparent !important;
}
</style>