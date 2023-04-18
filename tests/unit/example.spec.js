import { shallowMount } from '@vue/test-utils'
import MissionControl from '@/pages/MissionControl.vue'

describe('MissionControl.vue', () => {
	// Check Renders correctly
	it('renders correctly', () => {
		const wrapper = shallowMount(MissionControl)
		expect(wrapper.element).toMatchSnapshot()
	})
})
