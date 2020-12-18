const gtsjcx = {
  cx: [
    {
      cm: '姓名',
      type: 'input',
      dm: 'xm',
    },
    {
      cm: '性别',
      type: 'select',
      dm: 'xb',
    },
    {
      cm: '国家地区',
      type: 'select',
      dm: 'gjdq',
    },
    {
      cm: '证件号码',
      type: 'input',
      dm: 'zjhm',
    },
    {
      cm: '出生日期',
      type: 'doubleDate',
      dm: 'csTime',
      children: [
        {
          cm: '开始时间',
          type: 'date',
          dm: 'birthstart',
          dateType:'dateJ'
        },
        {
          cm: '结束时间',
          type: 'date',
          dm: 'birthend',
          dateType:'dateJ'
        },
      ],
    },
    {
      cm: '签证种类',
      type: 'select',
      dm: 'visatype',
    },
    {
      cm: '出发站',
      type: 'input',
      dm: 'cfzmc',
    },
    {
      cm: '发车时间段',
      type: 'double',
      dm: 'tlTime',
      children: [
        {
          cm: '开始时间',
          type: 'date',
          dm: 'fcsjstart'
        },
        {
          cm: '结束时间',
          type: 'date',
          dm: 'fcsjend'
        },
      ],
    },
    {
      cm: '到达站',
      type: 'input',
      dm: 'ddzmc',
    },
    {
      cm: '乘车次数',
      type: 'ageDouble',
      dm: 'age',
      children: [
          {
              cm: '开始次数',
              type: 'number',
              dm: 'cccsstart'
          },
          {
              cm: '结束次数',
              type: 'number',
              dm: 'cccsend'
          },
      ],
    },
    {
      cm: '关联查询',
      type: 'button',
      dm: 'gtglcx',
      multiple:true,
    },
    {
      cm:'',
      mc: '是否有效数据',
      type: 'checkbox',
      dm: 'sfglcrj',
      trueLabel:'1',
      falseLabel:'0',
      check:true,
      col:18
    },
    {
      cm: '常住类别',
      type: 'select',
      dm: 'resident_type',
      optype:true,
      disdm:true,
      distype:'cz'
    },
    {
      cm: '停留有效期至',
      type: 'datePicker',
      dm: 'tlyxqz',
      distype:'cz'
    },
    {
      cm: '是否有效人员',
      type: 'select',
      dm: 'sfyxry',
      optype:true,
      distype:'cz'
    },
    {
      cm: '住宿时间段',
      type: 'double',
      dm: 'tlTime',
      distype:'lz',
      children: [
        {
          cm: '开始时间',
          type: 'date',
          dm: 'zssjstart'
        },
        {
          cm: '结束时间',
          type: 'date',
          dm: 'zssjend'
        },
      ],
    },
    {
      cm: '投宿于',
      type: 'select',
      dm: 'tsy',
      optype:true,
      distype:'lz'
    },
    {
      cm: '',
      type: '',
      dm: '',
      distype:'lz'
    },
  ],
  cxCheck:[
    // {
    //   mc: '是否有效数据',
    //   type: 'checkbox',
    //   dm: 'sfglcrj',
    //   trueLabel:'1',
    //   falseLabel:'0',
    //   check:true,
    //   col:12
    // },
  ],
  cxButton:[
    // {
    //   cm: '关联查询',
    //   type: 'button',
    //   dm: 'gtglcx',
    //   multiple:true,
    // },
  ],
  facx: [],
  lb: [
    {
      cm:'订票姓名',
      dm:'gt_name'
    },
    {
      cm:'性别',
      dm:'crj_gender_desc'
    },
    {
      cm: '出入境记录姓名',
      dm: 'crj_name'
    },
    {
      cm: '国家地区',
      dm: 'crj_nationality_desc',
    },  
    {
      cm: '证件号码',
      dm: 'gt_passportno',
    },
    {
      cm: '签证种类',
      dm: 'crj_visa_type_desc',
    },
    {
      cm: '车次编号',
      dm: 'gt_train_number',
    },
    {
      cm: '车厢编号',
      dm: 'gt_car_number',
    },
    {
      cm: '座位编号',
      dm: 'gt_seat_number',
    },
    {
      cm: '发车时间',
      dm: 'departure_date_gt',
    },
    {
      cm: '出发站',
      dm: 'gt_station_name',
    },
    {
      cm: '到达站',
      dm: 'gt_arrival_station_name',
    },
    {
      cm: '常住次数',
      dm: 'czcs',
      textLink:true
    },
    {
      cm: '临住次数',
      dm: 'lzcs',
      textLink:true
    },
    {
      cm: '处理类型',
      dm: 'clry',
    }
  ],
  lbBtn: [],
  lbTabEdit:[
    {
        "mc": '省厅下发',
        "dm": '0',
    },
    {
        "mc": '核查走访',
        "dm": '1',
    },
    {
        "mc": '实有常住',
        "dm": '',
    },
  ],
  lzxxTableEdit:[
    {
      cm:'英文姓名',
      dm:'ywxm'
    },
    {
      cm: '中文姓名',
      dm: 'zwxm'
    },
    {
      cm: '性别',
      dm: 'xb_desc'
    },
    {
      cm: '出生日期',
      dm: 'csrq',
    },
    {
      cm: '国家地区',
      dm: 'gjdq_desc',
    },  
    {
      cm: '证件号码',
      dm: 'zjhm',
    },
    {
      cm: '证件种类',
      dm: 'zjzl_desc',
    },
    {
      cm: '所属分局',
      dm: 'bggxdw_desc',
    },
    {
      cm: '住宿地址',
      dm: 'lsdwdz',
    },
    {
      cm: '住宿日期',
      dm: 'zsrq_lz',
    },
  ],
  czxxTableEdit:[
    {
      cm:'人员编号', 
      dm:'personnel_id'
    },
    {
      cm:'英文姓名',
      dm:'ename'
    },
    {
      cm: '中文姓名',
      dm: 'name'
    },
    {
      cm: '性别',
      dm: 'gender_desc'
    },
    {
      cm: '出生日期',
      dm: 'birthday',
      subS:true,//列表数据截取
    },
    {
      cm: '国家地区',
      dm: 'nationality_desc',
    },  
    {
      cm: '证件号码',
      dm: 'paperno',
    },
    {
      cm: '证件种类',
      dm: 'paper_type_desc',
    },
    {
      cm: '常住类别',
      dm: 'resident_type_desc',
    },
    {
      cm: '停留有效期',
      dm: 'localize_period',
      subS:true,//列表数据截取
    },
  ],
  inLbBtn:[
    {
      "button_name": "详情",
      "button_type": 'ck',
    },
  ],
}
const gtsjrgcl = {
  cx: [
    {
      cm: '国家地区',
      type: 'select',
      dm: 'gjdq',
    },
    {
      cm: '证件号码',
      type: 'input',
      dm: 'zjhm',
    },
    {
      cm: '处理时间段',
      type: 'double',
      dm: 'csTime',
      children: [
        {
          cm: '开始时间',
          type: 'date',
          dm: 'clsjstart',
        },
        {
          cm: '结束时间',
          type: 'date',
          dm: 'clsjend',
        },
      ],
    },
    {
      cm: '处理状态',
      type: 'select',
      dm: 'cljg',
      optype:true,
    },
    {
      cm: '车次号',
      type: 'input',
      dm: 'ccbh',
    },
    {
      cm: '处理人',
      type: 'input',
      dm: 'clry',
    },
  ],
  cxCheck:[],
  facx: [],
  lbTab:[
    {
        "mc": '未接收',
        "dm": '0',
    },
    {
        "mc": '已接收',
        "dm": '1',
    },
    {
        "mc": '已处理',
        "dm": '2',
    },
  ],
  lb1: [
    {
      cm:'姓名',
      dm:'gt_name'
    },
    {
      cm: '证件号码',
      dm: 'gt_passportno',
    },
    {
      cm: '出发站名称',
      dm: 'gt_station_name',
    },
    {
      cm: '到达站名称',
      dm: 'gt_arrival_station_name',
    },
    {
      cm: '发车日期',
      dm: 'gt_departure_date',
    },
  ],
  lb3:[
    {
      cm:'姓名',
      dm:'gt_name'
    },
    {
      cm: '证件号码',
      dm: 'gt_passportno',
    },
    {
      cm: '出发站名称',
      dm: 'gt_station_name',
    },
    {
      cm: '到达站名称',
      dm: 'gt_arrival_station_name',
    },
    {
      cm: '发车日期',
      dm: 'gt_departure_date',
    },
    {
      cm: '车次号',
      dm: 'gt_train_number',
    },
    {
      cm: '处理状态',
      dm: 'cljg',
    },
    {
      cm: '处理人',
      dm: 'clry',
    },
    {
      cm: '处理时间',
      dm: 'clsj',
    },
  ],
  lbBtn: [
    {
      "button_name": "详情",
      "button_type": 'detail',
    },
  ],
  jsDia:[
    {
      cm: '接收条数',
      type: 'inputNumber',
      dm: 'jsts',
    },
  ],
  clDia:[
    {
      title:'高铁信息',
      type:'line',
      col:24
    },
    {
      cm: '姓名',
      type: 'input',
      dm: 'gt_name',
    },
    {
      cm: '证件号码',
      type: 'joinBtn',
      dm: 'gt_passportno',
      btnmc:'核查'
    },
    {
      cm: '发车日期',
      type: 'datePicker',
      dm: 'gt_departure_date',
      dis:true,
    },
    {
      cm: '出发站名称',
      type: 'select',
      dm: 'gt_station_name',
      dis:true,
    },
    {
      cm: '到达站名称',
      type: 'select',
      dm: 'gt_arrival_station_name',
      dis:true,
    },
    {
      cm: '是否有效',
      type: 'select',
      dm: 'gt_valid',
      optype:true,
      dis:true,
    },
    {
      cm: '车次编号',
      type: 'input',
      dm: 'gt_train_number',
      dis:true,
    },
    {
      cm: '车厢编号',
      type: 'input',
      dm: 'gt_car_number',
      dis:true,
    },
    {
      cm: '座位编号',
      type: 'input',
      dm: 'gt_seat_numbe',
      dis:true,
    },
  ],
  inLb:[
    {
      cm: '姓名',
      dm: 'crj_name',
      button:true
    },
    {
      cm: '国家地区',
      dm: 'crj_nationality_desc',
    },
  ],
  inXzDia:[
    {
      cm: '姓名',
      type: 'input',
      dm: 'crj_name',
    },
    {
      cm: '姓名拼音',
      type: 'input',
      dm: 'crj_namepy',
    },
    {
      cm: '国籍',
      type: 'select',
      dm: 'crj_nationality',
    },
    {
      cm: '性别',
      type: 'select',
      dm: 'crj_gender',
      // dis:true,
    },
    {
      cm: '出生日期',
      type: 'datePicker',
      dm: 'crj_birthday',
    },
    {
      cm: '证件号码',
      type: 'input',
      dm: 'crj_passportno',
    },
    {
      cm: '证件种类',
      type: 'select',
      dm: 'crj_passporttype',
      // dis:true,
    },
    {
      cm: '前往地',
      type: 'input',
      dm: 'crj_destination',//////
      // dis:true,
    },
    {
      cm: '发证日期',
      type: 'datePicker',
      dm: 'crj_grant_cert_date',
      // dis:true,
    },
    {
      cm: '发证审批机关',
      type: 'input',
      dm: 'crj_grant_cert_org',//////
      // dis:true,
    },
    {
      cm: '入库时间',
      type: 'datePicker',
      dm: 'crj_in_time',
      // dis:true,
    },
    {
      cm: '检查员号',
      type: 'input',
      dm: 'crj_inspectorid',
    },
    {
      cm: '出入境日期',
      type: 'datePicker',
      dm: 'crj_io_date',
      // dis:true,
    },
    {
      cm: '出入口岸',
      type: 'select',
      dm: 'crj_io_port',/////
      // dis:true,
    },
    {
      cm: '出入境事由',
      type: 'select',
      dm: 'crj_out_reason',/////
      // dis:true,
    },
    {
      cm: '人员类别',
      type: 'select',
      dm: 'crj_person_type',
      // dis:true,
    },
    {
      cm: '职业',
      type: 'select',
      dm: 'crj_prof_code',
      // dis:true,
    },
    {
      cm: '旅游团号',
      type: 'input',
      dm: 'crj_tour_groupno',
    },
    {
      cm: '交通方式',
      type: 'select',
      dm: 'crj_traffic_mode',/////
      // dis:true,
    },
    {
      cm: '交通工具',
      type: 'input',
      dm: 'crj_traffic_tool',//////
      // dis:true,
    },
    {
      cm: '签证种类',
      type: 'select',
      dm: 'crj_visa_type',
      // dis:true,
    },
  ],
  inPlBtn:[
    {
      "menu_name": "新增",
      "button_type": 2,
      'py':'xz'
    },
  ],
  inLbBtn:[
    {
      "button_name": "编辑",
      "button_type": 'edit',
    }
  ],
  inLbCkBtn:[
    {
      "button_name": "详情",
      "button_type": 'ck',
    }
  ],
}
export default{
  gtsjcx,
  gtsjrgcl
}