import { isEmpty } from 'lodash'

class CacheMiddleware {
  constructor(cacheService, logger) {
    this._cacheService = cacheService
    this._logger = logger
  }

  find(prefix) {
    return async ({ req, response }, next) => {
      const key = Buffer.from(JSON.stringify(req)).toString('base64')

      this._logger.info('CacheMiddleware#find.key %o', `${prefix}-find-${key}`)

      const cachedResult = await this._cacheService.get(`${prefix}-find-${key}`)

      this._logger.info('CacheMiddleware#find.cachedResult %o', cachedResult)

      if (!isEmpty(cachedResult)) {
        response.res = cachedResult

        return response.res
      }

      await next()

      this._logger.info('CacheMiddleware#find.addToCache %o %o', `${prefix}-find-${key}`, response.res)

      await this._cacheService.set(`${prefix}-find-${key}`, response.res)

      return response.res
    }
  }

  read(prefix) {
    return async ({ req, response }, next) => {
      const key = Buffer.from(JSON.stringify(req)).toString('base64')

      this._logger.info('CacheMiddleware#read.key %o', `${prefix}-read-${key}`)

      const cachedResult = await this._cacheService.get(`${prefix}-read-${key}`)

      this._logger.info('CacheMiddleware#read.cachedResult %o', cachedResult)

      if (!isEmpty(cachedResult)) {
        response.res = cachedResult

        return response.res
      }

      await next()

      this._logger.info('CacheMiddleware#read.addToCache %o %o', `${prefix}-read-${key}`, response.res)

      await this._cacheService.set(`${prefix}-read-${key}`, response.res)

      return response.res
    }
  }

  write(prefix) {
    return async (ctx, next) => {
      await next()

      return this._cacheService.flush(`${prefix}*`)
    }
  }

  remove(prefix) {
    return async ({ response }, next) => {
      await next()

      if (response.res.count > 0) {
        return this._cacheService.flush(`${prefix}*`)
      }

      return null
    }
  }
}

export default CacheMiddleware
