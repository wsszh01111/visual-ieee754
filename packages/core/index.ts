/**
 * 非负整数正则
 */
const integerReg = /^[1-9]\d*|0$/

/**
 * 非负小数正则
 */
const decimalReg = /^0\.\d+$/

/**
 * 标准数字字符串正则
 */
const numStrReg = /^([+-])?([1-9]\d*|0)(\.\d+)?/

/**
 * 判断是否是个非负整数字符串
 * @param integerStr 非负整数字符串
 * @returns true/false
 */
export const isIntegerStr = (integerStr: string) => integerReg.test(integerStr)

/**
 * 判断是否是个非负小数字符串
 * @param integerStr 非负小数字符串
 * @returns true/false
 */
export const isDecimalStr = (decimalStr: string) => decimalReg.test(decimalStr)

/**
 * 非负整数字符串除法
 * @param integerStr 非负整数字符串
 * @param divisor 除数
 * @returns [整除结果, 余数]
 */
export const integerDivide = (integerStr: string, divisor: string = '2'): [string, string] => {
  let result = ''
  let i = 0
  let divided = integerStr[i] // 被除数
  let reminder = 0 // 余数
  const d = Number(divisor)

  while(i < integerStr.length) {
    const dividedNum = +divided

    if (dividedNum === 0) {
      result += divided
      divided = integerStr[++i]
      continue
    }

    reminder = dividedNum % d
    const next = integerStr[++i]

    if(dividedNum >= d) {
      result += Math.floor(dividedNum / d)

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

/**
 * 非负小数字符串乘法
 * @param integerStr 非负小数字符串
 * @param multiplier 乘数
 * @returns 
 */
export const decimalMultiply = (decimalStr: string, multiplier: string = '2') : string => {
  const decimals = []
  const m = +multiplier
  let carry = 0

  let i = decimalStr.length
  while(i--) {
    if (decimalStr[i] === '.') break
    const res = carry + m * +decimalStr[i]
    carry = Math.floor(res / 10)
    const reminder = res % 10

    if (reminder === 0 && i === decimalStr.length - 1 ) continue // 最后一位整乘进位

    decimals.push(reminder)
  }
  return decimals.length > 0 ? `${carry}.${decimals.reverse().join('')}` : `${carry}`
}

/**
 * 非负小数字符串进制转换
 * @param decimalStr 非负小数字符串
 * @param limit 精度限制
 * @param base 进制
 * @returns [转化后的字符串, 转化过程是否有精度损失]
 */
export const decimalTransform = (decimalStr: string, limit: string, base: string = '2') : [string, boolean] => {
  const result = []
  const l = +limit
  let i = 0
  let multiplyRes = decimalStr
  
  for(; i <= l; i++) {
    multiplyRes = decimalMultiply(multiplyRes)
    result.push(multiplyRes[0])
    if (multiplyRes === '1') break
    multiplyRes = `0${multiplyRes.slice(1)}`
  }

  const lost = i === l+1 // 是否损失精度
  if (lost) result.pop()
  
  return [`0.${result.join('')}`, lost]
}

/**
 * 数字字符串预处理 拆分成符号位、整数、小数三部分
 * @param numStr 数字字符串
 * @returns [正负, 整数字符串, 小数字符串]
 */
export const preProcess = (numStr: string) : [boolean, string, string] => {
  const regRes = numStrReg.exec(numStr)
  if (!regRes) return

  const positive = regRes[1] === '-' ? false : true
  const integer = regRes[2]
  const decimal = regRes[3] ? `0${regRes[3]}` : undefined
  if (integer || decimal) return [positive, integer, decimal]
  return
}
