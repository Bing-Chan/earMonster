

# useDeepCopy

深拷贝

## Usage

:::demo
use/useDeepCopy
:::

## 手动拷贝

```ts
import { useDeepCopy } from '@ear-monster/use/core'

const original = ref({ key: 'value' })

const { cloned, exec } = useCloned(original, { manual: true })

original.value.key = 'manual'

console.log(cloned.value.key) // 'value'

exec()

console.log(cloned.value.key)// 'manual'
```

## 自定义拷贝

Using [`klona`](https://www.npmjs.com/package/klona) for example:

```ts
import { useDeepCopy } from '@ear-monster/use/core'
import { klona } from 'klona'

const original = ref({ key: 'value' })

const { cloned, exec } = useCloned(original, { clone: klona })
```
