const navAdmin = {
  items: [
    {
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
    }, {
      name: 'Reference Data',
      icon: 'icon-book-open',
      url: '/reference',
      children: [
        {
          name: 'Reports',
          url: '/reference/reports',
          icon: 'icon-doc'
        }, {
          name: 'Agencies',
          url: '/reference/agencies',
          icon: 'icon-home'
        }, {
          name: 'Activities',
          url: '/reference/activities',
          icon: 'icon-tag'
        }, {
          name: 'Edu. providers',
          url: '/reference/institutions',
          icon: 'icon-graduation'
        }, {
          name: 'Countries',
          url: '/reference/countries',
          icon: 'icon-globe'
        }
      ]
    }, {
      name: 'Flags',
      icon: 'icon-flag',
      url: '/flags',
      children: [{
        name: 'Report Flags',
        url: '/flags/reports',
        icon: 'icon-docs',
      }]
    }, {
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

export default navAdmin;
