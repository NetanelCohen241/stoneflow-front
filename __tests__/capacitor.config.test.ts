import config from '../capacitor.config'

describe('Capacitor config', () => {
  it('has correct base settings', () => {
    expect(config.appId).toBe('com.example.stoneflow')
    expect(config.appName).toBe('Stoneflow')
    expect(config.webDir).toBe('dist')
  })
})
