# ![Repromised](https://user-images.githubusercontent.com/4289883/43491551-dc28c168-94d9-11e8-8c56-b10389544933.png)

[![npm](https://img.shields.io/npm/dt/repromised.svg)](https://www.npmjs.com/package/repromised)
[![GitHub stars](https://img.shields.io/github/stars/axross/repromised.svg)](https://github.com/axross/repromised/stargazers)
[![GitHub license](https://img.shields.io/github/license/axross/repromised.svg)](https://github.com/axross/repromised/blob/master/LICENSE)

**Repromised** is a component resolves a promise and provides its' value with
[Render Props](https://reactjs.org/docs/render-props.html) pattern.

- 🙌🏻 Dependency free
- 🏄‍ Extremely tiny
- 👔 Built with TypeScript

## Example

[Here](https://codesandbox.io/s/0mkr4nkokv)

## APIs

### `<Repromised>`

#### Props

| Name            | Type                                          | Required | Description                                                                                                                                                        |
| --------------- | --------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `promise`       | `() => Promise<T>`                            | ✓        | A function returning a promise to resolve (this will be called when the component is mounted)                                                                      |
| `initial`       | `T`                                           | ✓        | An initial value                                                                                                                                                   |
| `then`          | `(value: T) => void`                          |          | A callback function which is called when the promise is resolved                                                                                                   |
| `catch`         | `(err: Error) => void`                        |          | A callback function which is called when the promise is rejected                                                                                                   |
| `beforeResolve` | `() => void`                                  |          | A callback function which is called before the promise resolves                                                                                                    |
| `children`      | `(value: T, isLoading: boolean) => ReactNode` |          | A render props function which provides the resolved value from the promise and whether the promise is processing. If this is omitted, the component renders `null` |

## License

MIT

## Contribute

You can help improving this project leaving Pull requests and helping with Issues.
