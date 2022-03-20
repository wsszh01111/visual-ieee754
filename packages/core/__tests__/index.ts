import { integerDivide, integerTransform, decimalMultiply, decimalTransform, preProcess } from '../index'

test('test integerDivide', () => {
  expect(integerDivide('0', '2')).toEqual(['0', '0']) // 0
  expect(integerDivide('1', '2')).toEqual(['0', '1']) // 2 跟base相等
  expect(integerDivide('2', '2')).toEqual(['1', '0']) // 2 跟base相等
  expect(integerDivide('3', '2')).toEqual(['1', '1']) // 3 比base大1
  expect(integerDivide('40', '2')).toEqual(['20', '0']) // 完全能被整除的二位数
  expect(integerDivide('444', '2')).toEqual(['222', '0']) // 完全能被整除的三位数
  expect(integerDivide('441', '2')).toEqual(['220', '1']) // 第n位（4）能被完全整除 n+1位（1）作为新的除数处理
  expect(integerDivide('617', '2')).toEqual(['308', '1']) // 第n位（6）能被完全整除 n+1位（1）作为新的除数但不够除
  expect(integerDivide('1234', '2')).toEqual(['617', '0']) // 首位不够除
  expect(integerDivide('12340222', '2')).toEqual(['6170111', '0']) // 数中存在0
  expect(integerDivide('123456789123456789123456789123456789', '2')).toEqual(['61728394561728394561728394561728394', '1']) // 大数
  expect(integerDivide('123456789123456789123456789123456788', '2')).toEqual(['61728394561728394561728394561728394', '0']) // 大数
})

test('test integerTransform', () => {
  expect(integerTransform('0', '2')).toBe('0')
  expect(integerTransform('2', '2')).toBe('10')
  expect(integerTransform('3', '2')).toBe('11')
  expect(integerTransform('40', '2')).toBe('101000')
  expect(integerTransform('444', '2')).toBe('110111100')
  expect(integerTransform('441', '2')).toBe('110111001')
  expect(integerTransform('617', '2')).toBe('1001101001')
  expect(integerTransform('1234', '2')).toBe('10011010010')
  expect(integerTransform('12340222', '2')).toBe('101111000100101111111110')
  expect(integerTransform('123456789123456789123456789123456789', '2')).toBe('101111100011011100011110000000011001011111000100100000100010110101101011101000110011010000100000001000101111100010101')
  expect(integerTransform('123456789123456789123456789123456788', '2')).toBe('101111100011011100011110000000011001011111000100100000100010110101101011101000110011010000100000001000101111100010100')
})

test('test decimalMultiply', () => {
  expect(decimalMultiply('0.0', '2')).toBe('0')
  expect(decimalMultiply('0.2', '2')).toBe('0.4')
  expect(decimalMultiply('0.5', '2')).toBe('1')
  expect(decimalMultiply('0.55', '2')).toBe('1.1')
  expect(decimalMultiply('0.8', '2')).toBe('1.6')
  expect(decimalMultiply('0.1010123', '2')).toBe('0.2020246')
  expect(decimalMultiply('0.999999999', '2')).toBe('1.999999998')
  expect(decimalMultiply('0.123410289571839475813457238475893478', '2')).toBe('0.246820579143678951626914476951786956')
})

test('test decimalTransform', () => {
  expect(decimalTransform('0.125', '64')).toEqual(['0.001', false])
  expect(decimalTransform('0.8125', '64')).toEqual(['0.1101', false])
  expect(decimalTransform('0.1', '64')).toEqual(['0.0001100110011001100110011001100110011001100110011001100110011001', true])
  expect(decimalTransform('0.001', '64')).toEqual(['0.0000000001000001100010010011011101001011110001101010011111101111', true])
  expect(decimalTransform('0.0015', '64')).toEqual(['0.0000000001100010010011011101001011110001101010011111101111100111', true])
})

test('test preProcess', () => {
  expect(preProcess(null)).toBe(undefined)
  expect(preProcess(undefined)).toBe(undefined)
  expect(preProcess('')).toBe(undefined)
  expect(preProcess('NaN')).toBe(undefined)
  expect(preProcess('...')).toBe(undefined)
  expect(preProcess('asdf')).toBe(undefined)
  expect(preProcess('+-+-')).toBe(undefined)
  expect(preProcess('+-+1')).toEqual(undefined)
  expect(preProcess('TTTT')).toBe(undefined)
  expect(preProcess('.123')).toEqual(undefined)
  expect(preProcess('-.123')).toEqual(undefined)
  expect(preProcess('+.123')).toEqual(undefined)
  expect(preProcess('asdf12')).toBe(undefined)
  expect(preProcess('asdf12dsf')).toBe(undefined)
  expect(preProcess('0.asdf')).toEqual([true, '0', undefined])
  expect(preProcess('1234.')).toEqual([true, '1234', undefined])
  expect(preProcess('-0.123')).toEqual([false, '0', '0.123'])
  expect(preProcess('-532.323')).toEqual([false, '532', '0.323'])
})
