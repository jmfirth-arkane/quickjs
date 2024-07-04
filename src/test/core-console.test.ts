import { describe, expect, it, mock } from 'bun:test'
import { quickJS } from '../quickJS.js'
import type { OkResponse } from '../types/OkResponse.js'

describe('core - console', () => {
	it('console.log works correctly', async () => {
		const logSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { log: logSpy } })

		const code = `
      console.log('Test log')
      export default 'logged'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('logged')
		expect(logSpy).toHaveBeenCalledWith('Test log')
	})

	it('console.error works correctly', async () => {
		const errorSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { error: errorSpy } })

		const code = `
      console.error('Test error')
      export default 'errored'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('errored')
		expect(errorSpy).toHaveBeenCalledWith('Test error')
	})

	it('console.warn works correctly', async () => {
		const warnSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { warn: warnSpy } })

		const code = `
      console.warn('Test warn')
      export default 'warned'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('warned')
		expect(warnSpy).toHaveBeenCalledWith('Test warn')
	})

	it('console.info works correctly', async () => {
		const infoSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { info: infoSpy } })

		const code = `
      console.info('Test info')
      export default 'infoed'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('infoed')
		expect(infoSpy).toHaveBeenCalledWith('Test info')
	})

	it('console.debug works correctly', async () => {
		const debugSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { debug: debugSpy } })

		const code = `
      console.debug('Test debug')
      export default 'debugged'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('debugged')
		expect(debugSpy).toHaveBeenCalledWith('Test debug')
	})

	it('console.trace works correctly', async () => {
		const traceSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { trace: traceSpy } })

		const code = `
      console.trace('Test trace')
      export default 'traced'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('traced')
		expect(traceSpy).toHaveBeenCalled()
	})

	it('console.assert works correctly', async () => {
		const assertSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { assert: assertSpy } })

		const code = `
      console.assert(false, 'Test assert')
      export default 'asserted'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('asserted')
		expect(assertSpy).toHaveBeenCalledWith(false, 'Test assert')
	})

	it('console.count works correctly', async () => {
		const countSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { count: countSpy } })

		const code = `
      console.count('Test count')
      console.count('Test count')
      export default 'counted'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('counted')
		expect(countSpy).toHaveBeenCalledTimes(2)
	})

	it('console.dir works correctly', async () => {
		const dirSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { dir: dirSpy } })

		const code = `
      console.dir({ key: 'value' })
      export default 'dir'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('dir')
		expect(dirSpy).toHaveBeenCalledWith({ key: 'value' })
	})

	it('console.group works correctly', async () => {
		const groupSpy = mock()
		const groupEndSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { group: groupSpy, groupEnd: groupEndSpy } })

		const code = `
      console.group('Test group')
      console.log('Inside group')
      console.groupEnd('Test group')
      export default 'grouped'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('grouped')
		expect(groupSpy).toHaveBeenCalledWith('Test group')
		expect(groupEndSpy).toHaveBeenCalled()
	})

	it('console.table works correctly', async () => {
		const tableSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { table: tableSpy } })

		const code = `
      console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }])
      export default 'tabled'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('tabled')

		expect(tableSpy).toHaveBeenCalledWith([
			{ a: 1, b: 'Y' },
			{ a: 'Z', b: 2 },
		])
	})

	it('console.time and console.timeEnd work correctly', async () => {
		const timeSpy = mock()
		const timeEndSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { time: timeSpy, timeEnd: timeEndSpy } })

		const code = `
      console.time('Test timer')
      console.timeEnd('Test timer')
      export default 'timed'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('timed')
		expect(timeSpy).toHaveBeenCalledWith('Test timer')
		expect(timeEndSpy).toHaveBeenCalledWith('Test timer')
	})

	it('console.clear works correctly', async () => {
		const clearSpy = mock()
		const { initRuntime } = await quickJS()
		const { evalCode } = await initRuntime({ console: { clear: clearSpy } })

		const code = `
      console.clear()
      export default 'cleared'
    `

		const result = (await evalCode(code)) as OkResponse
		expect(result.ok).toBeTrue()
		expect(result.data).toBe('cleared')
		expect(clearSpy).toHaveBeenCalled()
	})
})
