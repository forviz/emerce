export const test = () => {
  console.log('test');
}

export const toEndUser = (data = {}, errors = [], meta = {}) => {
  return {
    data: data,
    errors: errors,
    meta: meta,
  }
}