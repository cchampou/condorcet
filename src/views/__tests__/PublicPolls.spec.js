import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PublicPolls from "../PublicPolls.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PublicPolls.vue", () => {
  it("should render", () => {
    const store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          getters: {
            userId: () => "ez9fze83n"
          }
        }
      }
    });

    const wrapper = shallowMount(PublicPolls, { localVue, store });

    expect(wrapper).toMatchSnapshot();
  });
});
