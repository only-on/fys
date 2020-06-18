import axios from './index'
import Qs from 'qs'
let base = '/sys'
// 登录
export const userLogin = params => { return axios.post(`${base}/user/login`,Qs.stringify(params)) }
// 退出
export const userLogout = params => { return axios.post(`${base}/user/logout`,Qs.stringify(params)) }
// 资讯列表
export const informationList = params => { return axios.post(`${base}/information/list`, Qs.stringify(params)) }
// 删除资讯
export const delInformation = params => { return axios.get(`${base}/information/delete`, {params: params}) }
// 新增资讯
export const addInformation = params => { return axios.post(`${base}/information/create`, Qs.stringify(params)) }
// 资讯详情
export const informationDetail = params => { return axios.get(`${base}/information/detail`, {params: params}) }
// 修改资讯
export const editInformation = params => { return axios.post(`${base}/information/update`, Qs.stringify(params)) }
// 上传图片
export const uploadImg = params => { return axios.post(`${base}/file/image_upload`, params) }
// 上传视频
export const uploadVideo = params => { return axios.post(`${base}/file/video_upload`, params) }
// 固定资产分类列表
export const fixedTypeList = params => { return axios.post(`${base}/fixedType/list`, Qs.stringify(params)) }
// 新增资产分类
export const fixedTypeAdd = params => { return axios.post(`${base}/fixedType/insert`, Qs.stringify(params)) }
// 资产分类详情
export const fixedTypeDetail = params => { return axios.post(`${base}/fixedType/detail`, Qs.stringify(params)) }
// 编辑资产分类
export const fixedTypeUpdate = params => { return axios.post(`${base}/fixedType/update`,params) }
// 删除资产分类
export const fixedTypeDel = params => { return axios.post(`${base}/fixedType/delete`, Qs.stringify(params)) }
// 资产分类删除参数
export const fixedTypeDelParam = params => { return axios.post(`${base}/fixedType/deleteParam`, Qs.stringify(params)) }
// 固定资产列表
export const fixedAssetList = params => { return axios.post(`${base}/fixedAsset/list`, Qs.stringify(params)) }
// 固定资产分类参数下拉
export const fixedAssetCatePull = params => { return axios.post(`${base}/fixedAsset/pullDown`, Qs.stringify(params)) }
// 新增固定资产
export const fixedAssetadd = params => { return axios.post(`${base}/fixedAsset/insert`, params) }
// 固定资产详情
export const fixedAssetDetail = params => { return axios.post(`${base}/fixedAsset/detail`, Qs.stringify(params)) }
// 编辑固定资产
export const fixedAssetUpdate = params => { return axios.post(`${base}/fixedAsset/update`, params) }
// 删除固定资产
export const fixedAssetDel = params => { return axios.post(`${base}/fixedAsset/delete`, Qs.stringify(params)) }
// 固定资产分类下拉
export const fixedTypePull = params => { return axios.post(`${base}/fixedType/pullDown`, Qs.stringify(params)) }
// 用户列表
export const userList = params => { return axios.post(`${base}/user/userList`, Qs.stringify(params)) }
// 新增用户
export const userAdd = params => { return axios.post(`${base}/user/add`, Qs.stringify(params)) }
// 编辑用户
export const userUpdate = params => { return axios.post(`${base}/user/update`, Qs.stringify(params)) }
// 删除用户
export const userDel = params => { return axios.post(`${base}/user/delete`, Qs.stringify(params)) }
// 日志列表
export const logList = params => { return axios.post(`${base}/operation/list`, Qs.stringify(params)) }
// 房屋列表
export const homeList = params => { return axios.post(`${base}/house/list`, Qs.stringify(params)) }
// 房屋新增
export const homeAdd = params => { return axios.post(`${base}/house/add`, Qs.stringify(params)) }
// 房屋详情
export const homeDetail = params => { return axios.post(`${base}/house/detail`, Qs.stringify(params)) }
// 房屋编辑
export const homeUpdate = params => { return axios.post(`${base}/house/update`, Qs.stringify(params)) }
// 房屋删除
export const homeDel = params => { return axios.post(`${base}/house/delete`, Qs.stringify(params)) }
// 房屋图片列表
export const homeImagesList = params => { return axios.post(`${base}/house/imageList`, Qs.stringify(params)) }
// 房屋图片新增
export const homeImagesAdd = params => { return axios.post(`${base}/house/imageAdd`, Qs.stringify(params)) }
// 房屋图片删除
export const homeImagesDel = params => { return axios.post(`${base}/house/imageDelete`, Qs.stringify(params)) }
// 房屋视频列表
export const homeVideosList = params => { return axios.post(`${base}/house/videoList`, Qs.stringify(params)) }
// 房屋视频新增
export const homeVideosAdd = params => { return axios.post(`${base}/house/videoAdd`, Qs.stringify(params)) }
// 房屋视频删除
export const homeVideosDel = params => { return axios.post(`${base}/house/videoDelete`, Qs.stringify(params)) }
// 房房间列表
export const roomList = params => { return axios.post(`${base}/room/list`, Qs.stringify(params)) }
// 房间新增
export const roomAdd = params => { return axios.post(`${base}/room/add`, Qs.stringify(params)) }
// 房间详情
export const roomDetail = params => { return axios.post(`${base}/room/detail`, Qs.stringify(params)) }
// 房间编辑
export const roomUpdate = params => { return axios.post(`${base}/room/update`, Qs.stringify(params)) }
// 房间删除
export const roomDel = params => { return axios.post(`${base}/room/delete`, Qs.stringify(params)) }
// 租赁列表
export const leaseList = params => { return axios.post(`${base}/houseLease/list`, Qs.stringify(params)) }
// 租赁新增
export const leaseAdd = params => { return axios.post(`${base}/houseLease/add`, Qs.stringify(params)) }
// 租赁详情
export const leaseDetail = params => { return axios.post(`${base}/houseLease/detail`, Qs.stringify(params)) }
// 租赁编辑
export const leaseUpdate = params => { return axios.post(`${base}/houseLease/update`, Qs.stringify(params)) }
// 租赁  待出租房间下拉列表
export const leaseRoomList = params => { return axios.post(`${base}/houseLease/roomPull`, Qs.stringify(params)) }
// 租赁  人工终止
export const leaseStop = params => { return axios.post(`${base}/houseLease/manStop`, Qs.stringify(params)) }
// 租赁  新增租赁图片
export const leaseImagesAdd = params => { return axios.post(`${base}/houseLease/contractAdd`, Qs.stringify(params)) }
// 租赁  删除租赁图片
export const leaseImagesDelete = params => { return axios.post(`${base}/houseLease/contractDelete`, Qs.stringify(params)) }
// 租赁  查询租赁图片
export const leaseImagesList = params => { return axios.post(`${base}/houseLease/contractList`, Qs.stringify(params)) }
// 资产维修记录列表
export const fixedRepairList = params => { return axios.post(`${base}/fixedRepair/list`, Qs.stringify(params)) }
// 资产下拉
export const fixedPull = params => { return axios.post(`${base}/fixedAsset/fixedPullDown`, Qs.stringify(params)) }
// 新增资产维修记录
export const fixedRepairAdd = params => { return axios.post(`${base}/fixedRepair/insert`, Qs.stringify(params)) }
// 资产维修记录详情
export const fixedRepairDetail = params => { return axios.post(`${base}/fixedRepair/detail`, Qs.stringify(params)) }
// 编辑资产维修记录
export const fixedRepairUpdate = params => { return axios.post(`${base}/fixedRepair/update`, Qs.stringify(params)) }
// 删除资产维修记录
export const fixedRepairDel = params => { return axios.post(`${base}/fixedRepair/delete`, Qs.stringify(params)) }
// 资产维护预警列表
export const maintainList = params => { return axios.post(`${base}/fixedRepair/maintainList`, Qs.stringify(params)) }
// 租赁合同阈值列表
export const contarctWarnList = params => { return axios.post(`${base}/warningMode/contractWarningModeList`, Qs.stringify(params)) }
// 租赁合同阈值删除
export const contarctWarnDel = params => { return axios.post(`${base}/warningMode/contractWarningModeDelete`, Qs.stringify(params)) }
// 租赁合同阈值新增
export const contarctWarnAdd = params => { return axios.post(`${base}/warningMode/contractWarningModeAdd`, Qs.stringify(params)) }
// 租赁合同阈值编辑
export const contarctWarnUpdate = params => { return axios.post(`${base}/warningMode/contractWarningModeUpdate`, Qs.stringify(params)) }
// 固定资产预警规则列表
export const fixedWarnList = params => { return axios.post(`${base}/fixedTypeWarning/list`, Qs.stringify(params)) }
// 固定资产预警规则新增
export const fixedWarnAdd = params => { return axios.post(`${base}/fixedTypeWarning/insert`, Qs.stringify(params)) }
// 固定资产预警规则详情
export const fixedWarnDetail = params => { return axios.post(`${base}/fixedTypeWarning/detail`, Qs.stringify(params)) }
// 固定资产预警规则编辑
export const fixedWarnUpdate = params => { return axios.post(`${base}/fixedTypeWarning/update`, Qs.stringify(params)) }
// 固定资产预警规则删除
export const fixedWarnDel = params => { return axios.post(`${base}/fixedTypeWarning/delete`, Qs.stringify(params)) }
// 固定资产分类没有选定期维护的下拉列表
export const unWarnPull = params => { return axios.post(`${base}/fixedTypeWarning/pull`, Qs.stringify(params)) }
