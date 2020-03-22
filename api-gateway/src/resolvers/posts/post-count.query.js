import { isEmpty } from 'lodash'

const postCount = {
  authenticate: false,
  resolve: async (parent, { q }, { postService }) => {
    const query = {}

    if (!isEmpty(q)) Object.assign(query, { where: { title: { $like: q } } })

    return postService.count(query)
  },
}

export default { postCount }
