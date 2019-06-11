const nav = {
  items: [
    {
      name: 'My Data',
      icon: 'fa fa-database',
      url: '/my-',
      children: [
        {
          name: 'My Profile',
          url: '/my-profile',
          icon: 'fa fa-user-o'
        }, {
          name: 'My Reports',
          url: '/my-reports',
          icon: 'icon-docs',
        }, {
          name: 'My Agency',
          url: '/my-agency',
          icon: 'icon-home',
        }, {
          name: 'Alerts and flags',
          url: '#',
          icon: 'icon-flag'
        }
      ]
    }, {
      name: 'Submit Reports',
      icon: 'icon-doc',
      url: '/submit-',
      children: [
        {
          name: 'Manual Submission',
          url: '/submit-report',
          icon: 'fa fa-file-text-o'
        }, {
          name: 'Upload CSV',
          url: '/submit-csv',
          icon: 'icon-cloud-upload'
        }
      ]
    },
    {
      name: 'Reference Data',
      icon: 'icon-book-open',
      url: '/reference',
      children: [
        {
          name: 'Agencies',
          url: '#',
          icon: 'icon-home'
        }, {
          name: 'Agency Activities',
          url: '/reference/activities',
          icon: 'fa fa-home'
        }, {
          name: 'Reports',
          url: '/reference/reports',
          icon: 'icon-doc'
        }, {
          name: 'Institutions',
          url: '/reference/institutions',
          icon: 'icon-graduation'
        }, {
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
    }, {
      name: 'Documentation',
      url: 'https://docs.deqar.eu',
      icon: 'icon-question',
      attributes: {target: '_blank', rel: "noreferrer noopener", active: false}
    }
  ]
};

export default nav;
