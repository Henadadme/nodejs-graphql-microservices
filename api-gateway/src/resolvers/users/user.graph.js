import { isEmpty, isNil } from 'lodash'
import queryUtils from '../../utils/query'

const UserGraph = {
  posts: {
    resolve: async (parent, {
      q, first, last, before, after, orderBy
    }, { postService }) => {
      const query = {}

      if (!isEmpty(q)) Object.assign(query, { where: { title: { $like: q } } })

      if (!isNil(first)) Object.assign(query, { limit: first })

      if (!isEmpty(after)) {
        Object.assign(query, { after, limit: first })
      } else if (!isEmpty(before)) {
        Object.assign(query, { before, limit: last })
      }

      if (!isEmpty(orderBy)) {
        const order = await queryUtils.getOrder(orderBy)

        Object.assign(query, { orderBy: order })
      }

      return postService.find(query)
    }
  },
  comments: {
    resolve: async (parent, {
      q, first, last, before, after, orderBy
    }, { commentService }) => {
      const query = {}

      if (!isEmpty(q)) Object.assign(query, { where: { text: { $like: q } } })

      if (!isNil(first)) Object.assign(query, { limit: first })

      if (!isEmpty(after)) {
        Object.assign(query, { after, limit: first })
      } else if (!isEmpty(before)) {
        Object.assign(query, { before, limit: last })
      }

      if (!isEmpty(orderBy)) {
        const order = await queryUtils.getOrder(orderBy)

        Object.assign(query, { orderBy: order })
      }

      return commentService.find(query)
    }
  }
}

export default UserGraph
