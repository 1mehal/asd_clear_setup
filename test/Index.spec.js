import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import VueApollo from 'vue-apollo'
import Index from '../pages/index'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('Index Page tests', () => {
  const getters = {
    currentUser: () => {
      return {
        username: 'tabu2'
      }
    }
  }

  const store = new Vuex.Store({
    getters
  })

  const querySuccessfull = jest.fn().mockResolvedValue({
    data: {
      remoteGreeting: {
        message: 'Dear, tabu2, greetings from far far away rust server'
      }
    }
  })

  describe('Index succesfull render', () => {
    const config = {
      mocks: {
        $apollo: {
          query: querySuccessfull
        }
      },
      data() {
        return {
          remoteGreeting: {
            message: 'Dear, tabu2, greetings from far far away rust server'
          }
        }
      },
      store,
      localVue
    }

    const wrapper = mount(Index, config)

    test('Greetings message showed, successfully', () => {
      expect(wrapper.find('.el-card__body').text()).toEqual(
        'Dear, tabu2, greetings from far far away rust server'
      )
    })

    test('Login button works, error rendered', async () => {
      wrapper.setData({
        remoteGreeting: null,
        error: 'Could not connect to the server.'
      })
      // FIXME: function doesn't test error handling sent from graphql
      wrapper.vm.$options.apollo.remoteGreeting.error({
        message: 'Could not connect to the server.'
      })
      // FIXME: function doesn't test data handling sent from graphql
      wrapper.vm.$options.apollo.remoteGreeting.update({
        remoteGreeting: {
          message: 'Dear, tabu2, greetings from far far away rust server'
        }
      })
      await Vue.nextTick()
      expect(wrapper.find('.el-alert__content').text()).toEqual(
        'Could not connect to the server.'
      )
    })
  })
})
