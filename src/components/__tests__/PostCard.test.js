/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'

import PostCard from '../PostCard.vue'
import { expect } from 'vitest'

describe('Post Card Component', () => {
  test('created posts render correctly', () => {
    const title = 'Test Post'
    const body = 'test post body...'
    const wrapper = mount(PostCard, {
      props: { title, body }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
