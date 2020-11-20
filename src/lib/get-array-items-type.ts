type GetArrayItemsType<T extends Array<any>> = T extends (infer U)[] ? U : never

export default GetArrayItemsType
