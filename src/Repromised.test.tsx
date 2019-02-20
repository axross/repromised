import { createElement } from "react";
import * as TestRenderer from "react-test-renderer";
import Repromised, { Status } from "./Repromised";

describe("<Repromised>", () => {
  describe("when props.promise resolves with a value", () => {
    test("calls props.children with the snapshot which expresses the promise is pending at 1st call", done => {
      const children = jest.fn(_ => null);
      const promiseFunction = jest.fn(() => Promise.resolve("PROMISED"));

      TestRenderer.create(
        <Repromised promise={promiseFunction} initial={"INITIAL"}>
          {children}
        </Repromised>
      );

      setTimeout(() => {
        expect(children.mock.calls[0][0].status).toBe(Status.Pending);
        expect(children.mock.calls[0][0].value).toBe("INITIAL");
        expect(children.mock.calls[0][0].error).toBe(null);
        expect(children.mock.calls[0][0].isLoading).toBe(true);
        expect(children.mock.calls[0][0].requireValue).toBe("INITIAL");

        done();
      }, 5);
    });

    test("calls props.children with the snapshot which expresses the promise is fulfilled at 2st call", done => {
      const children = jest.fn(_ => null);
      const promiseFunction = jest.fn(() => Promise.resolve("PROMISED"));

      TestRenderer.create(
        <Repromised promise={promiseFunction} initial={"INITIAL"}>
          {children}
        </Repromised>
      );

      setTimeout(() => {
        expect(children.mock.calls[1][0].status).toBe(Status.Fulfilled);
        expect(children.mock.calls[1][0].value).toBe("PROMISED");
        expect(children.mock.calls[1][0].error).toBe(null);
        expect(children.mock.calls[1][0].isLoading).toBe(false);
        expect(children.mock.calls[1][0].requireValue).toBe("PROMISED");

        done();
      }, 5);
    });
  });

  describe("when props.promise rejects with an error", () => {
    test("calls props.children with the snapshot which expresses the promise is pending at 1st call", done => {
      const children = jest.fn(_ => null);
      const error = new Error("REJECTED");
      const promiseFunction = jest.fn(() => Promise.reject<any>(error));

      TestRenderer.create(
        <Repromised promise={promiseFunction} initial={"INITIAL"}>
          {children}
        </Repromised>
      );

      setTimeout(() => {
        expect(children.mock.calls[0][0].status).toBe(Status.Pending);
        expect(children.mock.calls[0][0].value).toBe("INITIAL");
        expect(children.mock.calls[0][0].error).toBe(null);
        expect(children.mock.calls[0][0].isLoading).toBe(true);
        expect(children.mock.calls[0][0].requireValue).toBe("INITIAL");

        done();
      }, 5);
    });

    test("calls props.children with the snapshot which expresses the promise is rejected at 2st call", done => {
      const children = jest.fn(_ => null);
      const error = new Error("REJECTED");
      const promiseFunction = jest.fn(() => Promise.reject<any>(error));

      TestRenderer.create(
        <Repromised promise={promiseFunction} initial={"INITIAL"}>
          {children}
        </Repromised>
      );

      setTimeout(() => {
        expect(children.mock.calls[1][0].status).toBe(Status.Rejected);
        expect(children.mock.calls[1][0].value).toBe(null);
        expect(children.mock.calls[1][0].error).toBe(error);
        expect(children.mock.calls[1][0].isLoading).toBe(false);
        expect(() => children.mock.calls[1][0].requireValue).toThrow();

        done();
      }, 5);
    });
  });

  describe("props.initial is omitted", () => {
    describe("when props.promise resolves with a value", () => {
      test("calls props.children with the snapshot which expresses the promise is pending at 1st call", done => {
        const children = jest.fn(_ => null);
        const promiseFunction = jest.fn(() => Promise.resolve("PROMISED"));

        TestRenderer.create(
          <Repromised promise={promiseFunction}>{children}</Repromised>
        );

        setTimeout(() => {
          expect(children.mock.calls[0][0].status).toBe(Status.Pending);
          expect(children.mock.calls[0][0].value).toBe(null);
          expect(children.mock.calls[0][0].error).toBe(null);
          expect(children.mock.calls[0][0].isLoading).toBe(true);
          expect(() => children.mock.calls[0][0].requireValue).toThrow();

          done();
        }, 5);
      });

      test("calls props.children with the snapshot which expresses the promise is fulfilled at 2st call", done => {
        const children = jest.fn(_ => null);
        const promiseFunction = jest.fn(() => Promise.resolve("PROMISED"));

        TestRenderer.create(
          <Repromised promise={promiseFunction}>{children}</Repromised>
        );

        setTimeout(() => {
          expect(children.mock.calls[1][0].status).toBe(Status.Fulfilled);
          expect(children.mock.calls[1][0].value).toBe("PROMISED");
          expect(children.mock.calls[1][0].error).toBe(null);
          expect(children.mock.calls[1][0].isLoading).toBe(false);
          expect(children.mock.calls[1][0].requireValue).toBe("PROMISED");

          done();
        }, 5);
      });
    });

    describe("when props.promise rejects with an error", () => {
      test("calls props.children with the snapshot which expresses the promise is pending at 1st call", done => {
        const children = jest.fn(_ => null);
        const error = new Error("REJECTED");
        const promiseFunction = jest.fn(() => Promise.reject<any>(error));

        TestRenderer.create(
          <Repromised promise={promiseFunction}>{children}</Repromised>
        );

        setTimeout(() => {
          expect(children.mock.calls[0][0].status).toBe(Status.Pending);
          expect(children.mock.calls[0][0].value).toBe(null);
          expect(children.mock.calls[0][0].error).toBe(null);
          expect(children.mock.calls[0][0].isLoading).toBe(true);
          expect(() => children.mock.calls[0][0].requireValue).toThrow();

          done();
        }, 5);
      });

      test("calls props.children with the snapshot which expresses the promise is rejected at 2st call", done => {
        const children = jest.fn(_ => null);
        const error = new Error("REJECTED");
        const promiseFunction = jest.fn(() => Promise.reject<any>(error));

        TestRenderer.create(
          <Repromised promise={promiseFunction}>{children}</Repromised>
        );

        setTimeout(() => {
          expect(children.mock.calls[1][0].status).toBe(Status.Rejected);
          expect(children.mock.calls[1][0].value).toBe(null);
          expect(children.mock.calls[1][0].error).toBe(error);
          expect(children.mock.calls[1][0].isLoading).toBe(false);
          expect(() => children.mock.calls[1][0].requireValue).toThrow();

          done();
        }, 5);
      });
    });
  });
});
