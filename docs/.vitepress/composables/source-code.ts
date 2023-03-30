import { computed } from 'vue'
import { useData } from 'vitepress'
import { createGitHubUrl } from '../utils'
import type { Ref } from 'vue'

export const useSourceCode = (path: Ref<string>) => {
	const { theme } = useData()

	return computed(() => {
		const { repo, docsDir = '', docsBranch = 'main', docsRepo = repo } = theme.value
		return createGitHubUrl(docsRepo, docsDir, docsBranch, path.value)
	})
}
