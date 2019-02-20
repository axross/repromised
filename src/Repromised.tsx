import { Attributes, Component, ReactNode } from "react";

type Children<Value> = (snapshot: Snapshot<Value>) => ReactNode;

export enum Status {
  Pending,
  Fulfilled,
  Rejected
}

interface Props<Value> extends Attributes {
  promise: () => Promise<Value>;
  initial?: Value;
  children?: Children<Value>;
}

interface State<Value> {
  snapshot: Snapshot<Value>;
}

class Repromised<Value> extends Component<Props<Value>, State<Value>> {
  public constructor(props: Props<Value>) {
    super(props);

    this.state = {
      snapshot: new SnapshotImpl(
        Status.Pending,
        props.initial === undefined ? null : props.initial
      )
    };
  }

  public componentDidMount() {
    this.props
      .promise()
      .then(value => {
        this.setState({
          snapshot: new SnapshotImpl(Status.Fulfilled, value)
        });
      })
      .catch(error => {
        this.setState({
          snapshot: new SnapshotImpl<Value>(Status.Rejected, null, error)
        });
      });
  }

  public render() {
    if (this.props.children) {
      return this.props.children(this.state.snapshot);
    }

    return null;
  }
}

export abstract class Snapshot<Value> {
  abstract readonly status: Status;

  abstract readonly value: Value | null;

  abstract readonly error: Error | null;

  abstract readonly isLoading: boolean;

  abstract readonly requireValue: Value;
}

class SnapshotImpl<Value> implements Snapshot<Value> {
  constructor(
    status: Status,
    value: Value | null = null,
    error: Error | null = null
  ) {
    this.status = status;
    this.value = value;
    this.error = error;
  }

  readonly status: Status;

  readonly value: Value | null;

  readonly error: Error | null;

  get isLoading(): boolean {
    if (this.status === Status.Fulfilled || this.status === Status.Rejected) {
      return false;
    }

    return true;
  }

  get requireValue(): Value {
    if (this.value === null) {
      throw new Error();
    }

    return this.value;
  }
}

export default Repromised;
