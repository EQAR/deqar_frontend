const nav = {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      }
    },
    {
      title: true,
      name: 'My Data',
      wrapper: {
        element: 'span',
        attributes: {}
      },
      class: ''
    },
    {
      name: 'My Profile',
      url: '/my-profile',
      icon: 'fa fa-user-o'
    }, {
      name: 'My Agencies',
      url: '/my-agency',
      icon: 'fa fa-home'
    },
    {
      title: true,
      name: 'Menu',
      wrapper: {
        element: 'span',
        attributes: {}
      },
    },
    {
      name: 'Submit Report',
      url: '/report-data',
      icon: 'icon-doc',
      children: [
        {
          name: 'Report Form',
          url: '/report-form',
          icon: 'icon-doc'
        },
        {
          name: 'Upload CSV',
          url: '/upload-csv',
          icon: 'icon-cloud-upload'
        }
      ]
    },
    {
      name: 'Reference Data',
      icon: 'icon-book-open',
      children: [
        {
          name: 'Agencies',
          url: '#',
          icon: 'icon-home'
        },
        {
          name: 'Institutions',
          url: '/institutions',
          icon: 'icon-graduation'
        },
        {
          name: 'Countries',
          url: '#',
          icon: 'icon-globe-alt'
        }
      ]
    },
    {
      name: 'Alerts and flags',
      url: '#',
      icon: 'icon-flag'
    },
    {
      name: 'Statistics',
      url: '#',
      icon: 'icon-chart'
    }
  ]
};

export default nav;