import { createElement } from 'react';
import * as TestRenderer from 'react-test-renderer';
import Repromised from './Repromised';

describe('<Repromised>', () => {
  test('has props.children() as a render-props resolving a promise', done => {
    const initial = Symbol('initial');
    const returnValue = Symbol('returnValue');
    const children = jest.fn((value, isProcessing) =>
      isProcessing ? <span>Loading ...</span> : <span>{value.toString()}</span>
    );
    const promiseFunction = jest.fn(() => Promise.resolve(returnValue));

    const testRenderer = TestRenderer.create(
      <Repromised promise={promiseFunction} initial={initial}>
        {children}
      </Repromised>
    );

    setTimeout(() => {
      expect(promiseFunction).toHaveBeenCalled();
      expect(children).toHaveBeenNthCalledWith(1, initial, false);
      expect(children).toHaveBeenNthCalledWith(2, initial, true);
      expect(children).toHaveBeenNthCalledWith(3, returnValue, false);
      expect(testRenderer.toJSON()).toMatchSnapshot();

      done();
    }, 5);
  });

  test('calls props.beforeResolve() and then resolves a promise and calls props.then() when the promise is resolved', done => {
    const called: string[] = [];

    const returnValue = Symbol('returnValue');
    const promiseFunction = jest.fn(() => {
      called.push('promiseFunction');

      return Promise.resolve(returnValue);
    });
    const beforeResolve = jest.fn(() => {
      called.push('beforeResolve');
    });
    const then = jest.fn(() => {
      called.push('then');
    });

    TestRenderer.create(
      <Repromised promise={promiseFunction} initial={Symbol('initial')} beforeResolve={beforeResolve} then={then}>
        {() => null}
      </Repromised>
    );

    setTimeout(() => {
      expect(promiseFunction).toHaveBeenCalled();
      expect(then).toHaveBeenCalledWith(returnValue);
      expect(called).toEqual(['beforeResolve', 'promiseFunction', 'then']);

      done();
    }, 5);
  });

  test('calls props.catch() when the promise is rejected', done => {
    const called: string[] = [];

    const error = Symbol('error');
    const promiseFunction = jest.fn(() => {
      called.push('promiseFunction');

      return Promise.reject(error);
    });
    const beforeResolve = jest.fn(() => {
      called.push('beforeResolve');
    });
    const catchFunction = jest.fn(() => {
      called.push('catch');
    });

    TestRenderer.create(
      <Repromised
        promise={promiseFunction}
        initial={Symbol('initial')}
        beforeResolve={beforeResolve}
        catch={catchFunction}
      >
        {() => null}
      </Repromised>
    );

    setTimeout(() => {
      expect(promiseFunction).toHaveBeenCalled();
      expect(catchFunction).toHaveBeenCalledWith(error);
      expect(called).toEqual(['beforeResolve', 'promiseFunction', 'catch']);

      done();
    }, 5);
  });

  test('renders null if props.children is void', () => {
    const testRenderer = TestRenderer.create(
      <Repromised promise={() => Promise.resolve(Symbol('returnValue'))} initial={Symbol('initial')} />
    );

    expect(testRenderer.root.children).toEqual([]);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
