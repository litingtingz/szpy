// import store from '@/store'
//核查走访管理
const zxhc = {
    cx: [
        {
            cm: '中文姓名',
            type: 'input',
            dm: 'name'
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname'
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
        },
        {
            cm: '年龄段',
            type: 'ageDouble',
            dm: 'age',
            children: [
                {
                    cm: '开始年龄',
                    type: 'number',
                    dm: 'birthdayStart'
                },
                {
                    cm: '结束年龄',
                    type: 'number',
                    dm: 'birthdayEnd'
                },
            ],
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality'
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno'
        },
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice'
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation'
        },

        
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype'
        },
        {
            cm: '走访状态',
            type: 'select',
            dm: 'backstatus',
            disdm:true
        },
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address'
        },
        {
            cm: '任务处理时间',
            type: 'double',
            dm: 'fkTime',
            children: [
                {
                    cm: '反馈开始时间',
                    type: 'date',
                    dm: 'policestation_backtimeStart'
                },
                {
                    cm: '反馈结束时间',
                    type: 'date',
                    dm: 'policestation_backtimeEnd'
                },
            ],
        },
        {
            cm: '分局下发时间',
            type: 'double',
            dm: 'xfTime',
            children: [
                {
                    cm: '下发开始时间',
                    type: 'date',
                    dm: 'suboffice_issuedateStart'
                },
                {
                    cm: '下发结束时间',
                    type: 'date',
                    dm: 'suboffice_issuedateEnd'
                }
            ]
        },
        

    ],
    facx:[
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype',
            color:'primary'
        },
        {
            cm: '走访状态',
            type: 'select',
            dm: 'backstatus',
            color:'success',
            checkC:'#67C23A'
        }, 
        // {
        //     cm: '任务处理状态',
        //     type: 'select',
        //     dm: 'statusName'
        // },
    ],
    lb: [
        {
            cm: '中文姓名',
            dm: 'name'
        },
        {
            cm: '英文姓名',
            dm: 'givenname'
        },
        {
            cm: '性别',
            dm: 'gender_desc',
            width:'50'
        },
        {
            cm: '出生日期',
            dm: 'birthday',
            width:'85'
        },
        {
            cm: '国家地区',
            dm: 'nationality_desc',
            width:'70'
        },
        {
            cm: '证件种类',
            dm: 'passportType_desc'
        },
        {
            cm: '证件号码',
            dm: 'passportno'
        },
        {
            cm: '详细地址',
            dm: 'address',
            width:'280'
        },
        {
            cm: '所属分局',
            dm: 'suboffice_desc',
            width:'280'
        },
        {
            cm: '所属派出所',
            dm: 'policestation_desc',
            width:'280'
        },
        {
            cm: '下发类别',
            dm: 'datatype_desc'
        },
        {
            cm: '手机号码',
            dm: 'phone',
        },   
        {
            cm: '走访状态',
            dm: 'backstatus_desc'
        },
        {
            cm: '市局下发时间',
            dm: 'issuedate'
        },
        {
            cm: '分局下发时间',
            dm: 'suboffice_issuedate'
        },
        {
            cm: '反馈时间',
            dm: 'policestation_backtime'
        },
        {
            cm: '任务处理状态',
            dm: 'statusName'
        },
        {
            cm: '数据来源',
            dm: 'datasources_desc',
            control:true,//列表项根据条件控制显示
        },
        {
            cm: '停留事由',
            dm: 'stopmatter',
        },
        {
            cm: '备注',
            dm: 'remarks',
        },
    ],
    inlb:[
        {
            cm:'处理单位',
            dm:'cldw'
        },
        {
            cm:'处理人',
            dm:'clr'
        },
        {
            cm:'处理时间',
            dm:'clsj'
        },
        {
            cm:'处理状态',
            dm:'clzt'
        },
    ],
    lbBtn: [
        {
            "button_name": "回退",
            "button_type": 'back',
            "serial": "201",
            "user_ctrl":'1',
            "status":true,
            "control":true//根据Tab控制
        },
        {
            "button_name": "处理",
            "button_type": 'edit',
            "serial": "201",
            "user_ctrl":'1',
            "status":true
        },
        {
            "button_name": "详情",
            "button_type": 'ck',
            "serial": "201",
            "user_ctrl":'0',
            "status":true
        },
    ],
    plBtn: [
        {
            "button_name": "上报",
            "serial": "201",
            "button_type": "sb",
            "type": "success"
        },
        {
            "button_name": "下发",
            "serial": "201",
            "button_type": "xf",
            "type": "primary"
        },
    ],
    lbTab: [],
    lbTab1: [],
    //编辑弹窗
    editcontent: [],
    //下发市局弹窗
    xfSContent: [
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice',
            dis: false,
        },
    ],
    //下发分局弹窗
    xfFContent: [
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation',
            dis: false,
        },
    ],
    //内联弹窗
    innerDiaCon:[],
    dbBtn: [
        {
            "button_name": "上报",
            "serial": "201",
            "button_type": "singSb",
            "type": "primary",
        },
        {
            "button_name": "下发",
            "serial": "201",
            "button_type": "singXf",
            "type": "primary",
        },
    ],
}
//未报临住提醒
const wblztx={
    cx: [
        {
            cm: '中文姓名',
            type: 'input',
            dm: 'name'
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenName'
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality'
        },
        {
            cm: '出生日期',
            type: 'double',
            dm: 'csTime',
            children: [
                {
                    cm: '出生开始时间',
                    type: 'date',
                    dm: 'birthdayStart'
                },
                {
                    cm: '出生结束时间',
                    type: 'date',
                    dm: 'birthdayEnd'
                }
            ]
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno'
        },
        {
            cm: '申报时间',
            type: 'double',
            dm: 'sbTime',
            children: [
                {
                    cm: '申报开始时间',
                    type: 'date',
                    dm: 'createtimeStart'
                },
                {
                    cm: '申报结束时间',
                    type: 'date',
                    dm: 'createtimeEnd'
                },
            ],
        },
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice'
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation'
        },
    ],
    lb: [
        {
            cm: '中文姓名',
            dm: 'name'
        },
        {
            cm: '英文姓名',
            dm: 'givenName'
        },
        {
            cm: '性别',
            dm: 'gender_desc',
            width:'50'
        },
        {
            cm: '出生日期',
            dm: 'birthday',
            width:'85'
        },
        {
            cm: '国家地区',
            dm: 'nationality_desc',
            width:'70'
        },
        {
            cm: '证件种类',
            dm: 'passportType_desc'
        },
        {
            cm: '证件号码',
            dm: 'passportno'
        },
        {
            cm: '住宿地址',
            dm: 'address',
            width:'280'
        },
        {
            cm: '停留事由',
            dm: 'stopmatter',
        },
        {
            cm: '所属分局',
            dm: 'suboffice_desc',
            width:'280'
        },
        {
            cm: '所属派出所',
            dm: 'policestation_desc',
            width:'280'
        },
        {
            cm: '申报时间',
            dm: 'createtime'
        },
    ],
    xzDia:[
        {
            cm: '中文姓名',
            type: 'input',
            dm: 'name',
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenName',
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
        },
        {
            cm: '出生日期',
            type: 'datePicker',
            dm: 'birthday',
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality',
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType',
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno',
        },
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address',
            col:16
        },
        {
            cm: '手机号码',
            type: 'input',
            dm: 'phone',
        },
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice',
            col:16
        },
        {
            cm: '停留事由',
            type: 'select',
            dm: 'stopmatter',
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation',
            col:16
        },
    ],
}
//地址线索排查
const dzxspc = {
    cx: [
        {
            cm: '详细地址',
            type: 'input',
            dm: 'address'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno'
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality'
        },
        {
            cm: '标题',
            type: 'input',
            dm: 'title'
        },
        {
            cm: '分局下发时间',
            type: 'double',
            dm: 'fkTime',
            children: [
                {
                    cm: '开始时间',
                    type: 'date',
                    dm: 'suboffice_issuedateStart'
                },
                {
                    cm: '结束时间',
                    type: 'date',
                    dm: 'suboffice_issuedateEnd'
                },
            ],
        },
        {
            cm: '分局上报时间',
            type: 'double',
            dm: 'xfTime',
            children: [
                {
                    cm: '开始时间',
                    type: 'date',
                    dm: 'suboffice_back_timeStart'
                },
                {
                    cm: '结束时间',
                    type: 'date',
                    dm: 'suboffice_back_timeEnd'
                }
            ]
        },
        {
            cm: '派出所反馈时间',
            type: 'double',
            dm: 'xfTime',
            children: [
                {
                    cm: '开始时间',
                    type: 'date',
                    dm: 'policestation_backtimeStart'
                },
                {
                    cm: '结束时间',
                    type: 'date',
                    dm: 'policestation_backtimeEnd'
                }
            ]
        },
    ],
    facx:[],
    lb: [
        {
            cm: '详细地址',
            dm: 'address',
            width:'280'
        },
        {
            cm: '所属分局',
            dm: 'suboffice_desc',
            width:'280'
        },
        {
            cm: '所属派出所',
            dm: 'policestation_desc',
            width:'280'
        },
        {
            cm: '接收时间',
            dm: 'turnoutarea_receive_time'
        },
        {
            cm: '市局下发时间',
            dm: 'issuedate',
        },   
        {
            cm: '分局下发时间',
            dm: 'suboffice_issue_time'
        },
        {
            cm: '派出所下发时间',
            dm: 'policestation_issue_time'
        },
        {
            cm: '标题',
            dm: 'title'
        },
        {
            cm: '备注',
            dm: 'remarks'
        },
        {
            cm: '采集人',
            dm: 'create_userid'
        },
        {
            cm: '数据来源',
            dm: 'datasources_desc',
        },
    ],
    lbBtn: [
        {
            "button_name": "处理",
            "button_type": 'edit',
            "serial": "201",
            "user_ctrl":'1',
            "status":true
        },
        {
            "button_name": "详情",
            "button_type": 'ck',
            "serial": "201",
            "user_ctrl":'0',
            "status":true
        },
    ],
    lbTab: [],
    lbTab1: [],
    //编辑弹窗
    editcontent: [],
    //下发市局弹窗
    xfSContent: [
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice',
            dis: false,
        },
    ],
    //下发分局弹窗
    xfFContent: [
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation',
            dis: false,
        },
    ],
    //内联弹窗
    innerDiaCon:[],
    dbBtn: [
        {
            "button_name": "上报",
            "serial": "201",
            "button_type": "singSb",
            "type": "primary",
        },
        {
            "button_name": "下发",
            "serial": "201",
            "button_type": "singXf",
            "type": "primary",
        },
    ],
    xzDia:[
        {
            cm: '标题',
            type: 'input',
            dm: 'title',
        },
        {
            cm: '地址',
            type: 'input',
            dm: 'address',
        },
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice',
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation',
        },
        {
            cm: '备注',
            type: 'textarea',
            dm: 'remarks',
        },
    ]
}
//责任区走访
const zrqzf = {
    cx: [
        {
            cm: '中文姓名',
            type: 'input',
            dm: 'name'
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname'
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
        },
        {
            cm: '年龄段',
            type: 'ageDouble',
            dm: 'age',
            children: [
                {
                    cm: '开始年龄',
                    type: 'number',
                    dm: 'birthdayStart'
                },
                {
                    cm: '结束年龄',
                    type: 'number',
                    dm: 'birthdayEnd'
                },
            ],
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno'
        },
        
        {
            cm: '接收人',
            type: 'input',
            dm: 'turnoutarea_receive_user'
        },
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address'
        },
        {
            cm: '接收时间',
            type: 'double',
            dm: 'jsTime',
            children: [
                {
                    cm: '反馈开始时间',
                    type: 'date',
                    dm: 'turnoutarea_receivedateStart'
                },
                {
                    cm: '反馈结束时间',
                    type: 'date',
                    dm: 'turnoutarea_receivedateEnd'
                },
            ],
        },
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice'
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation'
        },
        {
            cm: '接收责任区',
            type: 'select',
            dm: 'turnoutarea'
        },
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype'
        },
        {
            cm: '走访状态',
            type: 'select',
            dm: 'backstatus',
            disdm:true//查询项下拉选不展示dm
        },
    ],
    lb: [
        {
            cm: '中文姓名',
            dm: 'name'
        },
        {
            cm: '英文姓名',
            dm: 'givenname'
        },
        {
            cm: '性别',
            dm: 'gender_desc',
            width:'50'
        },
        {
            cm: '出生日期',
            dm: 'birthday',
            width:'85'
        },
        {
            cm: '国家地区',
            dm: 'nationality_desc',
            width:'70'
        },
        {
            cm: '证件号码',
            dm: 'passportno'
        },
        {
            cm: '住宿地址',
            dm: 'address',
            width:'280'
        },
        {
            cm: '所属分局',
            dm: 'suboffice_desc',
            width:'280'
        },
        {
            cm: '所属派出所',
            dm: 'policestation_desc',
            width:'280'
        },
        {
            cm: '接收责任区',
            dm: 'turnoutarea_desc',
        },
        {
            cm: '接收人',
            dm: 'turnoutarea_receive_user'
        },
        {
            cm: '手机号码',
            dm: 'phone',
        },
        {
            cm: '下发时间',
            dm: 'suboffice_issuedate'
        },
        {
            cm: '接收时间',
            dm: 'turnoutarea_receivedate'
        },
        {
            cm: '走访状态',
            dm: 'backstatus_desc'
        },
        {
            cm: '接收类型',
            dm: 'datatype_desc'
        },
        {
            cm: '停留事由',
            dm: 'stopmatter',
        },
    ],
    lbBtn: [
        {
            "button_name": "回退",
            "button_type": 'back',
            "serial": "201",
        },
    ],
    plBtn: [
        {
            "button_name": "处理",
            "serial": "201",
            "button_type": "cl",
            "type": "success",

        },
    ],
    clDia: [
        {
            title:'基本信息',
            type:'line'
        },
        {
            cm: '中文姓名',
            type: 'input',
            dm: 'name',            
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname',            
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',            
        },
        {
            cm: '出生日期',
            type: 'datePicker',
            dm: 'birthday',            
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality',            
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType',
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno',
        },
        {
            cm: '停留事由',
            type: 'input',
            dm: 'stopmatter',
        },
        {
            cm: '手机号码',
            type: 'input',
            dm: 'phone',
            hc_con:'2',
        },
        {
            title:'走访信息',
            type:'line'
        },
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype',            
        },
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address',            
        },
        {
            cm: '走访状态',
            type: 'radio',
            dm: 'backstatus'
        },
        {
            cm: '备注',
            type: 'input',
            dm: 'remarks',
            max:160,
        },
        {
            title:'数据归属',
            type:'line'
        },
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice',            
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation',            
        },       
        {
            cm: '接收人',
            type: 'input',
            dm: 'turnoutarea_receive_user',            
        },
        {
            cm: '接收责任区',
            type: 'input',
            dm: 'turnoutarea_desc',            
        },
        {
            cm: '接收时间',
            type: 'input',
            dm: 'turnoutarea_receivedate',            
        },
    ],
    zrqDia: [
        {
            cm: '责任区',
            type: 'select',
            dm: 'turnoutarea',
        },
    ],
    zrqJs: [
        {
            cm: '责任区',
            type: 'select',
            dm: 'turnoutarea',
            optype: true
        },
    ],
    dbBtn: [
        {
            "button_name": "上一页",
            "serial": "201",
            "button_type": "upPage",
            "type": "info",
        },
        {
            "button_name": "下一页",
            "serial": "201",
            "button_type": "nextPage",
            "type": "info",
        },
    ],
}
//专项核查管理
const zxhcgl = {
    cx: [
        {
            cm: '标题',
            type: 'input',
            dm: 'title'
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname'
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality'
        },
        {
            cm: '年龄段',
            type: 'ageDouble',
            dm: 'age',
            children: [
                {
                    cm: '开始年龄',
                    type: 'number',
                    dm: 'birthdayStart'
                },
                {
                    cm: '结束年龄',
                    type: 'number',
                    dm: 'birthdayEnd'
                },
            ],
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType'
        },
        
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno'
        },
        {
            cm: '签证种类',
            type: 'select',
            dm: 'visaType'
        },
        
        {
            cm: '签证号码',
            type: 'input',
            dm: 'visano'
        },
        {
            cm: '地址',
            type: 'input',
            dm: 'address'
        },
        // {
        //     cm: '下发状态',
        //     type: 'select',
        //     dm: 'issuedate_status',
        //     optype:true
        // },
        {
            cm: '出入境时间',
            type: 'double',
            dm: 'crjTime',
            children: [
                {
                    cm: '开始时间',
                    type: 'date',
                    dm: 'entry_exit_StartTime'
                },
                {
                    cm: '结束时间',
                    type: 'date',
                    dm: 'entry_exit_EndTime'
                }
            ]
        },
        {
            cm: '出入境状态',
            type: 'select',
            dm: 'entry_exit_status',
            optype:true
        },
    ],
    facx:[

    ],
    lb: [
        {
            cm: '标题',            
            dm: 'title', 
        },
        {
            cm: '英文姓名',            
            dm: 'givenname', 
        },
        {
            cm: '性别',            
            dm: 'gender_desc',
            width:'50'
        },
        {
            cm: '出生日期',           
            dm: 'birthday',
            width:'85'
        },
        {
            cm: '国家地区',           
            dm: 'nationality_desc',
            width:'70'
        },
        {
            cm: '证件种类',           
            dm: 'passportType_desc',
        },
        {
            cm: '证件号码',           
            dm: 'passportno',
        },
        {
            cm: '签证种类',           
            dm: 'visaType_desc',
        },
        {
            cm: '签证号码',           
            dm: 'visano',
        },
        {
            cm: '住宿地址',            
            dm: 'address',
            width:'280'
        },
        {
            cm: '下发状态',            
            dm: 'issuedate_status_desc',
        },
        {
            cm: '出入境时间',            
            dm: 'entry_exit_time',
        },
        {
            cm: '出入境状态',            
            dm: 'entry_exit_status_desc',
        },
        {
            cm: '创建时间',            
            dm: 'createtime',
        },
        {
            cm: '创建人员',            
            dm: 'create_user_id',
        },
        {
            cm: '更新时间',            
            dm: 'updatetime',
        },
        {
            cm: '更新人员',            
            dm: 'update_user_id',
        },
    ],
    lbTab:[
        {
            mc:'未下发',
            dm:'0'
        },
        {
            mc:'已下发',
            dm:'1'
        },
        {
            mc:'已走访',
            dm:'2'
        },
        {
            mc:'已归档',
            dm:'3'
        },
    ],
    lbBtn: [
        {
            "button_name": "处理",
            "button_type": 'edit',
            "serial": "201",
        },
        {
            "button_name": "归档",
            "button_type": 'gd',
            "serial": "201",
        },
        {
            "button_name": "删除",
            "button_type": 'delete',
            "serial": "201",
        },
    ],
    xz:[
        {
            cm: '标题',
            type: 'input',
            dm: 'title',  
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname',  
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
        },
        {
            cm: '出生日期',
            type: 'datePicker',
            dm: 'birthday', 
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality',
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType',
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno',
        },
        {
            cm: '签证种类',
            type: 'select',
            dm: 'visaType',
        },
        {
            cm: '签证号码',
            type: 'input',
            dm: 'visano',
        },
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address',
        },
        {
            cm: '出入境时间',
            type: 'datePicker',
            dm: 'entry_exit_time',
        },
        {
            cm: '出入境状态',
            type: 'select',
            dm: 'entry_exit_status',
            optype:true,
        },
    ],
    cl:[
        {
            mRow:24,
            labelWid:'100px',
        },
        {
            title:'编辑信息',
            type:'line'
        },
        {
            cm: '标题',
            type: 'input',
            dm: 'title', 
            col:8 
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname', 
            col:8 
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
            col:8 
        },
        {
            cm: '出生日期',
            type: 'datePicker',
            dm: 'birthday',
            col:8 
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality',
            col:8 
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType',
            col:8 
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno',
            col:8 
        },
        {
            cm: '签证种类',
            type: 'select',
            dm: 'visaType',
            col:8 
        },
        {
            cm: '签证号码',
            type: 'input',
            dm: 'visano',
            col:8 
        },
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address',
            col:8 
        },
        {
            cm: '出入境时间',
            type: 'datePicker',
            dm: 'entry_exit_time',
            col:8 
        },
        {
            cm: '出入境状态',
            type: 'select',
            dm: 'entry_exit_status',
            optype:true,
            col:8 
        },
        {
            title:'走访信息',
            type:'line'
        },
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype', 
            dis:true,
            col:8           
        },
        {
            cm: '走访状态',
            type: 'radio',
            dm: 'backstatus',
            dis:true,
            col:16
        },
        {
            cm: '备注',
            type: 'input',
            dm: 'remarks',
            dis:true,
            max:160,
            col:8
        },   
    ]  
}
//144
const offgl = {
    cx: [
        {
            cm: '标题',
            type: 'input',
            dm: 'title'
        },
        // {
        //     cm: '英文姓名',
        //     type: 'input',
        //     dm: 'givenname'
        // },
        // {
        //     cm: '性别',
        //     type: 'select',
        //     dm: 'gender',
        // },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality'
        },
        // {
        //     cm: '出生日期',
        //     type: 'double',
        //     dm: 'csTime',
        //     children: [
        //         {
        //             cm: '下发开始时间',
        //             type: 'date',
        //             dm: 'birthdayStart'
        //         },
        //         {
        //             cm: '下发结束时间',
        //             type: 'date',
        //             dm: 'birthdayEnd'
        //         }
        //     ]
        // },
        
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType'
        },
        
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno'
        },
        // {
        //     cm: '签证种类',
        //     type: 'select',
        //     dm: 'visaType'
        // },
        
        // {
        //     cm: '签证号码',
        //     type: 'input',
        //     dm: 'visano'
        // },
        {
            cm: '地址',
            type: 'input',
            dm: 'address'
        },
        // {
        //     cm: '下发状态',
        //     type: 'select',
        //     dm: 'issuedate_status',
        //     optype:true
        // },
        // {
        //     cm: '出入境时间',
        //     type: 'double',
        //     dm: 'crjTime',
        //     children: [
        //         {
        //             cm: '开始时间',
        //             type: 'date',
        //             dm: 'entry_exit_StartTime'
        //         },
        //         {
        //             cm: '结束时间',
        //             type: 'date',
        //             dm: 'entry_exit_EndTime'
        //         }
        //     ]
        // },
        // {
        //     cm: '出入境状态',
        //     type: 'select',
        //     dm: 'entry_exit_status',
        //     optype:true
        // },
    ],
    facx:[

    ],
    lb: [
        {
            cm: '标题',            
            dm: 'title', 
        },
        // {
        //     cm: '英文姓名',            
        //     dm: 'givenname', 
        // },
        // {
        //     cm: '性别',            
        //     dm: 'gender_desc',
        //     width:'50'
        // },
        // {
        //     cm: '出生日期',           
        //     dm: 'birthday',
        //     width:'85'
        // },
        {
            cm: '国家地区',           
            dm: 'nationality_desc',
            width:'70'
        },
        {
            cm: '证件种类',           
            dm: 'passportType_desc',
        },
        {
            cm: '证件号码',           
            dm: 'passportno',
        },
        // {
        //     cm: '签证种类',           
        //     dm: 'visaType_desc',
        // },
        // {
        //     cm: '签证号码',           
        //     dm: 'visano',
        // },
        {
            cm: '住宿地址',            
            dm: 'address',
            width:'280'
        },
        // {
        //     cm: '下发状态',            
        //     dm: 'issuedate_status_desc',
        // },
        // {
        //     cm: '出入境时间',            
        //     dm: 'entry_exit_time',
        // },
        // {
        //     cm: '出入境状态',            
        //     dm: 'entry_exit_status_desc',
        // },
        // {
        //     cm: '创建时间',            
        //     dm: 'createtime',
        // },
        // {
        //     cm: '创建人员',            
        //     dm: 'create_user_id',
        // },
        // {
        //     cm: '更新时间',            
        //     dm: 'updatetime',
        // },
        // {
        //     cm: '更新人员',            
        //     dm: 'update_user_id',
        // },
    ],
    lbTab:[
        {
            mc:'未下发',
            dm:'0'
        },
        {
            mc:'已下发',
            dm:'1'
        },
        {
            mc:'已走访',
            dm:'2'
        },
        {
            mc:'已归档',
            dm:'3'
        },
    ],
    lbBtn: [
        // {
        //     "button_name": "详情",
        //     "button_type": 'ck',
        //     "serial": "201",
        // },
        {
            "button_name": "处理",
            "button_type": 'edit',
            "serial": "201",
        },
        {
            "button_name": "归档",
            "button_type": 'gd',
            "serial": "201",
        },
        {
            "button_name": "删除",
            "button_type": 'delete',
            "serial": "201",
        },
    ],
    xz:[
        {
            cm: '标题',
            type: 'input',
            dm: 'title',  
        },
        // {
        //     cm: '英文姓名',
        //     type: 'input',
        //     dm: 'givenname',  
        // },
        // {
        //     cm: '性别',
        //     type: 'select',
        //     dm: 'gender',
        // },
        // {
        //     cm: '出生日期',
        //     type: 'datePicker',
        //     dm: 'birthday', 
        // },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality',
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType',
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno',
        },
        // {
        //     cm: '签证种类',
        //     type: 'select',
        //     dm: 'visaType',
        // },
        // {
        //     cm: '签证号码',
        //     type: 'input',
        //     dm: 'visano',
        // },
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address',
        },
        // {
        //     cm: '出入境时间',
        //     type: 'datePicker',
        //     dm: 'entry_exit_time',
        // },
        // {
        //     cm: '出入境状态',
        //     type: 'select',
        //     dm: 'entry_exit_status',
        //     optype:true,
        // },
    ],
    cl:[
        {
            mRow:24,
            labelWid:'100px',
        },
        {
            title:'编辑信息',
            type:'line'
        },
        {
            cm: '标题',
            type: 'input',
            dm: 'title', 
            col:8 
        },
        // {
        //     cm: '英文姓名',
        //     type: 'input',
        //     dm: 'givenname', 
        //     col:8 
        // },
        // {
        //     cm: '性别',
        //     type: 'select',
        //     dm: 'gender',
        //     col:8 
        // },
        // {
        //     cm: '出生日期',
        //     type: 'datePicker',
        //     dm: 'birthday',
        //     col:8 
        // },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality',
            col:8 
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType',
            col:8 
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno',
            col:8 
        },
        // {
        //     cm: '签证种类',
        //     type: 'select',
        //     dm: 'visaType',
        //     col:8 
        // },
        // {
        //     cm: '签证号码',
        //     type: 'input',
        //     dm: 'visano',
        //     col:8 
        // },
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address',
            col:8 
        },
        // {
        //     cm: '出入境时间',
        //     type: 'datePicker',
        //     dm: 'entry_exit_time',
        //     col:8 
        // },
        // {
        //     cm: '出入境状态',
        //     type: 'select',
        //     dm: 'entry_exit_status',
        //     optype:true,
        //     col:8 
        // },
        {
            title:'走访信息',
            type:'line'
        },
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype', 
            dis:true,
            col:8           
        },
        {
            cm: '走访状态',
            type: 'radio',
            dm: 'backstatus',
            dis:true,
            col:16
        },
        {
            cm: '备注',
            type: 'input',
            dm: 'remarks',
            dis:true,
            max:160,
            col:8
        }, 
        {
            title:'出入境记录',
            type:'line'
        },
        {
            cm: '签证类型',
            type: 'input',
            dm: 'visaType_desc',
            dis:true,
        },
        {
            cm: '出入口岸',
            type: 'input',
            dm: 'ioPort_desc',
            dis:true,
        },           
        {
            cm: '前往地',
            type: 'input',
            dm: 'destination_desc',
            dis:true,
        },
        {
            cm: '发证机关',
            type: 'input',
            dm: 'grantCertOrg_desc',
            dis:true,
        },    
        {
            cm: '交通工具',
            type: 'input',
            dm: 'trafficTool',
            dis:true,
        },    
        {
            cm: '交通方式',
            type: 'input',
            dm: 'trafficMode_desc',
            dis:true,
        },       
        {
            cm: '人员类别',
            type: 'input',
            dm: 'personType_desc',
            dis:true,
        },    
        {
            cm: '出入境日期及时间',
            type: 'input',
            dm: 'ioDateTime',
            dis:true,
        },    
        {
            cm: '出入境事由',
            type: 'input',
            dm: 'outReason_desc',
            dis:true,
        },    
        {
            cm: '通道号',
            type: 'input',
            dm: 'channelNO',
            dis:true,
        },    
        {
            cm: '检查员号码',
            type: 'input',
            dm: 'inspectorID',
            dis:true,
        },    
        {
            cm: '旅游团号',
            type: 'input',
            dm: 'tourGroupNO',
            dis:true,
        },  
        {
            cm: '证件种类',
            type: 'input',
            dm: 'certificateType_desc',
            dis:true,
        },     
    ]  
}
//记者自动
const jzzdhc = {
    cx: [
        {
            cm: '标题',
            type: 'input',
            dm: 'title'
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname'
        },
        {
            cm: '中文姓名',
            type: 'input',
            dm: 'name'
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality'
        },
        {
            cm: '年龄段',
            type: 'ageDouble',
            dm: 'age',
            children: [
                {
                    cm: '开始年龄',
                    type: 'number',
                    dm: 'birthdayStart'
                },
                {
                    cm: '结束年龄',
                    type: 'number',
                    dm: 'birthdayEnd'
                },
            ],
        },
        
        // {
        //     cm: '证件种类',
        //     type: 'select',
        //     dm: 'passportType'
        // },
        
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno'
        },
        // {
        //     cm: '签证种类',
        //     type: 'select',
        //     dm: 'visaType'
        // },
        
        // {
        //     cm: '签证号码',
        //     type: 'input',
        //     dm: 'visano'
        // },
        {
            cm: '在苏地址',
            type: 'input',
            dm: 'address'
        },
        // {
        //     cm: '下发状态',
        //     type: 'select',
        //     dm: 'issuedate_status',
        //     optype:true
        // },
        // {
        //     cm: '出入境时间',
        //     type: 'double',
        //     dm: 'crjTime',
        //     children: [
        //         {
        //             cm: '开始时间',
        //             type: 'date',
        //             dm: 'entry_exit_StartTime'
        //         },
        //         {
        //             cm: '结束时间',
        //             type: 'date',
        //             dm: 'entry_exit_EndTime'
        //         }
        //     ]
        // },
        // {
        //     cm: '出入境状态',
        //     type: 'select',
        //     dm: 'entry_exit_status',
        //     optype:true
        // },
    ],
    facx:[

    ],
    lb: [
        {
            cm: '标题',            
            dm: 'title', 
        },
        {
            cm: '英文姓名',            
            dm: 'givenname', 
        },
        {
            cm: '中文姓名',            
            dm: 'name', 
        },
        {
            cm: '性别',            
            dm: 'gender_desc',
            width:'50'
        },
        {
            cm: '出生日期',           
            dm: 'birthday',
            width:'85'
        },
        {
            cm: '国家地区',           
            dm: 'nationality_desc',
            width:'70'
        },
        // {
        //     cm: '证件种类',           
        //     dm: 'passportType_desc',
        // },
        {
            cm: '证件号码',           
            dm: 'passportno',
        },
        // {
        //     cm: '签证种类',           
        //     dm: 'visaType_desc',
        // },
        // {
        //     cm: '签证号码',           
        //     dm: 'visano',
        // },
        {
            cm: '在苏地址',            
            dm: 'address',
            width:'280'
        },
        // {
        //     cm: '下发状态',            
        //     dm: 'issuedate_status_desc',
        // },
        // {
        //     cm: '出入境时间',            
        //     dm: 'entry_exit_time',
        // },
        // {
        //     cm: '出入境状态',            
        //     dm: 'entry_exit_status_desc',
        // },
        // {
        //     cm: '创建时间',            
        //     dm: 'createtime',
        // },
        // {
        //     cm: '创建人员',            
        //     dm: 'create_user_id',
        // },
        // {
        //     cm: '更新时间',            
        //     dm: 'updatetime',
        // },
        // {
        //     cm: '更新人员',            
        //     dm: 'update_user_id',
        // },
    ],
    lbTab:[
        {
            mc:'未下发',
            dm:'0'
        },
        {
            mc:'已下发',
            dm:'1'
        },
        {
            mc:'已走访',
            dm:'2'
        },
        {
            mc:'已归档',
            dm:'3'
        },
    ],
    lbBtn: [
        // {
        //     "button_name": "详情",
        //     "button_type": 'ck',
        //     "serial": "201",
        // },
        {
            "button_name": "处理",
            "button_type": 'edit',
            "serial": "201",
        },
        {
            "button_name": "归档",
            "button_type": 'gd',
            "serial": "201",
        },
        {
            "button_name": "删除",
            "button_type": 'delete',
            "serial": "201",
        },
    ],
    xz:[
        {
            cm: '标题',
            type: 'input',
            dm: 'title',  
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname',  
        },
        {
            cm: '中文姓名',
            type: 'input',
            dm: 'name',  
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
        },
        {
            cm: '出生日期',
            type: 'datePicker',
            dm: 'birthday', 
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality',
        },
        // {
        //     cm: '证件种类',
        //     type: 'select',
        //     dm: 'passportType',
        // },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno',
        },
        // {
        //     cm: '签证种类',
        //     type: 'select',
        //     dm: 'visaType',
        // },
        // {
        //     cm: '签证号码',
        //     type: 'input',
        //     dm: 'visano',
        // },
        {
            cm: '在苏地址',
            type: 'input',
            dm: 'address',
        },
        // {
        //     cm: '出入境时间',
        //     type: 'datePicker',
        //     dm: 'entry_exit_time',
        // },
        // {
        //     cm: '出入境状态',
        //     type: 'select',
        //     dm: 'entry_exit_status',
        //     optype:true,
        // },
    ],
    cl:[
        {
            mRow:24,
            labelWid:'100px',
        },
        {
            title:'编辑信息',
            type:'line'
        },
        {
            cm: '标题',
            type: 'input',
            dm: 'title', 
            col:8 
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname', 
            col:8 
        },
        {
            cm: '中文姓名',
            type: 'input',
            dm: 'name', 
            col:8 
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
            col:8 
        },
        {
            cm: '出生日期',
            type: 'datePicker',
            dm: 'birthday',
            col:8 
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality',
            col:8 
        },
        // {
        //     cm: '证件种类',
        //     type: 'select',
        //     dm: 'passportType',
        //     col:8 
        // },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno',
            col:8 
        },
        // {
        //     cm: '签证种类',
        //     type: 'select',
        //     dm: 'visaType',
        //     col:8 
        // },
        // {
        //     cm: '签证号码',
        //     type: 'input',
        //     dm: 'visano',
        //     col:8 
        // },
        {
            cm: '在苏地址',
            type: 'input',
            dm: 'address',
            col:8 
        },
        // {
        //     cm: '出入境时间',
        //     type: 'datePicker',
        //     dm: 'entry_exit_time',
        //     col:8 
        // },
        // {
        //     cm: '出入境状态',
        //     type: 'select',
        //     dm: 'entry_exit_status',
        //     optype:true,
        //     col:8 
        // },
        {
            title:'走访信息',
            type:'line'
        },
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype', 
            dis:true,
            col:8           
        },
        {
            cm: '走访状态',
            type: 'radio',
            dm: 'backstatus',
            dis:true,
            col:16
        },
        {
            cm: '备注',
            type: 'input',
            dm: 'remarks',
            dis:true,
            max:160,
            col:8
        },     
    ]  
}
//核查走访进度统计表
//(分县局)
const jdtj = {
    cx:[
        {
            cm: '任务下发时间段',
            type: 'double',
            dm: 'rwTime',
            children: [
                {
                    cm: '开始时间',
                    type: 'date',
                    dm: 'issueDateStart'
                },
                {
                    cm: '结束时间',
                    type: 'date',
                    dm: 'issueDateEnd'
                }
            ]
        },
    ],
    facx:[],
    lbFxj:[
        {
            cm: '序号',            
            dm: 'xh', 
        },
        {
            cm: '分、县局',            
            dm: 'ssfj', 
        },
        {
            cm: '走访类别',            
            dm: 'zflb', 
        },
        {
            cm: '分局待下发',            
            dm: 'fjdxfCount',
        },
        {
            cm: '分局待上报',            
            dm: 'fjdsbCount', 
        },
        {
            cm: '分局已上报',            
            dm: 'fjysbCount', 
        },
        {
            cm: '派出所未处理',            
            dm: 'pcswclCount',
        },
        {
            cm: '派出所已上报',            
            dm: 'pcsysbCount', 
        },
        {
            cm: '走访中总量',            
            dm: 'zfzCount', 
        },
        {
            cm: '走访完成量',            
            dm: 'zfwcCount',
        },
        {
            cm: '走访核查任务总量',            
            dm: 'zfhcrwCount', 
        },
        {
            cm: '走访完成率',            
            dm: 'zfwcl', 
        },
    ],
    lbPcs:[
        {
            cm: '序号',            
            dm: 'xh', 
        },
        {
            cm: '分、县局',            
            dm: 'ssfj', 
        },
        {
            cm: '派出所',            
            dm: 'sspcs', 
        },
        {
            cm: '派出所未处理',            
            dm: 'pcswclCount',
        },
        {
            cm: '派出所已上报',            
            dm: 'pcsysbCount',
        },
    ],
}
// 核查走访Tab
function lbTabShow(jb) {
    return new Promise((resolve) => {
        if(jb=='1'){
            zxhc.lbTab = [
                {
                    "mc": '市局未处理',
                    "dm": '1',
                },
                {
                    "mc": '分局待下发',
                    "dm": '2',
                },
                {
                    "mc": '分局待上报',
                    "dm": '5',
                },
                {
                    "mc": '派出所未处理',
                    "dm": '3',
                },
            ]
            zxhc.lbTab1 = [
                {
                    "mc": '已归档',
                    "dm": '1',
                },
                {
                    "mc": '分局已上报',
                    "dm": '2',
                },
                {
                    "mc": '派出所已上报',
                    "dm": '3',
                },
            ]
        }else if(jb=='2'){
            zxhc.lbTab = [   
                {
                    "mc": '分局待下发',
                    "dm": '2',
                },
                {
                    "mc": '分局待上报',
                    "dm": '5',
                },
                {
                    "mc": '派出所未处理',
                    "dm": '3',
                },
            ]
            zxhc.lbTab1 = [
                {
                    "mc": '分局已上报',
                    "dm": '2',
                },
                {
                    "mc": '派出所已上报',
                    "dm": '3',
                },
            ]
        }else{
            zxhc.lbTab = [   
                {
                    "mc": '派出所未处理',
                    "dm": '3',
                },
            ]
            zxhc.lbTab1 = [
                {
                    "mc": '派出所已上报',
                    "dm": '3',
                },
            ]
        }
        resolve({lbTab:zxhc.lbTab,lbTab1:zxhc.lbTab1})
    })
}
// 地址排查Tab
function lbTabShow_DZ(jb) {
    return new Promise((resolve) => {
        if(jb=='1'){
            dzxspc.lbTab = [
                {
                    "mc": '分局待下发',
                    "dm": '2',
                },
                {
                    "mc": '分局待上报',
                    "dm": '5',
                },
                {
                    "mc": '派出所未处理',
                    "dm": '3',
                },
            ]
            dzxspc.lbTab1 = [
                {
                    "mc": '已归档',
                    "dm": '1',
                },
                {
                    "mc": '分局已上报',
                    "dm": '2',
                },
                {
                    "mc": '派出所已上报',
                    "dm": '3',
                },
            ]
        }else if(jb=='2'){
            dzxspc.lbTab = [   
                {
                    "mc": '分局待下发',
                    "dm": '2',
                },
                {
                    "mc": '分局待上报',
                    "dm": '5',
                },
                {
                    "mc": '派出所未处理',
                    "dm": '3',
                },
            ]
            dzxspc.lbTab1 = [
                {
                    "mc": '分局已上报',
                    "dm": '2',
                },
                {
                    "mc": '派出所已上报',
                    "dm": '3',
                },
            ]
        }else{
            dzxspc.lbTab = [   
                {
                    "mc": '派出所未处理',
                    "dm": '3',
                },
            ]
            dzxspc.lbTab1 = [
                {
                    "mc": '派出所已上报',
                    "dm": '3',
                },
            ]
        }
        resolve({lbTab:dzxspc.lbTab,lbTab1:dzxspc.lbTab1})
    })
}
// 核查走访处理弹窗
function editShow(jb,isE) {
    return new Promise((resolve) => {
        zxhc.editcontent = [
            {
                title:'基本信息',
                type:'line'
            },
            {
                cm: '中文姓名',
                type: 'input',
                dm: 'name',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '英文姓名',
                type: 'input',
                dm: 'givenname',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '性别',
                type: 'select',
                dm: 'gender',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '出生日期',
                type: 'datePicker',
                dm: 'birthday',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '国家地区',
                type: 'select',
                dm: 'nationality',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '证件种类',
                type: 'select',
                dm: 'passportType',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '证件号码',
                type: 'input',
                dm: 'passportno',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '停留事由',
                type: 'input',
                dm: 'stopmatter',
            },
            {
                cm: '手机号码',
                type: 'input',
                dm: 'phone',
                hc_con:'2'
            },
            {
                cm: '数据来源',
                type: 'input',
                dm: 'datasources_desc',
                hc_con:'1'
            },
            {
                title:'走访信息',
                type:'line'
            },
            {
                cm: '下发类别',
                type: 'select',
                dm: 'datatype',
                dis: true
            },
            {
                cm: '住宿地址',
                type: 'input',
                dm: 'address',
                dis: true,
            },
            {
                cm: '走访状态',
                type: 'radio',
                dm: 'backstatus',
                dis:isE == '0'?true : false
            },
            {
                cm: '备注',
                type: 'joinInput',
                dm: 'remarks',
                max:160,
                dis:isE == '0'?true : false
            },
            {
                title:'数据归属',
                type:'line'
            },
            {
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
                dis: true
            },
            {
                cm: '所属派出所',
                type: 'select',
                dm: 'policestation',
                dis: true
            },
            {
                cm: '所属责任区',
                type: 'select',
                dm: 'turnoutarea',
                dis:true
            },
        ]
        resolve(zxhc.editcontent)
    })
}
//地址排查 处理弹窗
function editShow_DZ() {
    return new Promise((resolve) => {
        dzxspc.editcontent = [
            {
                title:'排查信息',
                type:'line'
            },
            {
                cm: '详细地址',
                type: 'input',
                dm: 'address',
                dis: true
            },
            {
                cm: '住宿人数',
                type: 'input',
                dm: 'live_number',
                dis: true
            },
            
            {
                title:'数据基础信息',
                type:'line'
            },
            {
                cm: '采集人',
                type: 'inputNumber',
                dm: 'create_userid',
                dis: true
            },
            {
                cm: '数据来源',
                type: 'input',
                dm: 'datasources_desc',
                dis: true,
            },
            {
                cm: '标题',
                type: 'input',
                dm: 'title',
                dis: true
            },
            {
                cm: '采集备注',
                type:'textarea',
                dm: 'remarks',
                max:160,
                dis:true
            },
            {
                title:'数据归属',
                type:'line'
            },
            {
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
                dis: true
            },
            {
                cm: '所属派出所',
                type: 'select',
                dm: 'policestation',
                dis: true
            },
            {
                cm: '所属责任区',
                type: 'select',
                dm: 'turnoutarea',
                dis:true
            },
            {
                title:'走访结果',
                type:'line'
            },
            {
                cm: '走访信息',
                type: 'radio',
                dm: 'backstatus',
            },
            {
                type:'cusform',
                dm:"userInforList",
                label:[
                    {
                        cm:'境外人员证件号码',
                        type:'input',
                        dm:'passportno'
                    },
                    {
                        cm:'境外人员国家地区',
                        type:'select',
                        dm:'nationality'
                    },
                    {
                        cm:'手机号码',
                        type:'input',
                        dm:'phone'
                    },
                    {
                        cm:'图片',
                        type:'photo'
                    }
                ]
            },
            {
                cm: '走访备注',
                type: 'joinInput',
                dm: 'address_back_remarks',
            },
        ]
        resolve(dzxspc.editcontent)
    })
}
// 核查走访内联弹窗内容
function innerDia(page){
    return new Promise((resolve) => {
        if(page == '1'){
            zxhc.innerDiaCon = [
                {
                    cm: '所属分局',
                    type: 'select',
                    dm: 'suboffice',
                },
                {
                    cm: '所属派出所',
                    type: 'select',
                    dm: 'policestation',  
                },
                {
                    cm: '所属责任区',
                    type: 'select',
                    dm: 'turnoutarea',
                },
            ]
        }else if(page=='2'||page=='5'){
            zxhc.innerDiaCon = [
                {
                    cm: '所属派出所',
                    type: 'select',
                    dm: 'policestation',  
                },
                {
                    cm: '所属责任区',
                    type: 'select',
                    dm: 'turnoutarea',
                },
            ]
        }else if(page=='3'){
            zxhc.innerDiaCon = [
                {
                    cm: '所属责任区',
                    type: 'select',
                    dm: 'turnoutarea',
                },
            ]
        }
        
        resolve(zxhc.innerDiaCon)
    })
}
function innerSbDia(data){
    return new Promise((resolve) => {
        zxhc.innerDiaCon=[];
        if(!data.suboffice){
            zxhc.innerDiaCon.push({
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
            })
        }
        if(!data.policestation){
            zxhc.innerDiaCon.push({
                cm: '所属派出所',
                type: 'select',
                dm: 'policestation',  
            })
        }
        if(!data.turnoutarea){
            zxhc.innerDiaCon.push({
                cm: '所属责任区',
                type: 'select',
                dm: 'turnoutarea',
            })
        }
        resolve(zxhc.innerDiaCon)
    })
}
function innerBtn(data,page,datatype,backstatus,statusName,dzpc){
    return new Promise((resolve) => {
        if(data == '1'){//已走访 可修改
            if(page=='1'){//市局已处理 只能下发
                zxhc.dbBtn = [
                    {
                        "button_name": "下发",
                        "serial": "201",
                        "button_type": "singXf",
                        "type": "primary",
                    },
                ]
            }else if(page=='3'){//派出所已处理 只能上报
                zxhc.dbBtn = [
                    {
                        "button_name": "上报",
                        "serial": "201",
                        "button_type": "singSb",
                        "type": "primary",
                    },
                ]
            }else{
                zxhc.dbBtn = []
            }
        }else if(data == '2'){//未走访
            if(page=='1'){//市局未处理
                if((datatype == '1'||datatype == '3'||datatype == '4'||datatype == '5')){//下发状态是专项核查系列 不要回退按钮
                    zxhc.dbBtn = [
                        {
                            "button_name": "下发",
                            "serial": "201",
                            "button_type": "singXf",
                            "type": "primary",
                        },
                    ]
                }else{
                    zxhc.dbBtn = [
                        {
                            "button_name": "回退",
                            "serial": "201",
                            "button_type": "singback",
                            "type": "primary",
                        },
                        {
                            "button_name": "下发",
                            "serial": "201",
                            "button_type": "singXf",
                            "type": "primary",
                        },
                    ]
                }
            }else if(page == '3'){//派出所未处理
                if(statusName == '派出所已下发' || dzpc){
                    zxhc.dbBtn = [
                        {
                            "button_name": "上报",
                            "serial": "201",
                            "button_type": "singSb",
                            "type": "primary",
                        },
                    ]
                }else{
                    zxhc.dbBtn = [
                        {
                            "button_name": "上报",
                            "serial": "201",
                            "button_type": "singSb",
                            "type": "primary",
                        },
                        {
                            "button_name": "下发",
                            "serial": "201",
                            "button_type": "singXf",
                            "type": "primary",
                        },
                    ]
                }
            }else{
                zxhc.dbBtn = [
                    {
                        "button_name": "上报",
                        "serial": "201",
                        "button_type": "singSb",
                        "type": "primary",
                    },
                    {
                        "button_name": "下发",
                        "serial": "201",
                        "button_type": "singXf",
                        "type": "primary",
                    },
                ]
            }
        }
        
        resolve(zxhc.dbBtn)
    })
}
//责任区管理
function handShow(jb) {
    return new Promise((resolve) => {
        zrqzf.clDia = [
            {
                title:'基本信息',
                type:'line'
            },
            {
                cm: '中文姓名',
                type: 'input',
                dm: 'name',
                dis: jb == "3" ? true : false
            },
            {
                cm: '英文姓名',
                type: 'input',
                dm: 'givenname',
                dis: jb == "3" ? true : false
            },
            {
                cm: '性别',
                type: 'select',
                dm: 'gender',
                dis: jb == "3" ? true : false
            },
            {
                cm: '出生日期',
                type: 'datePicker',
                dm: 'birthday',
                dis: jb == "3" ? true : false
            },
            {
                cm: '国家地区',
                type: 'select',
                dm: 'nationality',
                dis: jb == "3" ? true : false
            },
            {
                cm: '证件种类',
                type: 'select',
                dm: 'passportType',

            },
            {
                cm: '证件号码',
                type: 'input',
                dm: 'passportno',

            },
            {
                cm: '手机号码',
                type: 'input',
                dm: 'phone',
            },
            {
                cm: '停留事由',
                type: 'input',
                dm: 'stopmatter',
            },
            {
                title:'走访信息',
                type:'line'
            },
            {
                cm: '下发类别',
                type: 'select',
                dm: 'datatype',
                dis: true
            },
            {
                cm: '住宿地址',
                type: 'input',
                dm: 'address',
                dis: true,
            },
            {
                cm: '走访状态',
                type: 'radio',
                dm: 'backstatus'
            },
            {
                cm: '备注',
                type: 'input',
                dm: 'remarks',
                max:160,
            },
            {
                title:'数据归属',
                type:'line'
            },
            {
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
                dis: true
            },
            {
                cm: '所属派出所',
                type: 'select',
                dm: 'policestation',
                dis: true
            },
            // {
            //     cm:'所属责任区',
            //     type:'select',
            //     dm:'policestation',
            //     dis:jb=="3"?true:false
            // },         
            {
                cm: '接收人',
                type: 'input',
                dm: 'turnoutarea_receive_user',
                dis: true
            },
            {
                cm: '接收责任区',
                type: 'input',
                dm: 'turnoutarea_desc',
                dis: true
            },
            {
                cm: '接收时间',
                type: 'input',
                dm: 'turnoutarea_receivedate',
                dis: true
            },
        ]
        resolve(zrqzf.clDia)
    })
}
//专项核查
function handCL(){
    return new Promise((resolve) => {
        zxhcgl.cl = [
            {
                mRow:24,
                labelWid:'100px',
            },
            {
                title:'编辑信息',
                type:'line'
            },
            {
                cm: '标题',
                type: 'input',
                dm: 'title', 
                col:8 
            },
            {
                cm: '英文姓名',
                type: 'input',
                dm: 'givenname', 
                col:8 
            },
            {
                cm: '性别',
                type: 'select',
                dm: 'gender',
                col:8 
            },
            {
                cm: '出生日期',
                type: 'datePicker',
                dm: 'birthday',
                col:8 
            },
            {
                cm: '国家地区',
                type: 'select',
                dm: 'nationality',
                col:8 
            },
            {
                cm: '证件种类',
                type: 'select',
                dm: 'passportType',
                col:8 
            },
            {
                cm: '证件号码',
                type: 'input',
                dm: 'passportno',
                col:8 
            },
            {
                cm: '签证种类',
                type: 'select',
                dm: 'visaType',
                col:8 
            },
            {
                cm: '签证号码',
                type: 'input',
                dm: 'visano',
                col:8 
            },
            {
                cm: '住宿地址',
                type: 'input',
                dm: 'address',
                col:16
            },
            {
                cm: '出入境时间',
                type: 'datePicker',
                dm: 'entry_exit_time',
                col:8 
            },
            {
                cm: '出入境状态',
                type: 'select',
                dm: 'entry_exit_status',
                optype:true,
                col:8 
            },
            {
                title:'数据归属',
                type:'line'
            },
            {
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
                dis:true,
                col:16
            },
            {
                title:'出入境记录',
                type:'line'
            },
            {
                cm: '签证类型',
                type: 'input',
                dm: 'visaType_desc',
                dis:true,
                col:8
            },
            {
                cm: '出入口岸',
                type: 'input',
                dm: 'ioPort_desc',
                dis:true,
                col:8
            },           
            {
                cm: '前往地',
                type: 'input',
                dm: 'destination_desc',
                dis:true,
                col:8
            },
            {
                cm: '发证机关',
                type: 'input',
                dm: 'grantCertOrg_desc',
                dis:true,
                col:8
            },    
            {
                cm: '交通工具',
                type: 'input',
                dm: 'trafficTool',
                dis:true,
                col:8
            },    
            {
                cm: '交通方式',
                type: 'input',
                dm: 'trafficMode_desc',
                dis:true,
                col:8
            },       
            {
                cm: '人员类别',
                type: 'input',
                dm: 'personType_desc',
                dis:true,
                col:8
            },    
            {
                cm: '出入境日期及时间',
                type: 'input',
                dm: 'ioDateTime',
                dis:true,
                col:8
            },    
            {
                cm: '出入境事由',
                type: 'input',
                dm: 'outReason_desc',
                dis:true,
                col:8
            },    
            {
                cm: '通道号',
                type: 'input',
                dm: 'channelNO',
                dis:true,
                col:8
            },    
            {
                cm: '检查员号码',
                type: 'input',
                dm: 'inspectorID',
                dis:true,
                col:8
            },    
            {
                cm: '旅游团号',
                type: 'input',
                dm: 'tourGroupNO',
                dis:true,
                col:8
            },  
            {
                cm: '证件种类',
                type: 'input',
                dm: 'certificateType_desc',
                dis:true,
                col:8
            },       
            {
                title:'标准走访信息',
                type:'line'
            },
            {
                cm: '下发类别',
                type: 'select',
                dm: 'datatype', 
                dis:true,
                col:8           
            },
            {
                cm: '走访状态',
                type: 'radio',
                dm: 'backstatus',
                dis:true,
                col:16
            },
            {
                cm: '备注',
                type: 'input',
                dm: 'remarks',
                dis:true,
                max:160,
                col:8
            },
            // {
            //     cm: '住宿地址',
            //     type: 'input',
            //     dm: 'address',
            //     dis:true,
            //     col:16           
            // }, 
        ]  
        resolve(zxhcgl.cl)
    })
}
function offhandCL(){
    return new Promise((resolve) => {
        offgl.cl = [
            {
                mRow:24,
                labelWid:'100px',
            },
            {
                title:'编辑信息',
                type:'line'
            },
            // {
            //     cm: '标题',
            //     type: 'input',
            //     dm: 'title', 
            //     col:8 
            // },
            // {
            //     cm: '英文姓名',
            //     type: 'input',
            //     dm: 'givenname', 
            //     col:8 
            // },
            // {
            //     cm: '性别',
            //     type: 'select',
            //     dm: 'gender',
            //     col:8 
            // },
            // {
            //     cm: '出生日期',
            //     type: 'datePicker',
            //     dm: 'birthday',
            //     col:8 
            // },
            {
                cm: '国家地区',
                type: 'select',
                dm: 'nationality',
                col:8 
            },
            {
                cm: '证件种类',
                type: 'select',
                dm: 'passportType',
                col:8 
            },
            {
                cm: '证件号码',
                type: 'input',
                dm: 'passportno',
                col:8 
            },
            // {
            //     cm: '签证种类',
            //     type: 'select',
            //     dm: 'visaType',
            //     col:8 
            // },
            // {
            //     cm: '签证号码',
            //     type: 'input',
            //     dm: 'visano',
            //     col:8 
            // },
            {
                cm: '住宿地址',
                type: 'input',
                dm: 'address',
                col:16
            },
            // {
            //     cm: '出入境时间',
            //     type: 'datePicker',
            //     dm: 'entry_exit_time',
            //     col:8 
            // },
            // {
            //     cm: '出入境状态',
            //     type: 'select',
            //     dm: 'entry_exit_status',
            //     optype:true,
            //     col:8 
            // },
            {
                title:'数据归属',
                type:'line'
            },
            {
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
                dis:true,
                col:16
            },
            {
                title:'出入境记录',
                type:'line'
            },
            {
                cm: '签证类型',
                type: 'input',
                dm: 'visaType_desc',
                dis:true,
                col:8
            },
            {
                cm: '出入口岸',
                type: 'input',
                dm: 'ioPort_desc',
                dis:true,
                col:8
            },           
            {
                cm: '前往地',
                type: 'input',
                dm: 'destination_desc',
                dis:true,
                col:8
            },
            {
                cm: '发证机关',
                type: 'input',
                dm: 'grantCertOrg_desc',
                dis:true,
                col:8
            },    
            {
                cm: '交通工具',
                type: 'input',
                dm: 'trafficTool',
                dis:true,
                col:8
            },    
            {
                cm: '交通方式',
                type: 'input',
                dm: 'trafficMode_desc',
                dis:true,
                col:8
            },       
            {
                cm: '人员类别',
                type: 'input',
                dm: 'personType_desc',
                dis:true,
                col:8
            },    
            {
                cm: '出入境日期及时间',
                type: 'input',
                dm: 'ioDateTime',
                dis:true,
                col:8
            },    
            {
                cm: '出入境事由',
                type: 'input',
                dm: 'outReason_desc',
                dis:true,
                col:8
            },    
            {
                cm: '通道号',
                type: 'input',
                dm: 'channelNO',
                dis:true,
                col:8
            },    
            {
                cm: '检查员号码',
                type: 'input',
                dm: 'inspectorID',
                dis:true,
                col:8
            },    
            {
                cm: '旅游团号',
                type: 'input',
                dm: 'tourGroupNO',
                dis:true,
                col:8
            },  
            {
                cm: '证件种类',
                type: 'input',
                dm: 'certificateType_desc',
                dis:true,
                col:8
            },
            {
                title:'标准走访信息',
                type:'line'
            },
            {
                cm: '下发类别',
                type: 'select',
                dm: 'datatype', 
                dis:true,
                col:8           
            },
            {
                cm: '走访状态',
                type: 'radio',
                dm: 'backstatus',
                dis:true,
                col:16
            },
            {
                cm: '备注',
                type: 'input',
                dm: 'remarks',
                dis:true,
                max:160,
                col:8
            },
            // {
            //     cm: '住宿地址',
            //     type: 'input',
            //     dm: 'address',
            //     dis:true,
            //     col:16           
            // },  
                  
        ]  
        resolve(offgl.cl)
    })
}
function jzzdhandCL(){
    return new Promise((resolve) => {
        jzzdhc.cl = [
            {
                mRow:24,
                labelWid:'100px',
            },
            {
                title:'编辑信息',
                type:'line'
            },
            // {
            //     cm: '标题',
            //     type: 'input',
            //     dm: 'title', 
            //     col:8 
            // },
            {
                cm: '英文姓名',
                type: 'input',
                dm: 'givenname', 
                col:8 
            },
            {
                cm: '中文姓名',
                type: 'input',
                dm: 'name', 
                col:8 
            },
            {
                cm: '性别',
                type: 'select',
                dm: 'gender',
                col:8 
            },
            {
                cm: '出生日期',
                type: 'datePicker',
                dm: 'birthday',
                col:8 
            },
            {
                cm: '国家地区',
                type: 'select',
                dm: 'nationality',
                col:8 
            },
            // {
            //     cm: '证件种类',
            //     type: 'select',
            //     dm: 'passportType',
            //     col:8 
            // },
            {
                cm: '证件号码',
                type: 'input',
                dm: 'passportno',
                col:8 
            },
            // {
            //     cm: '签证种类',
            //     type: 'select',
            //     dm: 'visaType',
            //     col:8 
            // },
            // {
            //     cm: '签证号码',
            //     type: 'input',
            //     dm: 'visano',
            //     col:8 
            // },
            {
                cm: '在苏地址',
                type: 'input',
                dm: 'address',
                col:16
            },
            // {
            //     cm: '出入境时间',
            //     type: 'datePicker',
            //     dm: 'entry_exit_time',
            //     col:8 
            // },
            // {
            //     cm: '出入境状态',
            //     type: 'select',
            //     dm: 'entry_exit_status',
            //     optype:true,
            //     col:8 
            // },
            {
                title:'数据归属',
                type:'line'
            },
            {
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
                dis:true,
                col:16
            },
            {
                title:'标准走访信息',
                type:'line'
            },
            {
                cm: '下发类别',
                type: 'select',
                dm: 'datatype', 
                dis:true,
                col:8           
            },
            {
                cm: '走访状态',
                type: 'radio',
                dm: 'backstatus',
                dis:true,
                col:16
            },
            {
                cm: '备注',
                type: 'input',
                dm: 'remarks',
                dis:true,
                max:160,
                col:8
            },
            // {
            //     cm: '在苏地址',
            //     type: 'input',
            //     dm: 'address',
            //     dis:true,
            //     col:16           
            // },        
        ]  
        resolve(jzzdhc.cl)
    })
}
function zxhcLbbtn(dataType,page){
    return new Promise((resolve)=>{
        if(dataType == '3'){//专项核查
            if(page == '0'){//未下发
                zxhcgl.lbBtn=[
                    {
                        "button_name": "处理",
                        "button_type": 'edit',
                        "serial": "201",
                    },
                    {
                        "button_name": "归档",
                        "button_type": 'gd',
                        "serial": "201",
                    },
                    {
                        "button_name": "删除",
                        "button_type": 'delete',
                        "serial": "201",
                    },
                ]
            }else if(page == '1'){//未下发
                zxhcgl.lbBtn=[]
            }else if(page == '2'){//已走访
                zxhcgl.lbBtn=[
                    {
                        "button_name": "归档",
                        "button_type": 'gd',
                        "serial": "201",
                    },
                ]
            }else if(page == '3'){//已归档
                zxhcgl.lbBtn=[
                    {
                        "button_name": "删除",
                        "button_type": 'delete',
                        "serial": "201",
                    },
                ]
            }
            resolve(zxhcgl.lbBtn)
        }else if(dataType == '4'){//144
            if(page == '0'){//未下发
                offgl.lbBtn=[
                    {
                        "button_name": "处理",
                        "button_type": 'edit',
                        "serial": "201",
                    },
                    {
                        "button_name": "归档",
                        "button_type": 'gd',
                        "serial": "201",
                    },
                    {
                        "button_name": "删除",
                        "button_type": 'delete',
                        "serial": "201",
                    },
                ]
            }else if(page == '1'){//未下发
                offgl.lbBtn=[]
            }else if(page == '2'){//已走访
                offgl.lbBtn=[
                    {
                        "button_name": "归档",
                        "button_type": 'gd',
                        "serial": "201",
                    },
                ]
            }else if(page == '3'){//已归档
                offgl.lbBtn=[
                    {
                        "button_name": "删除",
                        "button_type": 'delete',
                        "serial": "201",
                    },
                ]
            }
            resolve(offgl.lbBtn)
        }else if(dataType == '5'){//记者
            if(page == '0'){//未下发
                jzzdhc.lbBtn=[
                    {
                        "button_name": "处理",
                        "button_type": 'edit',
                        "serial": "201",
                    },
                    {
                        "button_name": "归档",
                        "button_type": 'gd',
                        "serial": "201",
                    },
                    {
                        "button_name": "删除",
                        "button_type": 'delete',
                        "serial": "201",
                    },
                ]
            }else if(page == '1'){//未下发
                jzzdhc.lbBtn=[]
            }else if(page == '2'){//已走访
                jzzdhc.lbBtn=[
                    {
                        "button_name": "归档",
                        "button_type": 'gd',
                        "serial": "201",
                    },
                ]
            }else if(page == '3'){//已归档
                jzzdhc.lbBtn=[
                    {
                        "button_name": "删除",
                        "button_type": 'delete',
                        "serial": "201",
                    },
                ]
            }
            resolve(jzzdhc.lbBtn)
        }
    })
}
export default {
    zxhc,
    wblztx,
    dzxspc,
    zrqzf,
    zxhcgl,
    offgl,
    jzzdhc,
    jdtj,
    lbTabShow,
    lbTabShow_DZ,
    editShow,
    editShow_DZ,
    handShow,
    innerDia,
    innerBtn,
    innerSbDia,
    handCL,
    offhandCL,
    jzzdhandCL,
    zxhcLbbtn
}