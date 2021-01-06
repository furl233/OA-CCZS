export function nameErrors () {
    const errors = []
    if (!this.$v.name.$dirty) return errors 
    !this.$v.name.maxLength && errors.push('名字最多不超过4个字符')
    !this.$v.name.required && errors.push('必须输入名字.')
    return errors
  }

export function emailErrors () {
    const errors = []
    if (!this.$v.email.$dirty) return errors
    !this.$v.email.email && errors.push('邮箱必须符合邮箱地址格式')
    !this.$v.email.required && errors.push('必须输入邮箱')
    return errors
  }

export function  passwordErrors () {
    const errors = []
    if (!this.$v.password.$dirty) return errors
    !this.$v.password.minLength && errors.push('密码最少要3个字符')
    !this.$v.password.required  && errors.push('必须输入密码.')
    return errors
  }

export function  repeatpasswordErrors () {
    const errors = []
    if (!this.$v.repeatpassword.$dirty) return errors
    !this.$v.repeatpassword.sameAsPassword && errors.push('密码必须与上面的一样')
    !this.$v.repeatpassword.required  && errors.push('重复密码必须输入.')
    return errors
  }

export function  identityErrors () {
    const errors = []
    if (!this.$v.identity.$dirty) return errors
    !this.$v.identity.required  && errors.push('必须输入身份证号码.')
    return errors
  }
  
export function  phonenumberErrors () {
    const errors = []
    if (!this.$v.phonenumber.$dirty) return errors
    !this.$v.phonenumber.required  && errors.push('必须输入电话号码.')
    return errors
  }

export function  native_placeErrors () {
  const errors = []
  if (!this.$v.native_place.$dirty) return errors
  !this.$v.native_place.required  && errors.push('必须输入籍贯.')
  return errors
}

export function  FolkErrors () {
  const errors = []
  if (!this.$v.Folk.$dirty) return errors
  !this.$v.Folk.required  && errors.push('必须选择民族.')
  return errors
}

export function  living_addressErrors () {
  const errors = []
  if (!this.$v.living_address.$dirty) return errors
  !this.$v.living_address.required  && errors.push('可以输入大概住址方便应急联系.')
  return errors
}