<template>
  <div class="container">
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <h1 class="title is-1">Item List and Search Sample</h1>
        <div class="tabs is-centered">
          <ul>
            <li :class="{ 'is-active': activeWordsTab }">
              <a @click="changeTab(1)">商品名で絞り込む</a>
            </li>
            <li :class="{ 'is-active': activePriceTab }">
              <a @click="changeTab(2)">価格で絞り込む</a>
            </li>
          </ul>
        </div>

        <div v-if="activeWordsTab" class="field">
          <label class="label" for="words">検索ワード</label>
          <input
            id="words"
            class="input"
            type="text"
            name="words"
            placeholder="商品名を入れてください"
            v-model.trim="state.filterText"
          />
        </div>
        <div v-if="activePriceTab" class="field">
          <label class="label">価格帯</label>
          <div class="control">
            <label
              v-for="price in state.prices"
              :key="price.id"
              class="radio"
              :for="'price' + price.id"
            >
              <input
                :id="'price' + price.id"
                type="radio"
                name="price"
                :value="price.id"
                v-model="state.filterPriceId"
              />
              {{ price.text }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>商品名</th>
              <th class="has-text-right">価格（円）</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td class="has-text-right">{{ item.price }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="state.items.length === 0" class="has-text-centered">
          対象の商品は見当たりませんでした。
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from "vue";
import axios from "axios";

export interface Item {
  id: number;
  name: string;
  price: number;
}

export interface Price {
  id: number;
  text: string;
}

export default defineComponent({
  name: "product",
  setup() {
    const state = reactive<{
      items: Item[];
      prices: Price[];
      filterText: string;
      activeTab: number;
      filterPriceId: number | undefined;
    }>({
      items: [],
      prices: [
        { id: 1, text: "～100円" },
        { id: 2, text: "101円～500円" },
        { id: 3, text: "501円～" },
      ],
      filterText: "",
      activeTab: 1,
      filterPriceId: undefined,
    });

    const fetchItem = () => {
      axios.get<Item[]>("items.json").then(function (response) {
        state.items = response.data;
      });
    };

    const initialize = () => {
      state.filterText = "";
      state.filterPriceId = undefined;
    };

    const changeTab = (tabNum: number) => {
      initialize();
      state.activeTab = tabNum;
    };

    const activeWordsTab = computed(() => {
      return state.activeTab === 1;
    });
    const activePriceTab = computed(() => {
      return state.activeTab === 2;
    });

    const filteredItemsByText = computed(() => {
      if (state.filterText) {
        return state.items.filter((item) => {
          return item.name.indexOf(state.filterText) !== -1;
        });
      }
      return state.items;
    });

    const filteredItemsByPriceId = computed(() => {
      if (state.filterPriceId) {
        return state.items.filter((item) => {
          switch (state.filterPriceId) {
            case 1:
              return item.price <= 100;
            case 2:
              return item.price > 100 && item.price <= 500;
            case 3:
              return item.price > 500;
            default:
              return item.price >= 0;
          }
        });
      }
      return state.items;
    });

    const filteredItems = computed(() => {
      if (activeWordsTab.value) {
        return filteredItemsByText.value;
      } else if (activePriceTab.value) {
        return filteredItemsByPriceId.value;
      } else {
        return state.items;
      }
    });

    onMounted(() => {
      fetchItem();
    });
    return {
      state,
      fetchItem,
      changeTab,
      activeWordsTab,
      activePriceTab,
      filteredItemsByText,
      filteredItemsByPriceId,
      filteredItems,
    };
  },
});
</script>
