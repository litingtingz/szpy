/*import api from '@/api/index.js'
import store from '@/store'*/

/**
 * APP采集系统管理后台
 */

// 采集信息列表 搜索条件
const znCollectlistIntranet = {
    // 查询项
    cx: [
        {
            cm: '请选择照片类型',
            type: 'select',
            dm: 'collectionItem_status',
            optype: true
            // must: true
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'countryCode'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportNumber'
        },
        {
            cm: '采集人姓名',
            type: 'input',
            dm: 'userName_str'
        },
        {
            cm: '采集地址',
            type: 'input',
            dm: 'znAddress_str',

        },
        {
            cm: '校正状态',
            type: 'select',
            dm: 'check_status',
            optype: true
        },
        {
            cm: '对比状态',
            type: 'select',
            dm: 'compare_status',
            optype: true
        },
        {
            cm: '是否有效',
            type: 'select',
            dm: 'isdelete_status',
            optype: true
        },
        {
            cm: '采集日期',
            type: 'input',
            dm: 'addTime'
        },
        {
            cm: '请选择所属分局',
            type: 'select',
            dm: 'subBureauCode'
        },
        {
            cm: '请选择所属派出所',
            type: 'select',
            dm: 'policeStationCode'
        },
        {
            cm: '是否本人任务',
            type: 'select',
            dm: 'task_status',
            optype: true
        },
    ],
    // 列表项
    lb: [
        {
            cm: '照片',
            dm: 'imgpath'
        },
        {
            cm: '照片类型',
            dm: 'collectionItem'
        },
        {
            cm: '国家地区',
            dm: 'countryCode'
        },
        {
            cm: '证件类型',
            dm: 'passportType'
        },
        {
            cm: '证件号码',
            dm: 'passportNumber'
        },
        {
            cm: '姓名',
            dm: 'nameHome'
        },
        {
            cm: '性别',
            dm: 'sex'
        },
        {
            cm: '出生日期',
            dm: 'birthday'
        },
        {
            cm: '居住地址',
            dm: 'znAddress'
        },
        {
            cm: '操作状态',
            dm: 'option'
        },
        {
            cm: '本户境外人数',
            dm: 'abroad'
        },
        {
            cm: '已登记人数',
            dm: 'register'
        },
        {
            cm: '出生地',
            dm: 'birthAddress'
        },
        {
            cm: '采集人姓名',
            dm: 'userName'
        },
        {
            cm: '采集人所属分局',
            dm: 'subBureau'
        },
        {
            cm: '采集人所属派出所',
            dm: 'policeStation'
        },
        {
            cm: '采集人手机号',
            dm: 'mobile'
        },
        {
            cm: '采集时间',
            dm: 'addtime'
        },
        {
            cm: '校正状态',
            dm: 'checkStatus'
        },
        {
            cm: '对比状态',
            dm: 'compareStatus'
        },
        {
            cm: '对比结果',
            dm: 'compareResult'
        },
        {
            cm: '是否有效',
            dm: 'isDelete'
        }
    ],
    lbBtn: [
        {
            "button_name": "密码重置",
            "button_type": "mmcz",
            "icon": "mmcz",
            "serial": "201",
        },
        {
            "button_name": "生成随机密码",
            "button_type": "scsjmm",
            "icon": "scsjmm",
            "serial": "201",
        }
    ],
    plBtn: [
        {
            "button_name": "新建",
            "button_type": "xj",
            "user_ctrl": 1,
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "修改",
            "button_type": "xg",
            "user_ctrl": 1,
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "删除",
            "button_type": "sc",
            "user_ctrl": 1,
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "全部密码重置",
            "button_type": "plmmcz",
            "serial": "201",
            "type": "primary"
        },
        {
            "button_name": "全部生成随机密码",
            "button_type": "plscsjmm",
            "serial": "201",
            "type": "primary"
        }
    ],
    // 【单位列表】
    dwtb: [
        {
            cm: '单位名称',
            dm: 'xtyhbmmc'
        },
        // {
        //     cm: '单位类型',
        //     dm: 'xtyhbmcj'
        // },
    ],
    xj: [
        {
            cm: '姓名',
            type: 'input',
            dm: 'xm' //必填
        },
        {
            cm: '电话号码',
            type: 'input',
            dm: 'yddh'//必填
        },
        {
            cm: '警号',
            type: 'input',
            dm: 'jingHao'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'sfzh'//必填
        },
        {
            cm: '所属单位',
            type: 'select',
            dm: 'bmbh',//必填
        },
        // {
        //     cm: '市局单位',
        //     type: 'select',
        //     dm: 'sjBmbh',
        // },
        // {
        //     cm: '分局单位',
        //     type: 'select',
        //     dm: 'fjBmbh',
        // },
        // {
        //     cm: '派出所单位',
        //     type: 'select',
        //     dm: 'pcsBmbh',
        // },
        {
            cm: '密码',
            type: 'input',
            dm: 'xtmm'//必填
        },
        // {
        //     cm: '用户类型',
        //     type: 'select',
        //     dm: 'userType',
        //     optype: true
        // },
    ],
    xg: [
        {
            cm: '姓名',
            type: 'input',
            dm: 'xm'
        },
        {
            cm: '电话号码',
            type: 'input',
            dm: 'yddh'
        },
        {
            cm: '警号',
            type: 'input',
            dm: 'jingHao'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'sfzh'
        },
        {
            cm: '所属单位',
            type: 'select',
            dm: 'bmbh'
        }
    ],
    plmmcz: [
        {
            cm: '密码',
            type: 'password',
            dm: 'xtmm'
        },
        {
            cm: '确认密码',
            type: 'password',
            dm: 'qrxtmm'
        },
    ]
}

// 获取单位列表
/*function getDeptTreeByBmbh() {
    return new Promise((resolve) => {
        api.post(
            api.aport1 + "/dept/getDeptTreeByBmbh",
            { bmbh: store.state.user.bmbh },
            // { bmbh: this.$store.state.user.bmbh },
            r => {
                resolve(r)
            }
        );

    })
}*/

export default {
    znCollectlistIntranet
}