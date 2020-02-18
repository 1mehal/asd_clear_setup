import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import ElementUI from 'element-ui'
import Vue from 'vue'
import AuthRegister from '../pages/auth/register'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('Auth register page', () => {
  describe('Auth Register Succesfull', () => {
    const mutateSuccesfullMock = jest.fn().mockResolvedValue({
      data: {
        createUser: {
          id: 20,
          username: 'tabu51'
        }
      }
    })
    const config = {
      mocks: {
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

    const wrapper = mount(AuthRegister, config)

    test('Register button works, data processed', async () => {
      wrapper.setData({
        user: {
          username: 'testu',
          password: 'Testu1Testu1!',
          passwordConfirmation: 'Testu1Testu1!'
        }
      })
      await Vue.nextTick()
      wrapper.find('button.el-button--primary').trigger('click')
      await Vue.nextTick()
      expect(mutateSuccesfullMock).toHaveBeenCalled()
      await mutateSuccesfullMock
    })

    test('Cancel button works', () => {
      const spyCancel = jest.spyOn(config.mocks.$router, 'go')
      wrapper.find('button.el-button--default').trigger('click')
      expect(spyCancel).toHaveBeenCalledWith(-1)
    })
  })

  const mutateErrorMock = jest.fn().mockRejectedValue(new Error('Async error'))

  const config = {
    mocks: {
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
  const wrapper = mount(AuthRegister, config)

  describe('Auth Register Error', () => {
    test('Register button works, validation errors, username is required', async () => {
      wrapper.setData({
        user: {
          username: '',
          password: 'Testu1Testu1!',
          passwordConfirmation: 'Testu1Testu1!notmatch'
        }
      })
      await Vue.nextTick()
      wrapper.find('button.el-button--primary').trigger('click')
      await Vue.nextTick()
      expect(wrapper.find('.el-form-item__error').text()).toEqual(
        'username is required'
      )
    })

    test('Register button works, validation errors, password confirmation is required', async () => {
      wrapper.setData({
        user: {
          username: 'testu',
          password: 'Testu1Testu1!',
          passwordConfirmation: ''
        }
      })
      await Vue.nextTick()
      wrapper.find('button.el-button--primary').trigger('click')
      await Vue.nextTick()
      expect(wrapper.find('.el-form-item__error').text()).toEqual(
        "Your confirmation don't match password!"
      )
    })

    test('Register button works, validation errors, password should contain a number', async () => {
      wrapper.setData({
        user: {
          username: 'testu',
          password: 'TestuTestuT',
          passwordConfirmation: 'TestuTestuT'
        }
      })
      await Vue.nextTick()
      wrapper.find('button.el-button--primary').trigger('click')
      await Vue.nextTick()
      expect(wrapper.find('.el-form-item__error').text()).toEqual(
        'Password should contain a number'
      )
    })

    test('Register button works, validation errors, password should contain a lowercase letter', async () => {
      wrapper.setData({
        user: {
          username: 'testu',
          password: 'TESTUTESTU1!',
          passwordConfirmation: 'TESTUTESTU1!'
        }
      })
      await Vue.nextTick()
      wrapper.find('button.el-button--primary').trigger('click')
      await Vue.nextTick()
      expect(wrapper.find('.el-form-item__error').text()).toEqual(
        'Password should contain a lowercase letter'
      )
    })

    test('Register button works, validation errors, password should contain an uppercase letter', async () => {
      wrapper.setData({
        user: {
          username: 'testu',
          password: 'testutestu1!',
          passwordConfirmation: 'testutestu1!'
        }
      })
      await Vue.nextTick()
      wrapper.find('button.el-button--primary').trigger('click')
      await Vue.nextTick()
      expect(wrapper.find('.el-form-item__error').text()).toEqual(
        'Password should contain an uppercase letter'
      )
    })

    test('Register button works, validation errors, password should contain a special symbol', async () => {
      wrapper.setData({
        user: {
          username: 'testu',
          password: 'TestuTestu1',
          passwordConfirmation: 'TestuTestu1'
        }
      })
      await Vue.nextTick()
      wrapper.find('button.el-button--primary').trigger('click')
      await Vue.nextTick()
      expect(wrapper.find('.el-form-item__error').text()).toEqual(
        'Password should contain a special symbol'
      )
    })

    test('Register button works, mutation error processed and displayed ', async () => {
      wrapper.setData({
        user: {
          username: 'testu',
          password: 'Testu1Testu1!',
          passwordConfirmation: 'Testu1Testu1!'
        }
      })
      await mutateErrorMock
      wrapper.find('button.el-button--primary').trigger('click')
      expect(mutateErrorMock).toHaveBeenCalled()
    })

    test('Cancel button works', async () => {
      const spyCancel = jest.spyOn(config.mocks.$router, 'go')
      wrapper.find('button.el-button--default').trigger('click')
      await Vue.nextTick()
      expect(spyCancel).toHaveBeenCalledWith(-1)
    })
  })
})
