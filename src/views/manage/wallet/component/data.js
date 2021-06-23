export default {
  editKeys: [],
  isMutiple: false,
  showColumnFilter: true,
  columns: [
    {
      props: {
        label: '姓名',
        width: '180',
        align: 'center',
      },
      field: 'name',
      slot: true,
    },
    {
      props: {
        label: '日期',
        width: '180',
        align: 'center',

      },
      field: 'date',
    },
    {
      props: {
        label: '地址',
        align: 'center',
      },
      field: 'address',
    },
    {
      props: {
        label: '操作',
        align: 'center',
      },
      field: 'action',
      buttons: [
        {
          props: {
            type: 'primary',
          },
          key: 'edit',
          label: '编辑',
        },
        {
          props: {
            type: 'info',
          },
          key: 'view',
          label: '查看',
        },
        {
          props: {
            type: 'danger',
          },
          key: 'delete',
          label: '删除',
        },
      ],
    },
  ],
  pagination: {
    layout: 'total, sizes, prev, pager, next, jumper',
    pageSizes: [15, 30, 50, 100],
  },
}
