const nav = {
  items: [
    {
      name: 'My Data',
      icon: 'fa fa-database',
      url: '/my-',
      children: [
        {
          name: 'My Reports',
          url: '/my-reports',
          icon: 'icon-docs',
        }, {
          name: 'My Agency',
          url: '/my-agency',
          icon: 'icon-home',
        }, {
          name: 'My ESG Activities',
          url: '/my-activities',
          icon: 'icon-tag'
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
          url: '/reference/agencies',
          icon: 'icon-home'
        }, {
          name: 'Reports',
          url: '/reference/reports',
          icon: 'icon-doc'
        }, {
          name: 'Institutions',
          url: '/reference/institutions',
          icon: 'icon-graduation'
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
      icon: 'icon-info',
      attributes: {target: '_blank', rel: "noreferrer noopener", active: false}
    }
  ]
};

export default nav;
