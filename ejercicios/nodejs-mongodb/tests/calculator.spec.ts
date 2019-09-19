import {multiply} from '../src/calculator'

describe('test calculator', () => {
    test('multiply makes a multiplication', () => {
        expect(multiply(2,3)).toBe(6)
    })
})