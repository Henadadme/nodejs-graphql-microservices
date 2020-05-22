import { isEmpty, merge } from 'lodash'
import queryUtils from '../../utils/query'

const postCount = {
  authenticate: false,
  resolve: async (parent, { q, filterBy }, { postService }) => {
    const query = {}

    if (!isEmpty(q)) merge(query, { where: { title: { _iLike: q } } })

    merge(query, await queryUtils.getFilters(filterBy))

    return postService.count(query)
  }
}

export default { postCount }
