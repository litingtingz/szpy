//时间控制管理
const sjkz = {
  cx: [  
        {
            cm: '单位级别',
            type: 'select',
            dm: 'dwjb',
            optype:true
        },
        {
            cm: '业务类别',
            type: 'select',
            dm: 'ywlb'
        },
        {
            cm: '配置类型',
            type: 'select',
            dm: 'czpzlx',
            optype:true
        },
  ],
  facx:[

  ],
  lb: [
      {
          cm: '业务类别',
          dm: 'ywlb_desc'
      },
      {
          cm: '单位级别',
          dm: 'dwjb_desc'
      },
      {
          cm: '配置类型',
          dm: 'czpzlx_desc'
      },
      {
          cm: '规定时间（天）',
          dm: 'gdsj',
      },
      {
          cm: '规定颜色',
          dm: 'gdyssh',
          color:true
      },
      {
          cm: '创建时间',
          dm: 'czsj',
      },
  ],
  lbBtn: [
      {
          "button_name": "编辑",
          "button_type": 'edit',
          "serial": "201",
      },
      {
          "button_name": "删除",
          "button_type": 'delete',
          "serial": "201",
      },
  ], 
  xzLabel:[
    {
      labelWid:'130px'
    },
    {
      cm: '业务类别',
      type: 'select',
      dm: 'ywlb',
    },
    {
      cm: '单位级别',
      type: 'select',
      dm: 'dwjb',
      optype:true,
    },
    {
      cm: '配置类型',
      type: 'select',
      dm: 'czpzlx',
      optype:true,
    },
  ],
  bjLabel:[
    {
      labelWid:'130px'
    },
    {
        cm: '业务类别',
        type: 'select',
        dm: 'ywlb',
      },
      {
        cm: '单位级别',
        type: 'select',
        dm: 'dwjb',
        optype:true,
      },
      {
        cm: '配置类型',
        type: 'select',
        dm: 'czpzlx',
        optype:true,
      },
      {
        cm: '超期时间',
        type: 'inpUnit',
        dm: 'gdsj',
      },
      {
        cm: '超期显示(颜色)',
        type: 'block',
        dm: 'gdyssh',
      },
      {
        cm:'颜色说明',
        type:'textarea',
        dm:'ysshbz'
      }
  ]
}
//自定义国家
const zdygj = {
  cx:[
    {
      cm: '名称',
      type: 'input',
      dm: 'mc'
    },
    {
      cm: '描述',
      type: 'input',
      dm: 'ms'
    },
    // {
    //   cm: '是否有效',
    //   type: 'select',
    //   dm: 'sfyx',
    //   optype:true,
    // },
  ],
  facx:[],
  lbTab: [
      {
          "mc": '已启用',
          "dm": '1',
      },
      {
          "mc": '已停用',
          "dm": '0',
      }
  ],
  lb: [
    {
        cm: '名称',
        dm: 'mc'
    },
    // {
    //     cm: '代码',
    //     dm: 'dm'
    // },
    {
        cm: '描述',
        dm: 'ms'
    },
    // {
    //     cm: '是否有效',
    //     dm: 'sfyx_desc'
    // },
  ],
  gjCount:[
    {
        cm: '名称',
        dm: 'mc'
    },
    {
        cm: '代码',
        dm: 'dm'
    },
  ],
  lbBtn: [
    {
        "button_name": "编辑",
        "button_type": 'edit',
        "serial": "201",
    },
    {
        "button_name": "停用",
        "button_type": "ty",
        "color_type": '1',
        "user_ctrl": '1',
        "serial": "201",
    },
    {
        "button_name": "启用",
        "button_type": "qy",
        "user_ctrl": '0',
        "serial": "201",
    }
  ], 
  gjCBtn:[
    {
      "button_name": "删除",
      "button_type": 'delete',
      "serial": "201",
    },
  ],
  xjLabel:[
    {
      cm: '名称',
      type: 'input',
      dm: 'mc',
    },
    // {
    //   cm: '代码',
    //   type: 'input',
    //   dm: 'dm',
    // },
    {
      cm: '描述',
      type: 'input',
      dm: 'ms',
    },
    {
      cm: '自定义项',
      type: 'custom',
      dm: 'countryList',
    },
  ],
}
export default{
  sjkz,
  zdygj
}