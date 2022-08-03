import request from '@/utils/request'

export function getImgCode(clientToken) {
  return request({
    url: `/api/user-service/user/imageCode/${clientToken}`,
  })
}
export function login(data) {
  return request({
    url: `/api/user-service/user/login`,
    method: 'POST',
    data,
  })
}

export function userInfo(id) {
  return request({
    url: `/api/user-service/user/${id}`,
  })
}
