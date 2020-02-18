import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import ElementUI from 'element-ui'
import Vue from 'vue'
import AuthLogin from '../pages/auth/login'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('Auth Login page', () => {
  const mutateSuccesfullMock = jest.fn().mockResolvedValue({
    data: {
      login: {
        token:
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhYnUyIiwiaWF0IjoxNTgxNTg4MTgyLCJleHAiOjE1ODE1ODk5ODJ9.NGmiYeSfp-Rg8Vg6h13Hv8PVpqKqrw7LyPlFbGmpM3SLExhZpndoa2HTTYsG4HPu_dhTJHEshAXqgo-JBqHpaWODnI3eDf4EpUmpRa7XsPAR3pcSW4G897UCusQRJLciF_iDDJuedK2eoJauFy7mnkqmW4UFyofXDz1NQ6vFJH_DUZVqSSSP9GKUXtuv7uKiO075QirLqLeNmQvkh20WQgsT0c9xs6TRIbqjkKNz2spiiAhaG-N8NmuWpLoNHX-wZJ-PBzSyi-wmTdpObwKjQaNy91Mv-31qJykEmdmMepPzS7GaVa5mBuUV3oeIeLAdJBOgDNTUXX2FIJhrBMOmgLkY2XRC9YrzpVjJh2-fh20Fmg8bEZbpiY0vFDpWnaj1oFS9swVfR_dmod4WXZSE78NSp9vTNJm0v7L4Pd0a2AdhN0Xi-h2DkT1cTr4LzSzgttK29qGODfvogdvixf2AFKlmRM4MAub0yPPTfhPKz-L-Utb8jxAFopwV14qEUtwHhCqbC1GvaP_-amRWCNnYCAxPykaktO7-xQ-ZqAXuPzdpqk8qR2x8ZXMfr4FGN7MH6N3CoDa8rn5QJ0g60m10VVLuoJYxs6v0kmP6wYeEqkADUB12EQNaXAZGkFxwUd5FhMPdoO1LZqfjRNWq2PXAxGiev0nsRPFW-FEG5-S5P_g'
      }
    }
  })

  const mutateErrorMock = jest.fn().mockResolvedValue({
    error: 'Could not connect to the server.'
  })

  describe('Auth Login Succesfull', () => {
    const config = {
      mocks: {
        $apolloHelpers: {
          onLogin: jest.fn()
        },
        $router: {
          go: () => jest.fn(() => Promise.resolve()),
          push: () => jest.fn()
        },
        $apollo: {
          mutate: mutateSuccesfullMock
        }
      },
      localVue
    }

    const wrapper = mount(AuthLogin, config)

    test('Login button works, data processed', async () => {
      wrapper.find('button.el-button--primary').trigger('click')
      await Vue.nextTick()
      expect(mutateSuccesfullMock).toHaveBeenCalled()
      await mutateSuccesfullMock
      expect(config.mocks.$apolloHelpers.onLogin).toHaveBeenCalled()
    })

    test('Cancel button works', () => {
      const spyCancel = jest.spyOn(config.mocks.$router, 'go')
      wrapper.find('button.el-button--default').trigger('click')
      expect(spyCancel).toHaveBeenCalledWith(-1)
    })
  })

  describe('Auth Login Error', () => {
    const config = {
      mocks: {
        $apolloHelpers: {
          onLogin: jest.fn()
        },
        $router: {
          go: () => jest.fn(),
          push: () => jest.fn()
        },
        $apollo: {
          mutate: mutateErrorMock
        }
      },
      localVue
    }

    test('Login button works, mutation error processed and displayed ', async () => {
      const wrapper = mount(AuthLogin, config)
      wrapper.setData({
        error: true,
        errorMessage: 'Error Message'
      })
      await Vue.nextTick()
      wrapper.find('button.el-button--primary').trigger('click')
      await Vue.nextTick()
      expect(mutateErrorMock).toHaveBeenCalled()
      await mutateErrorMock
      expect(wrapper.find('.el-alert__title').exists()).toBeTruthy()
    })

    test('Login button works, exception error processed and displayed', async () => {
      config.mocks.$apollo.mutate = jest
        .fn()
        .mockRejectedValue(new Error('Async error'))
      const wrapper = mount(AuthLogin, config)
      await Vue.nextTick()
      wrapper.setData({
        error: true,
        errorMessage: 'Error Message'
      })
      wrapper.find('button.el-button--primary').trigger('click')
      await config.mocks.$apollo.mutate
      expect(config.mocks.$apollo.mutate).toHaveBeenCalled()
      await config.mocks.$apollo.mutate
      expect(wrapper.find('.el-alert__title').exists()).toBeTruthy()
    })
  })
})
