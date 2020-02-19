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

  const querySuccessfullMock = jest.fn().mockResolvedValue({
    data: {
      remoteGreeting: {
        message: 'Dear, tabu2, greetings from far far away rust server'
      }
    }
  })

  const queryErrorMock = jest.fn().mockResolvedValue({
    error: 'Could not connect to the server.'
  })

  describe('Index test', () => {
    describe('Rendered greeting propertly', () => {
      const config = {
        mocks: {
          $apollo: {
            query: querySuccessfullMock
          }
        },
        store,
        localVue
      }

      const wrapper = mount(Index, config)
      test('Greetings message showed, successfully', async () => {
        expect(querySuccessfullMock).toHaveBeenCalled()
        await querySuccessfullMock
        wrapper.setData({
          remoteGreeting: {
            message: 'Dear, tabu2, greetings from far far away rust server'
          },
          error: null
        })
        await Vue.nextTick()
        expect(wrapper.find('.el-card__body').text()).toEqual(
          'Dear, tabu2, greetings from far far away rust server'
        )
      })
    })

    describe('Rendered error propertly', () => {
      const config = {
        mocks: {
          $apollo: {
            query: queryErrorMock
          }
        },
        store,
        localVue
      }

      const wrapper = mount(Index, config)
      test('Greetings error showed, successfully', async () => {
        expect(queryErrorMock).toHaveBeenCalled()
        await queryErrorMock
        wrapper.setData({
          remoteGreeting: null,
          error: 'Could not connect to the server.'
        })
        await Vue.nextTick()
        expect(wrapper.find('.el-alert__content').text()).toEqual(
          'Could not connect to the server.'
        )
      })
    })
  })
})
