/* eslint-disable no-undef */
import axios from 'axios'
import PostCard from '../PostCard.vue'
import { mount, flushPromises } from '@vue/test-utils'

const mockPost = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
}

describe('Post Card Component', () => {
  test('can fetch and display a post', async () => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockPost })

    const wrapper = mount(PostCard)

    expect(wrapper.html()).toContain('Loading...')

    await flushPromises()

    // new
    expect(wrapper.find('[data-testid="post-title"]').text()).toBe(mockPost.title)

    expect(wrapper.find('[data-testid="post-body"]').text()).toBe(mockPost.body)
  })

  test('can display an error message if fetching a post fails', async () => {
    vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Error occurred'))

    const wrapper = mount(PostCard)

    expect(wrapper.html()).toContain('Loading...')

    await flushPromises()

    expect(wrapper.find('[data-testid="error-message"]').text()).toBe('Error occurred')
  })
})
