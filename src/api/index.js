import ajax from './ajax'

const BASE = '/api'
// 经纬获取位置
export const reqAddress = (longitude,latitude) => ajax({
  method: 'GET',
  url: BASE + `/position/${latitude},${longitude}`
})
//食品列表
export const reqCategorys = () => ajax.get(
  BASE +'/index_category'
)

//商铺列表
export const reqShops = ({longitude,latitude}) => ajax(
  {url: BASE +'/shops',
  params: {
    latitude,
    longitude
  }}
)























// 模拟请求
reqAddress('116.36867', '40.10038').then((result) => {
  console.log('result', result)
})