import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import Navbar from '../components/Navbar'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('Navbar component', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      currentUser: () => {
        return {
          username: 'testuu'
        }
      }
    }

    store = new Vuex.Store({
      getters
    })
  })

  describe('Navbar', () => {
    const onLogoutMock = jest.fn(() => Promise.resolve())
    test('is a Vue instance', () => {
      const wrapper = shallowMount(Navbar, { store, localVue })
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    test('Login button available', () => {
      getters = {
        currentUser: () => null
      }

      store = new Vuex.Store({
        getters
      })
      const wrapper = shallowMount(Navbar, { store, localVue })
      expect(wrapper.text()).toContain('Login')
    })

    test('Logout button available', () => {
      const wrapper = shallowMount(Navbar, { store, localVue })
      expect(wrapper.text()).toContain('Logout as testuu')
    })

    test('Logouts properly', () => {
      const config = {
        mocks: {
          $apolloHelpers: {
            onLogout: onLogoutMock
          },
          $router: {
            go: () => {}
          }
        },
        store,
        localVue
      }
      // TODO: test a router proper navigation
      const wrapper = mount(Navbar, config)
      wrapper.find('li.el-menu-item').trigger('click')
      expect(onLogoutMock).toHaveBeenCalled()
    })
  })
})