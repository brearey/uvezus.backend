import { getRandom } from '../utils/random'

describe('getRandom function', () => {
	test('should return a number within the specified range', () => {
		const min = 1
		const max = 10
		const result = getRandom(min, max)

		expect(result).toBeGreaterThanOrEqual(min)
		expect(result).toBeLessThanOrEqual(max)
		expect(Number.isInteger(result)).toBe(true)
	})

	test('should return the same number when min equals max', () => {
		const value = 5
		const result = getRandom(value, value)

		expect(result).toBe(value)
	})

	test('should work with negative numbers', () => {
		const min = -10
		const max = -5
		const result = getRandom(min, max)

		expect(result).toBeGreaterThanOrEqual(min)
		expect(result).toBeLessThanOrEqual(max)
		expect(Number.isInteger(result)).toBe(true)
	})

	test('should work with zero', () => {
		const min = 0
		const max = 5
		const result = getRandom(min, max)

		expect(result).toBeGreaterThanOrEqual(min)
		expect(result).toBeLessThanOrEqual(max)
		expect(Number.isInteger(result)).toBe(true)
	})

	test('should generate different values over multiple calls', () => {
		const min = 1
		const max = 100
		const results = new Set()

		// Генерируем 50 случайных чисел
		for (let i = 0; i < 50; i++) {
			results.add(getRandom(min, max))
		}

		// Ожидаем, что будет сгенерировано более одного уникального значения
		// (статистически очень вероятно для диапазона 1-100)
		expect(results.size).toBeGreaterThan(1)
	})

	test('should work with large numbers', () => {
		const min = 1000
		const max = 9999
		const result = getRandom(min, max)

		expect(result).toBeGreaterThanOrEqual(min)
		expect(result).toBeLessThanOrEqual(max)
		expect(Number.isInteger(result)).toBe(true)
	})

	test('should handle single digit range correctly', () => {
		const min = 1
		const max = 1
		const result = getRandom(min, max)

		expect(result).toBe(1)
	})
})
