import rsConfig from '@yy-admin/config-rsbuild-app'

export default rsConfig({
  proxyApis: [
    ['/api', 'http://192.168.2.91:8000'],
    ['/avatar', 'http://192.168.2.91:8000'],
  ],
})
