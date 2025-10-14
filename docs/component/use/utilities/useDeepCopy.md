---
category: Utilities
---

# useDeepCopy

Reactive clone of a ref. By default, it use `JSON.parse(JSON.stringify())` to do the clone.


:::level3
utilities/useDeepCopy
:::


## Usage

```ts
import { useDeepCopy } from '@ear-monster/use'

const original = ref({ key: 'value' })

const { cloned } = useCloned(original)

original.value.key = 'some new value'

console.log(cloned.value.key) // 'some new value'
```
