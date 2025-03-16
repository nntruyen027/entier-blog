const auth = {
  login: '/admin/login'
};

const main = {
  index: '/admin',
  accountSetting: '/admin/personal/account',
  passwordSetting: '/admin/personal/password',
  role: '/admin/system/role',
  user: '/admin/system/user',
  productType: '/admin/category/product-type',
  brand: '/admin/category/brand',
  tag: '/admin/category/tag',
  attributeType: '/admin/category/attributeType',
  attribute: '/admin/attribute/attribute',
  attributeValue: '/admin/attribute/value',
  product: '/admin/warehouse/product',
  productVersion: '/admin/warehouse/product/:productId/versions',
  receipt: '/admin/warehouse/receipt',
  receiptDetail: '/admin/warehouse/receipt/:id',
  invoice: '/admin/warehouse/invoice',
  invoiceDetail: '/admin/warehouse/invoice/:id'
};

export { auth, main };
