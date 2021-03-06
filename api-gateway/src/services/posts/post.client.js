import path from 'path'

import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'

const proto = protoLoader.loadSync(path.resolve(__dirname, '../../_proto/post.proto'), {
  keepCase: true,
  enums: String,
  oneofs: true
})
const PostsServiceClient = grpc.loadPackageDefinition(proto).post.PostsService

export default PostsServiceClient
