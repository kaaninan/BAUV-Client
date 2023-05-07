import { shallowMount } from '@vue/test-utils'
import Comms from '@/pages/Comms.vue'

describe('Comms.vue', () => {
	// Check Renders correctly
	it('renders correctly', () => {
		const wrapper = shallowMount(Comms)
		expect(wrapper.element).toMatchSnapshot()
	})
})
