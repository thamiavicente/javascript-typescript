# Typescript
## Tipos:
- string / string[] (array de strings)
- number / Array<number> (array de numbers)
- boolean
- null
- undefined
- any
- unknown
- void
- never
Exemplo de declaração de tipo
``` typescript
type TypeName: { //Pode ser declarado como interface também
  prop: type,
  propOptional?: type
} 

const objectType = (objectType: TypeName): string => {
  return `Hello, world! ${objectType.prop}`
}
```