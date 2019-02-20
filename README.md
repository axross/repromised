# [![Repromised](https://user-images.githubusercontent.com/4289883/43491551-dc28c168-94d9-11e8-8c56-b10389544933.png)](https://github.com/axross/repromised)

[![npm](https://img.shields.io/npm/dt/repromised.svg)](https://www.npmjs.com/package/repromised)
[![GitHub stars](https://img.shields.io/github/stars/axross/repromised.svg)](https://github.com/axross/repromised/stargazers)
[![GitHub license](https://img.shields.io/github/license/axross/repromised.svg)](https://github.com/axross/repromised/blob/master/LICENSE)

**Repromised** is a component to build children by resolving a promise with
[Render Props](https://reactjs.org/docs/render-props.html) pattern.

- 🚀 Dependency free
- 🏄‍ Extremely tiny
- 🔌 Plug and Play
- 👷 Well tested
- 👔 Built with TypeScript

## Example

[**TRY IT OUT HERE**](https://codesandbox.io/s/0mkr4nkokv)

[<img src="https://user-images.githubusercontent.com/4289883/43618182-cc1e7e0e-967b-11e8-892f-3aecfaf8ece6.gif" alt="Repromised Example" width="480" />](https://codesandbox.io/s/0mkr4nkokv)

## Install

```
npm i -S repromised
```

## APIs

### `<Repromised>`

#### Props

| Name       | Type                                                                    | Required | Description                                                                      |
| ---------- | ----------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------- |
| `promise`  | `() => Promise<Value>`                                                  | ✓        | A function returning a promise (it will be called when the component is mounted) |
| `initial`  | `Value` (the same type with the value what the promise should resolves) |          | An initial value                                                                 |
| `children` | `(snapshot: Snapshot) => ReactNode`                                     |          | A render props function                                                          |

#### Snapshot

`<Repromised>` receives children as a render-props pattern function that gives a snapshot object which has the shape like the following:

| Name           | Type                                                    | Description                                                                                                                        |
| -------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `status`       | `"PENDING"`, `"FULFILLED"` or `"REJECTED"`              | The promise's status. In TypeScript you can use `Status` enum instead of string enum                                               |
| `value`        | `Value` (the value what the promise resolves) or `null` | The value what the promise resolves. When `status` is `"PENDING"` or `"REJECTED"` and `props.initial` is not given, this is `null` |
| `error`        | `Error` or `null`                                       | The error when the promise rejects. This is `null` if `status` is not `"REJECTED"`                                                 |
| `isLoading`    | `boolean`                                               | A short hand value whether the promise's status is `"PENDING"` or not (same with to `status === "PENDING"`).                       |
| `requireValue` | `Value` (the value what the promise resolves)           | Same as `value` but it throws an error if `value` is `null`                                                                        |

#### Usage

<!-- prettier-ignore -->
```jsx
import Repromised from 'repromised';

const SearchResult = ({ query }) => (
  <Repromised promise={() => fetchByQuery(query)} initial={[]} key={query}>
    {snapshot => snapshot.isLoading
      ? <Loading />
      : <ResultList>
          {snapshot.value.map(result => <ResultListItem result={result} />)}
        </ResultList>
    }
  </Repromised>
);
```

## License

MIT

## Contribute

Any feedback is welcome! You can help improving this project leaving Pull requests and helping with Issues.
