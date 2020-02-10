import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import Login from '../pages/auth/login'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('Index page', () => {
  // let getters
  // let store
  let mocks
  const spy = sinon.spy()
  // let propsData
  const mutateMock = jest.fn(() => Promise.resolve())
  const goMock = jest.fn()
  const onLoginMock = jest.fn(() => Promise.resolve());
  const onSubmitMock = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    // getters = {
    //   currentUser: () => {
    //     return {
    //       username: 'testuu'
    //     }
    //   }
    // }

    // propsData = {
    //   error: false,
    //   errorMessage: ''
    // }

    // store = new Vuex.Store({
    //   getters
    // })

    mocks = {
      $apolloHelpers: {
        onLogin: spy
      },
      $router: {
        go: spy
      },
      $apollo: {
        mutate: spy
      },
      onSubmitMock
    }
  })

  const config = {
    mocks,
    // store,
    localVue
    // propsData,
  }

  describe('Auth Login test', () => {
    test('is a Vue instance', () => {
      const wrapper = mount(Login, config)
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    test('should have a btn component', () => {
      const wrapper = mount(Login, config)
      expect(wrapper.find('.el-button--primary').text()).toEqual('Login')
      expect(wrapper.find('.el-button--default').text()).toEqual('Cancel')
      // expect(wrapper.find('el-button--primary')).text()).toEqual('Login')
      //Button should be of type button
      // expect(wrapper.find('.el-button--primary()').type().defaultProps.type).toEqual('button')
      //Button should have matching text
      // expect(wrapper.find('Button').text()).toEqual('Login')
    })

    // test('should call login on login button pressed', () => {
    //   const spyL = jest.spyOn(mocks.$apolloHelpers, 'onLogin')
    //   wrapper.find('.el-button--primary').trigger('click')
    //   expect(spyL).toHaveBeenCalled()
    // })

    test('should go -1 page on loging button pressed', async () => {
      const wrapper = mount(Login, config)

      // wrapper.setMethods({ onSubmit: onSubmitMock })
      wrapper.find('button.el-button--primary').trigger('click')
      await wrapper.vm.$nextTick()
      expect(onSubmitMock).toHaveBeenCalled()

      // console.log(button)
      // button.trigger('click')
      // await wrapper.vm.$nextTick()
      // expect(spy.called).toBeTruthy()
      // console.log(wrapper.emitted())
      // expect(mutateMock).toHavespy.should.have.been.calledBeenCalled()
    })

    // test('Register Button available', () => {
    //   const wrapper = shallowMount(Index, { store, localVue })
    //   expect(wrapper.text()).toContain('Register a new user')
    // })

    // test('Logout button available', () => {
    //   const wrapper = shallowMount(Index, { store, localVue })
    //   expect(wrapper.text()).toContain('Logout as testuu')
    // })
  })
})
