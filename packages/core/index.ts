/**
 * 非负整数正则
 */
const integerReg = /^[1-9]\d*|0$/

/**
 * 判断是否是个非负整数字符串
 * @param integerStr 非负整数字符串
 * @returns true/false
 */
export const isIntegerStr = (integerStr: string) => integerReg.test(integerStr)

/**
 * 非负整数字符串除法
 * @param integerStr 非负整数字符串
 * @param base 进制
 * @returns [整除结果, 余数]
 */
export const integerDivide = (integerStr: string, base: string = '2') => {
  let result = ''
  let i = 0
  let divided = integerStr[i] // 被除数
  let reminder = 0 // 余数
  const b = Number(base)

  while(i < integerStr.length) {
    const dividedNum = +divided

    if (dividedNum === 0) {
      result += divided
      divided = integerStr[++i]
      continue
    }

    reminder = dividedNum % b
    const next = integerStr[++i]

    if(dividedNum >= b) {
      result += Math.floor(dividedNum / b)

      if (next !== undefined) {
        divided = reminder === 0 ? next : reminder + next
      }
    } else {
      if (next !== undefined) {
        divided += next
        if (result) result += '0'
      } else {
        result += '0'
      }
    }
  }
  return [result, String(reminder)]
}

/**
 * 非负整数字符串进制转换
 * @param integerStr 非负整数字符串
 * @param base 进制
 * @returns 转化后的字符串
 */
export const integerTransform = (integerStr: string, base: string = '2') => {
  const result = []

  let divideReminder = '0'
  let divided = integerStr
  do {
    [divided, divideReminder] = integerDivide(divided, base)
    result.push(divideReminder)
  } while(divided !== '0')

  return result.reverse().join('')
}
