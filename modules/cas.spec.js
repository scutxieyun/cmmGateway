const { validateIgnorePath } = require("./cas")
test("验证正则式过滤", () => {
  expect(validateIgnorePath({url:"/api/test/3423423423"})).toBe(true)
})