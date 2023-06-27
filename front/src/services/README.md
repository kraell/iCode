## Services
The `services` directory is less essential than `components`, but if you're making a plain JavaScript module that the rest of the application is using, it can be handy. A common contrived example is a LocalStorage module, which might look like this:

```
.
└── /src
    └── /services
        ├── /LocalStorage
        │   ├── LocalStorage.service.js
        │   └── LocalStorage.test.js
        └── index.js
```

An example of the service:
> `src/services/LocalStorage/LocalStorage.service.js`
>
> ---
>
> ```
> export const LocalStorage = {
> get(key) {},
> set(key, value) {},
> remove(key) {},
> clear() {},
> }
> ```
>
> ---
>
> ```
> import { LocalStorage } from '@services'
> 
> LocalStorage.get('foo')
> ```
>
> ---
> 
