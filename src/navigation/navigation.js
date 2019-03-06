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
      url: '#',
      icon: 'fa fa-home'
    }, {
      name: 'My Reports',
      url: '/my-reports',
      icon: 'icon-docs',
    }, {
      name: 'Alerts and flags',
      url: '#',
      icon: 'icon-flag'
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
      name: 'Submit Reports',
      icon: 'icon-doc',
      children: [
        {
          name: 'Manual Submission',
          url: '/submit-report',
          icon: 'fa fa-file-text-o'
        }, {
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
          name: 'Reports',
          url: '/reports',
          icon: 'icon-doc'
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
      name: 'Statistics',
      url: '#',
      icon: 'icon-chart'
    }
  ]
};

export default nav;