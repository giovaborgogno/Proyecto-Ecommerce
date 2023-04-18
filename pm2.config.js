module.exports = {
    apps: [{
      name: 'shop.giovaborgogno.com-django-port8080',
      script: 'python',
      args: ['manage.py', 'runserver', '0.0.0.0:8080'],
      watch: true,
      ignore_watch: ['node_modules', 'staticfiles'],
      env: {
        PYTHONUNBUFFERED: 1,
        DJANGO_SETTINGS_MODULE: 'your_project_name.settings'
      }
    }]
  }