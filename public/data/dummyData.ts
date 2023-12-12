const data = {
  When: 'December 1, 2023 14:01:35',
  Vehicle: 'BANF01',
  Driver: 'Ron Lee',
  Location: '37.500725285, 127.036600396',
  'Risk Level': 'Danger',
  'Resolved?': false
}
export const dummyData = new Array(100).fill({}).map((_, i) => {
  if (i < 6) {
    return { ...data, 'Resolved?': true }
  }
  return { ...data }
})

export type dataType = typeof data